import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import { 
  getOrCreateUser, 
  getUserByUid, 
  updateUserProfile, 
  getCivicReports, 
  createCivicReport, 
  getUserCheckpoints, 
  addCheckpoint, 
  getGroupExpeditions 
} from './src/db/users.ts';
import { 
  getServerSupabaseClient,
  isSupabaseConfigured,
  getSupabaseDetails,
  getSupabaseCivicReports,
  createSupabaseCivicReport,
  getOrCreateSupabaseUser,
  getSupabaseCheckpoints,
  addSupabaseCheckpoint,
  getSupabaseExpeditions
} from './src/server/supabaseDb.ts';
import { getSmartTravelTips } from './src/server/travelTipsService.ts';
import { db } from './src/db/index.ts';
import { sql } from 'drizzle-orm';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Route: Health & Database Connection Info (Supabase + Cloud SQL)
  app.get('/api/health', async (_req, res) => {
    let cloudSqlStatus = 'connected';
    let cloudSqlTime: any = null;
    let cloudSqlDb: any = null;

    try {
      const result = await db.execute(sql`SELECT NOW() as current_time, current_database() as db_name`);
      cloudSqlTime = result.rows[0]?.current_time;
      cloudSqlDb = result.rows[0]?.db_name;
    } catch (err: any) {
      console.warn('Cloud SQL check:', err.message);
      cloudSqlStatus = 'degraded';
    }

    const supabaseInfo = getSupabaseDetails();
    let supabasePing = 'not_configured';

    if (supabaseInfo.isConfigured) {
      const client = getServerSupabaseClient();
      if (client) {
        try {
          const { error } = await client.from('civic_reports').select('id', { count: 'exact', head: true });
          supabasePing = error ? `connected (${error.message})` : 'connected';
        } catch (err: any) {
          supabasePing = `error: ${err.message}`;
        }
      }
    }

    res.json({
      status: 'ok',
      primaryEngine: supabaseInfo.isConfigured ? 'Supabase PostgreSQL' : 'Google Cloud SQL PostgreSQL',
      supabase: {
        isConfigured: supabaseInfo.isConfigured,
        url: supabaseInfo.url,
        projectRef: supabaseInfo.projectRef,
        ping: supabasePing,
      },
      cloudSql: {
        status: cloudSqlStatus,
        instance: 'ai-studio-4204a64c',
        region: 'asia-southeast1',
        time: cloudSqlTime,
        dbName: cloudSqlDb,
      },
    });
  });

  // API Route: Database Statistics / Counts
  app.get('/api/database/stats', async (_req, res) => {
    try {
      const isSupabase = isSupabaseConfigured();
      let reports: any[] = [];
      let expeditions: any[] = [];

      if (isSupabase) {
        const sReports = await getSupabaseCivicReports();
        const sExp = await getSupabaseExpeditions();
        if (sReports) reports = sReports;
        if (sExp) expeditions = sExp;
      }

      if (reports.length === 0) {
        reports = await getCivicReports();
      }
      if (expeditions.length === 0) {
        expeditions = await getGroupExpeditions();
      }

      res.json({
        reportsCount: reports.length,
        expeditionsCount: expeditions.length,
        activeEngine: isSupabase ? 'Supabase' : 'Cloud SQL',
        status: 'online',
      });
    } catch (err: any) {
      console.error('Failed to query database stats:', err);
      res.status(500).json({ error: 'Database query failed' });
    }
  });

  // API Route: Synchronize User Profile with Database (Supabase + Cloud SQL)
  app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const email = req.user!.email || `${uid}@guest.heritec.org`;
      const name = req.body?.name || req.user!.name || '';
      
      let user = null;
      if (isSupabaseConfigured()) {
        user = await getOrCreateSupabaseUser(uid, email, name);
      }
      if (!user) {
        user = await getOrCreateUser(uid, email, name);
      }
      res.json({ success: true, user });
    } catch (err: any) {
      console.error('Error syncing user:', err);
      res.status(500).json({ error: err.message || 'Failed to sync user' });
    }
  });

  // API Route: Update User Profile
  app.put('/api/users/profile', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user!.uid;
      const { name, travelMode, emergencyContact } = req.body;
      const updated = await updateUserProfile(uid, { name, travelMode, emergencyContact });
      res.json({ success: true, user: updated });
    } catch (err: any) {
      console.error('Error updating user profile:', err);
      res.status(500).json({ error: err.message || 'Failed to update profile' });
    }
  });

  // API Route: Civic Reports (Retrieve from Supabase if configured, fallback to Cloud SQL)
  app.get('/api/civic-reports', async (_req, res) => {
    try {
      if (isSupabaseConfigured()) {
        const supabaseReports = await getSupabaseCivicReports();
        if (supabaseReports && supabaseReports.length > 0) {
          return res.json(supabaseReports);
        }
      }
      const reports = await getCivicReports();
      res.json(reports);
    } catch (err: any) {
      console.error('Error retrieving civic reports:', err);
      res.status(500).json({ error: 'Failed to retrieve reports' });
    }
  });

  // API Route: Create Civic Report (Stores to Supabase and replicates to Cloud SQL)
  app.post('/api/civic-reports', optionalAuth, async (req: AuthRequest, res) => {
    try {
      const { siteName, location, category, severity, description, reporterName } = req.body;
      if (!siteName || !description) {
        return res.status(400).json({ error: 'Site name and description are required.' });
      }

      let dbUserId: number | undefined = undefined;
      if (req.user?.uid) {
        try {
          const existing = await getUserByUid(req.user.uid);
          if (existing) {
            dbUserId = existing.id;
          }
        } catch {
          // ignore
        }
      }

      const reportData = {
        userId: dbUserId,
        siteName,
        location: location || 'India',
        category: category || 'Heritage Conservation',
        severity: severity || 'medium',
        description,
        reporterName: reporterName || (req.user?.name ? String(req.user.name) : 'Citizen Ranger'),
      };

      let report = null;

      // 1. Try writing to Supabase
      if (isSupabaseConfigured()) {
        report = await createSupabaseCivicReport(reportData);
      }

      // 2. Also record in Cloud SQL / fallback
      try {
        const cloudReport = await createCivicReport(reportData);
        if (!report) {
          report = cloudReport;
        }
      } catch (cErr) {
        console.warn('Cloud SQL civic report sync:', cErr);
      }

      res.status(201).json({ success: true, report });
    } catch (err: any) {
      console.error('Error creating civic report:', err);
      res.status(500).json({ error: 'Failed to submit civic report' });
    }
  });

  // API Route: Checkpoints
  app.get('/api/checkpoints', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = await getUserByUid(req.user!.uid);
      if (!user) {
        return res.json([]);
      }
      if (isSupabaseConfigured()) {
        const sCheckpoints = await getSupabaseCheckpoints(user.id);
        if (sCheckpoints) return res.json(sCheckpoints);
      }
      const checkpoints = await getUserCheckpoints(user.id);
      res.json(checkpoints);
    } catch (err: any) {
      console.error('Error fetching checkpoints:', err);
      res.status(500).json({ error: 'Failed to fetch checkpoints' });
    }
  });

  app.post('/api/checkpoints', requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = await getOrCreateUser(req.user!.uid, req.user!.email || '');
      const { siteId, siteName, notes, rating } = req.body;
      
      const payload = {
        userId: user.id,
        siteId: Number(siteId),
        siteName,
        notes,
        rating: rating ? Number(rating) : 5,
      };

      if (isSupabaseConfigured()) {
        await addSupabaseCheckpoint(payload);
      }

      const checkpoint = await addCheckpoint(payload);
      res.status(201).json({ success: true, checkpoint });
    } catch (err: any) {
      console.error('Error adding checkpoint:', err);
      res.status(500).json({ error: 'Failed to record checkpoint' });
    }
  });

  // API Route: Group Expeditions
  app.get('/api/expeditions', async (_req, res) => {
    try {
      if (isSupabaseConfigured()) {
        const sExp = await getSupabaseExpeditions();
        if (sExp && sExp.length > 0) return res.json(sExp);
      }
      const expeditions = await getGroupExpeditions();
      res.json(expeditions);
    } catch (err: any) {
      console.error('Error fetching expeditions:', err);
      res.status(500).json({ error: 'Failed to fetch expeditions' });
    }
  });

  // API Route: Smart Travel Tips (Gemini Search Grounding)
  app.post('/api/travel-tips', async (req, res) => {
    try {
      const { destination, topic } = req.body;
      if (!destination) {
        return res.status(400).json({ error: 'Destination is required' });
      }
      const tips = await getSmartTravelTips(destination, topic);
      res.json(tips);
    } catch (err: any) {
      console.error('Travel tips API error:', err);
      res.status(500).json({ error: 'Failed to generate travel tips' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('/favicon.ico', (_req, res) => {
      res.sendFile(path.join(distPath, 'favicon.svg'));
    });
    app.get('{*splat}', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

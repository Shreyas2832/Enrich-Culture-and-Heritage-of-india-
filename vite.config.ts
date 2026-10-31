import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { getSmartTravelTips } from './src/server/travelTipsService';

function ttsProxyPlugin(): Plugin {
  const handler = async (req: any, res: any) => {
    try {
      const url = new URL(req.url, 'http://localhost:3000');
      const q = url.searchParams.get('q') || '';
      const tl = url.searchParams.get('tl') || 'mr';
      if (!q) {
        res.statusCode = 400;
        res.end('Missing text parameter');
        return;
      }
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(q)}`;
      const response = await fetch(ttsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      if (!response.ok) {
        res.statusCode = response.status;
        res.end();
        return;
      }
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      const arrayBuffer = await response.arrayBuffer();
      res.end(Buffer.from(arrayBuffer));
    } catch (err) {
      console.error('TTS Proxy error:', err);
      res.statusCode = 500;
      res.end();
    }
  };

  return {
    name: 'tts-proxy-middleware',
    configureServer(server) {
      server.middlewares.use('/api/tts', (req, res) => {
        handler(req, res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tts', (req, res) => {
        handler(req, res);
      });
    },
  };
}

function travelTipsPlugin(env: Record<string, string>): Plugin {
  const handler = async (req: any, res: any) => {
    try {
      let destination = 'Varanasi Assi Ghat';
      let topic = 'safety, local etiquette, and sacred rituals';

      if (req.method === 'POST') {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
        }
        if (body) {
          try {
            const parsed = JSON.parse(body);
            if (parsed.destination) destination = parsed.destination;
            if (parsed.topic) topic = parsed.topic;
          } catch (e) {
            // Use defaults if parse fails
          }
        }
      } else {
        const url = new URL(req.url, 'http://localhost:3000');
        destination = url.searchParams.get('destination') || destination;
        topic = url.searchParams.get('topic') || topic;
      }

      const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      const result = await getSmartTravelTips(destination, topic, apiKey);

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (err: any) {
      console.error('Travel Tips API error:', err);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err?.message || 'Internal Server Error' }));
    }
  };

  return {
    name: 'travel-tips-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/travel-tips', (req, res) => {
        handler(req, res);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/travel-tips', (req, res) => {
        handler(req, res);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), ttsProxyPlugin(), travelTipsPlugin(env)],
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});


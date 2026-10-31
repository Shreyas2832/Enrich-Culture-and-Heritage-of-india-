import { useState, useEffect } from 'react';
import { 
  Database, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Table, 
  KeyRound, 
  Globe2, 
  Zap,
  AlertCircle,
  Copy,
  Check,
  Code
} from 'lucide-react';
import { 
  getStoredSupabaseConfig, 
  saveCustomSupabaseConfig, 
  testSupabaseConnection, 
  openSupabaseInBrowser 
} from '../lib/supabase';
import { SUPABASE_INIT_SQL } from '../lib/supabaseSql';

interface DatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DatabaseModal({ isOpen, onClose }: DatabaseModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'supabase' | 'tables'>('overview');
  
  // Database health state
  const [dbHealth, setDbHealth] = useState<any>(null);
  const [isHealthLoading, setIsHealthLoading] = useState(false);

  // Supabase connection config state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Table rows preview
  const [tableData, setTableData] = useState<any[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDbHealth();
      const config = getStoredSupabaseConfig();
      setSupabaseUrl(config.url);
      setSupabaseAnonKey(config.anonKey);
      fetchTablePreview();
    }
  }, [isOpen]);

  const fetchDbHealth = async () => {
    setIsHealthLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setDbHealth(data);
      }
    } catch (err) {
      console.error('Failed to fetch DB health:', err);
    } finally {
      setIsHealthLoading(false);
    }
  };

  const fetchTablePreview = async () => {
    setIsTableLoading(true);
    try {
      const res = await fetch('/api/civic-reports');
      if (res.ok) {
        const data = await res.json();
        setTableData(data);
      }
    } catch (err) {
      console.error('Failed to fetch table data:', err);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleTestSupabase = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
      setTestResult(res);
      fetchDbHealth();
    } catch (err: any) {
      setTestResult({ success: false, message: err?.message || 'Connection test failed.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveSupabase = () => {
    saveCustomSupabaseConfig(supabaseUrl, supabaseAnonKey);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    fetchDbHealth();
    fetchTablePreview();
  };

  const handleOpenSupabase = () => {
    openSupabaseInBrowser(supabaseUrl);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_INIT_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  if (!isOpen) return null;

  const isSupabaseLive = dbHealth?.supabase?.isConfigured;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div 
        className="bg-[#FDFBF7] w-full max-w-2xl rounded-xl border border-[#2D2A26]/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#1B6B47]/10 border border-[#1B6B47]/30 flex items-center justify-center text-[#1B6B47]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-[#2D2A26]">Database & Supabase Hub</h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isSupabaseLive
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  {isSupabaseLive ? 'Supabase Active' : 'PostgreSQL Active'}
                </span>
              </div>
              <p className="text-xs text-[#5A5A5A] font-sans">
                PostgreSQL data store, live sync with Supabase & table schema generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-[#2D2A26]/70 hover:text-[#2D2A26] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#2D2A26]/10 bg-[#FAF7F0] px-6 text-xs font-sans font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-[#B05B3B] text-[#B05B3B]'
                : 'border-transparent text-[#5A5A5A] hover:text-[#2D2A26]'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Connection Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('supabase')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'supabase'
                ? 'border-[#1B6B47] text-[#1B6B47]'
                : 'border-transparent text-[#5A5A5A] hover:text-[#2D2A26]'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Supabase Gateway</span>
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-all flex items-center gap-1.5 ${
              activeTab === 'tables'
                ? 'border-[#B05B3B] text-[#B05B3B]'
                : 'border-transparent text-[#5A5A5A] hover:text-[#2D2A26]'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Schema & Tables</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm font-sans flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Primary Database Status Card */}
              <div className="p-4 rounded-lg bg-white border border-[#2D2A26]/15 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#1B6B47]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#2D2A26]">
                      Active Database Engine: {dbHealth?.primaryEngine || 'PostgreSQL'}
                    </span>
                  </div>
                  <button
                    onClick={fetchDbHealth}
                    disabled={isHealthLoading}
                    className="text-xs text-[#B05B3B] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isHealthLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#2D2A26]/10">
                    <div className="text-[10px] text-[#5A5A5A] uppercase tracking-wider">Primary Store</div>
                    <div className="font-bold text-xs text-[#2D2A26] mt-0.5">
                      {isSupabaseLive ? 'Supabase DB' : 'Cloud SQL DB'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#2D2A26]/10">
                    <div className="text-[10px] text-[#5A5A5A] uppercase tracking-wider">Cloud Instance</div>
                    <div className="font-bold text-xs text-[#2D2A26] mt-0.5 truncate">
                      {dbHealth?.supabase?.projectRef ? `${dbHealth.supabase.projectRef}.supabase.co` : 'ai-studio-4204a64c'}
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#2D2A26]/10">
                    <div className="text-[10px] text-[#5A5A5A] uppercase tracking-wider">Region</div>
                    <div className="font-bold text-xs text-[#2D2A26] mt-0.5">asia-southeast1</div>
                  </div>
                  <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#2D2A26]/10">
                    <div className="text-[10px] text-[#5A5A5A] uppercase tracking-wider">Storage Layer</div>
                    <div className="font-bold text-xs text-[#2D2A26] mt-0.5">PostgreSQL</div>
                  </div>
                </div>

                {dbHealth && (
                  <div className="text-xs text-[#5A5A5A] flex items-center gap-1.5 pt-1 border-t border-[#2D2A26]/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {isSupabaseLive 
                        ? `Supabase connected (${dbHealth?.supabase?.ping || 'active'})`
                        : `Cloud SQL connected (${dbHealth?.cloudSql?.status || 'active'})`}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Banner: Open Supabase in Browser */}
              <div className="p-4 rounded-lg bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4 text-emerald-700" />
                    Supabase Browser Dashboard
                  </h4>
                  <p className="text-xs text-emerald-800/80 mt-0.5">
                    Access your Supabase dashboard, execute SQL statements, or inspect table records directly in a new browser tab.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('supabase')}
                    className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-1 mt-2 cursor-pointer"
                  >
                    <span>Configure Project URL & Anon Key</span>
                    <span>→</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleOpenSupabase}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 shadow-xs"
                >
                  <span>Open Supabase in Browser</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Security & Auth Sync Note */}
              <div className="p-4 rounded-lg bg-[#FAF7F0] border border-[#2D2A26]/15 space-y-2 text-xs text-[#5A5A5A]">
                <div className="font-bold text-[#2D2A26] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B05B3B]" />
                  Integrated Authentication + Dual Storage Architecture
                </div>
                <p>
                  All reports and visitor entries are persisted. When Supabase is configured with your URL and key, the backend writes directly to your Supabase tables while keeping Cloud SQL as a high-availability fallback.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE GATEWAY */}
          {activeTab === 'supabase' && (
            <div className="space-y-4">
              <div className="text-xs text-[#5A5A5A] leading-relaxed">
                Connect Heritec to your Supabase project. You can find your Project URL and Anon Key under <strong>Project Settings → API</strong> in your Supabase Dashboard.
              </div>

              <div className="space-y-3 bg-white p-4 rounded-lg border border-[#2D2A26]/15">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-1">
                    Supabase Project URL
                  </label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full px-3 py-2 border border-[#2D2A26]/20 rounded text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] mb-1">
                    Supabase Anon Public API Key
                  </label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full px-3 py-2 border border-[#2D2A26]/20 rounded text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-hidden font-mono"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleTestSupabase}
                    disabled={isTesting || !supabaseUrl}
                    className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F2ECE1] border border-[#2D2A26]/20 rounded text-xs font-bold text-[#2D2A26] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{isTesting ? 'Testing Ping...' : 'Test Connection'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveSupabase}
                    className="px-4 py-1.5 bg-[#1B6B47] hover:bg-[#145236] text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Save Configuration</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenSupabase}
                    className="px-3 py-1.5 bg-white hover:bg-black/5 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <span>Open Supabase Browser</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {savedSuccess && (
                  <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Supabase settings saved! The app will now query and store records using Supabase.</span>
                  </div>
                )}

                {testResult && (
                  <div className={`text-xs p-2.5 rounded border flex items-start gap-1.5 ${
                    testResult.success 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {testResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <span>{testResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TABLES & SCHEMA INITIALIZATION */}
          {activeTab === 'tables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#5A5A5A]">
                  Database Tables Schema:
                </div>
                <button
                  onClick={fetchTablePreview}
                  className="text-xs text-[#B05B3B] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isTableLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded bg-white border border-[#2D2A26]/15">
                  <div className="font-bold text-[#2D2A26]">users</div>
                  <div className="text-[10px] text-[#5A5A5A]">UID, email, role, travel mode</div>
                </div>
                <div className="p-2.5 rounded bg-white border border-[#2D2A26]/15">
                  <div className="font-bold text-[#2D2A26]">civic_reports</div>
                  <div className="text-[10px] text-[#5A5A5A]">Site, category, severity, notes</div>
                </div>
                <div className="p-2.5 rounded bg-white border border-[#2D2A26]/15">
                  <div className="font-bold text-[#2D2A26]">traveler_checkpoints</div>
                  <div className="text-[10px] text-[#5A5A5A]">Solo visited sites, timestamps</div>
                </div>
                <div className="p-2.5 rounded bg-white border border-[#2D2A26]/15">
                  <div className="font-bold text-[#2D2A26]">group_expeditions</div>
                  <div className="text-[10px] text-[#5A5A5A]">Cohort itineraries, leaders</div>
                </div>
              </div>

              {/* 1-Click SQL Schema Setup Script */}
              <div className="p-4 rounded-lg bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-amber-700" />
                    Supabase Schema Initialization SQL Script
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL Script'}</span>
                  </button>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  To create all required tables and Row-Level Security policies in your Supabase project with one click: copy this SQL script, click <strong>"Open Supabase in Browser"</strong>, paste it into the <strong>SQL Editor</strong>, and click <strong>Run</strong>.
                </p>
              </div>

              {/* Data Preview */}
              <div className="border border-[#2D2A26]/15 rounded-lg overflow-hidden bg-white">
                <div className="px-3 py-2 bg-[#FAF7F0] border-b border-[#2D2A26]/10 font-bold text-xs text-[#2D2A26] flex items-center justify-between">
                  <span>civic_reports ({tableData.length} records)</span>
                </div>
                <div className="p-3 max-h-48 overflow-y-auto font-mono text-[11px] text-[#2D2A26]/80">
                  {tableData.length === 0 ? (
                    <div className="text-center py-4 text-[#5A5A5A] italic">
                      No records in civic_reports yet. Submit reports via the Civic Report tab to populate data!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {tableData.map((row: any, idx: number) => (
                        <div key={idx} className="p-2 bg-[#FAF7F0] rounded border border-[#2D2A26]/10">
                          <div className="font-bold text-[#2D2A26]">{row.siteName || row.site_name} - {row.category}</div>
                          <div className="text-[#5A5A5A] text-[10px] mt-0.5">{row.description}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#2D2A26]/10 bg-white flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleOpenSupabase}
            className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>supabase.com/dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2D2A26] hover:bg-black text-white rounded font-bold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

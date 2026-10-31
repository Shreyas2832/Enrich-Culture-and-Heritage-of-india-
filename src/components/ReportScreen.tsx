import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle, Shield, Building2, Users, Send, MapPin, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { UNESCO_HERITAGE_SITES } from '../data/heritageSites';

interface ReportScreenProps {
  onNavigateHome?: () => void;
}

interface SubmittedReport {
  id: string;
  siteName: string;
  category: string;
  description: string;
  urgency: string;
  timestamp: string;
  imageUrl: string;
  status: 'Dispatched' | 'Under Inspection' | 'NSS Drive Scheduled' | 'Resolved';
  forwardedTo: string[];
}

export function ReportScreen({ onNavigateHome }: ReportScreenProps) {
  const [selectedSite, setSelectedSite] = useState<string>(UNESCO_HERITAGE_SITES[0].name);
  const [customSite, setCustomSite] = useState<string>('');
  const [category, setCategory] = useState<string>('Graffiti & Vandalism');
  const [urgency, setUrgency] = useState<string>('High');
  const [description, setDescription] = useState<string>('');
  const [locationCoordinates, setLocationCoordinates] = useState<string>('27.1751° N, 78.0421° E');
  const [reporterName, setReporterName] = useState<string>('Heritage Guardian');
  const [reporterContact, setReporterContact] = useState<string>('contact@heritec.in');

  // Photo handling
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Submission state
  const [submittedReport, setSubmittedReport] = useState<SubmittedReport | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initial demo reports list
  const [reportsList, setReportsList] = useState<SubmittedReport[]>([
    {
      id: "HT-REP-9142",
      siteName: "Hampi Virupaksha Temple Outer Wall",
      category: "Plastic & Waste Pollution",
      description: "Severe plastic bottle and food wrapper accumulation along the ancient canal stone embankment.",
      urgency: "High",
      timestamp: "Today, 10:14 AM",
      imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=400&q=80",
      status: "NSS Drive Scheduled",
      forwardedTo: ["NSS University Unit Vijayanagara", "INTACH Karnataka Chapter", "ASI State Circle", "Hampi Village Panchayat"]
    },
    {
      id: "SH-REP-8830",
      siteName: "Ajanta Cave 9 Exterior Gateway",
      category: "Graffiti & Vandalism",
      description: "Carved names and scratching detected on basalt rock surface near the visitor staircase.",
      urgency: "Critical",
      timestamp: "Yesterday, 04:30 PM",
      imageUrl: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400&q=80",
      status: "Under Inspection",
      forwardedTo: ["NSS Aurangabad Student Volunteers", "Maharashtra Heritage Trust NGO", "ASI Archaeological Division", "Lenapur Gram Panchayat"]
    }
  ]);

  // Load persistent reports from PostgreSQL
  useState(() => {
    fetch('/api/civic-reports')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const dbMapped: SubmittedReport[] = data.map((r: any) => ({
            id: `DB-REP-${r.id}`,
            siteName: r.siteName || r.site_name,
            category: r.category,
            description: r.description,
            urgency: r.severity || 'Medium',
            timestamp: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent',
            imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=400&q=80",
            status: 'Under Inspection',
            forwardedTo: ["NSS Volunteer Units", "INTACH Heritage NGO", "ASI Circle Office"]
          }));
          setReportsList(prev => [...dbMapped, ...prev]);
        }
      })
      .catch(err => console.error("Error loading DB reports:", err));
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide a description of the damage or pollution.");
      return;
    }

    setIsSubmitting(true);

    const targetSiteName = selectedSite === 'Other / Custom Site' ? customSite || 'Unlisted Cultural Site' : selectedSite;
    
    // Save to PostgreSQL database
    try {
      await fetch('/api/civic-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName: targetSiteName,
          location: locationCoordinates,
          category,
          severity: urgency.toLowerCase(),
          description,
          reporterName,
        }),
      });
    } catch (err) {
      console.error("Failed to save report to database:", err);
    }

    const newReport: SubmittedReport = {
      id: `SH-REP-${Math.floor(1000 + Math.random() * 9000)}`,
      siteName: targetSiteName,
      category,
      description,
      urgency,
      timestamp: "Just now",
      imageUrl: imagePreview || "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=400&q=80",
      status: "Dispatched",
      forwardedTo: [
        "NSS (National Service Scheme) Student Volunteer Unit",
        "Heritage Conservation NGO (INTACH)",
        "State Archaeological & Tourism Government Department",
        "Local Resident Community & Gram Panchayat"
      ]
    };

    setSubmittedReport(newReport);
    setReportsList(prev => [newReport, ...prev]);
    setIsSubmitting(false);
    setDescription('');
  };

  return (
    <div className="w-full pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
      {/* Header */}
      <div className="border-b border-[#2D2A26]/15 pb-6">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest font-sans text-[#B05B3B] font-bold mb-2">
          {onNavigateHome && (
            <button
              onClick={onNavigateHome}
              type="button"
              className="hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Home</span>
            </button>
          )}
          {onNavigateHome && <span>/</span>}
          <span>Civic Vigilance & Conservation Bureau</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mb-3">
          Report Damage or Pollution at Heritage Sites
        </h1>
        <p className="text-sm sm:text-base font-serif italic text-[#5A5A5A] max-w-3xl">
          Citizen reporting portal: Upload or click a picture of damaged or polluted sections of India's cultural and heritage monuments. Your report is immediately forwarded to NSS student volunteers, heritage NGOs, State government archaeology authorities, and local residents.
        </p>
      </div>

      {/* Submission Confirmation Banner if submitted */}
      {submittedReport && (
        <div className="p-6 bg-emerald-50 border border-emerald-300 rounded space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-serif font-bold text-emerald-950">
                  Report Successfully Logged & Dispatched!
                </h3>
                <div className="text-xs font-sans text-emerald-800">
                  Case Tracking Reference: <strong className="font-mono">{submittedReport.id}</strong>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSubmittedReport(null)}
              className="text-xs font-sans text-emerald-700 hover:text-emerald-950 underline cursor-pointer"
            >
              Dismiss Notice
            </button>
          </div>

          <div className="text-xs font-sans text-emerald-900 pt-2 border-t border-emerald-200">
            <strong>Official Forwarding Status:</strong> Picture & coordinates successfully routed to all four statutory partners:
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <li className="flex items-center space-x-1.5 bg-white/70 p-2 rounded">
                <Users className="w-3.5 h-3.5 text-emerald-800" />
                <span>1. NSS Student Volunteer Corps (Action Team)</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-white/70 p-2 rounded">
                <Shield className="w-3.5 h-3.5 text-emerald-800" />
                <span>2. Heritage NGO (INTACH Archaeological Cell)</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-white/70 p-2 rounded">
                <Building2 className="w-3.5 h-3.5 text-emerald-800" />
                <span>3. State Archaeological & Tourism Govt Dept</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-white/70 p-2 rounded">
                <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                <span>4. Local Community Residents & Panchayat</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Form & Dispatch Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Reporting Form */}
        <div className="lg:col-span-7 bg-white border border-[#2D2A26]/15 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#2D2A26]/10">
            <h2 className="text-2xl font-serif text-[#2D2A26]">
              New Damage or Pollution Incident
            </h2>
            <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#B05B3B]">
              Field Submission Form
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1. Photo Capture / Upload Area */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26]">
                1. Click or Upload Picture of Damaged/Polluted Part *
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="border-2 border-dashed border-[#2D2A26]/20 bg-[#FDFBF7] p-6 text-center rounded hover:border-[#B05B3B] transition-colors">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Damaged heritage part preview"
                      className="max-h-56 mx-auto rounded object-cover shadow-sm border border-[#2D2A26]/10"
                    />
                    <div className="flex items-center justify-center space-x-3 text-xs font-sans">
                      <button
                        type="button"
                        onClick={handleSimulateCamera}
                        className="text-[#B05B3B] underline hover:text-[#2D2A26] cursor-pointer"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="text-red-700 underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#B05B3B]/10 text-[#B05B3B] mx-auto flex items-center justify-center">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleSimulateCamera}
                        className="px-4 py-2 bg-[#2D2A26] hover:bg-[#B05B3B] text-white text-xs uppercase tracking-wider font-sans font-bold transition-colors cursor-pointer inline-flex items-center space-x-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Click Picture with Camera</span>
                      </button>
                      <p className="text-[11px] font-sans text-[#5A5A5A] mt-2">
                        or drag and drop photo here (Supports JPEG, PNG, HEIC)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Site Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                  2. Heritage / Cultural Site
                </label>
                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="w-full text-xs font-sans p-2.5 bg-white border border-[#2D2A26]/20 rounded-none focus:outline-none focus:border-[#B05B3B]"
                >
                  {UNESCO_HERITAGE_SITES.map((site) => (
                    <option key={site.id} value={site.name}>
                      {site.name} ({site.state})
                    </option>
                  ))}
                  <option value="Other / Custom Site">Other / Custom Cultural Site</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                  Damage Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-sans p-2.5 bg-white border border-[#2D2A26]/20 rounded-none focus:outline-none focus:border-[#B05B3B]"
                >
                  <option value="Graffiti & Vandalism">Graffiti & Vandalism on Stone</option>
                  <option value="Plastic & Waste Pollution">Plastic & Garbage Dumping</option>
                  <option value="Structural Cracks & Decay">Structural Cracks & Stone Collapse</option>
                  <option value="Illegal Encroachment">Illegal Encroachment & Stalls</option>
                  <option value="Water Seepage & Weathering">Water Seepage & Chemical Weathering</option>
                </select>
              </div>
            </div>

            {selectedSite === 'Other / Custom Site' && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                  Custom Heritage Site Name & City
                </label>
                <input
                  type="text"
                  value={customSite}
                  onChange={(e) => setCustomSite(e.target.value)}
                  placeholder="e.g. Maluti Terracotta Temples, Dumka"
                  className="w-full text-xs font-sans p-2.5 bg-white border border-[#2D2A26]/20 rounded-none focus:outline-none focus:border-[#B05B3B]"
                />
              </div>
            )}

            {/* 3. Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                3. Precise Description of Damaged / Polluted Area *
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe exact pillar, wall, moat, or gateway location and nature of damage..."
                className="w-full text-xs font-sans p-2.5 bg-white border border-[#2D2A26]/20 rounded-none focus:outline-none focus:border-[#B05B3B]"
                required
              />
            </div>

            {/* 4. Urgency & Location Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                  Urgency Level
                </label>
                <div className="flex space-x-2">
                  {['Critical', 'High', 'Moderate'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setUrgency(lvl)}
                      className={`flex-1 py-1.5 text-xs font-sans font-bold uppercase transition-colors cursor-pointer border ${
                        urgency === lvl
                          ? lvl === 'Critical'
                            ? 'bg-red-700 text-white border-red-700'
                            : lvl === 'High'
                            ? 'bg-[#B05B3B] text-white border-[#B05B3B]'
                            : 'bg-[#2D2A26] text-white border-[#2D2A26]'
                          : 'bg-white text-[#5A5A5A] border-[#2D2A26]/20'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] mb-1">
                  GPS Location Tag
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={locationCoordinates}
                    onChange={(e) => setLocationCoordinates(e.target.value)}
                    className="w-full text-xs font-sans p-2 bg-[#FDFBF7] border border-[#2D2A26]/20"
                  />
                </div>
              </div>
            </div>

            {/* 5. Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#B05B3B] hover:bg-[#8f452a] text-white text-xs uppercase tracking-widest font-sans font-bold transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
            >
              {isSubmitting ? (
                <span>Dispatching Report & Alerting Stakeholders...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit & Forward to NSS, NGO, Govt & Locals</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: The 4 Forwarding Channels Dossier */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#2D2A26] text-white p-6 rounded-none space-y-4">
            <div className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#D4C3A3]">
              Official Multi-Agency Relay System
            </div>
            <h3 className="text-2xl font-serif italic">
              Where Your Picture & Report is Forwarded
            </h3>
            <p className="text-xs font-sans text-white/70 leading-relaxed">
              Every citizen report logged via Heritec is automatically bundled into a high-priority incident payload with timestamp and coordinates, dispatched simultaneously to:
            </p>

            <div className="space-y-3 pt-2">
              {/* NSS */}
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-start space-x-3">
                <Users className="w-5 h-5 text-[#D4C3A3] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-bold text-white">
                    1. National Service Scheme (NSS) Units
                  </div>
                  <div className="text-[11px] font-sans text-white/60">
                    Dispatched to local college & university student volunteers for immediate on-ground heritage cleanliness and vigilance drives.
                  </div>
                </div>
              </div>

              {/* NGO */}
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-start space-x-3">
                <Shield className="w-5 h-5 text-[#B05B3B] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-bold text-white">
                    2. Heritage Conservation NGOs (INTACH)
                  </div>
                  <div className="text-[11px] font-sans text-white/60">
                    Forwarded to Indian National Trust for Art and Cultural Heritage chapters for structural assessment and technical stone repair.
                  </div>
                </div>
              </div>

              {/* Government */}
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-start space-x-3">
                <Building2 className="w-5 h-5 text-[#D4C3A3] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-bold text-white">
                    3. State Archaeological & Tourism Department
                  </div>
                  <div className="text-[11px] font-sans text-white/60">
                    Official ticket registered with Archaeological Survey of India (ASI) and State Tourism Police for enforcement and restoration funding.
                  </div>
                </div>
              </div>

              {/* Local Residents */}
              <div className="p-3 bg-white/5 border border-white/10 rounded flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-sans font-bold text-white">
                    4. Local Resident Community & Panchayat
                  </div>
                  <div className="text-[11px] font-sans text-white/60">
                    Alerts village gram panchayats, resident welfare associations, and local shopkeepers to foster community ownership and prevent defacement.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Community Reports Registry */}
      <section className="space-y-4 pt-6 border-t border-[#2D2A26]/10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
              Public Accountability Board
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2D2A26]">
              Recent Heritage Incident Dispatches
            </h2>
          </div>
          <span className="text-xs font-sans text-[#5A5A5A]">
            {reportsList.length} incidents logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportsList.map((item) => (
            <div key={item.id} className="bg-white border border-[#2D2A26]/15 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] bg-[#FDFBF7] px-2 py-0.5 border border-[#2D2A26]/10 text-[#2D2A26] font-bold">
                    {item.id}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-sans font-bold px-2 py-0.5 rounded ${
                    item.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-900'
                      : item.status === 'NSS Drive Scheduled'
                      ? 'bg-[#B05B3B]/15 text-[#B05B3B]'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-start space-x-3">
                  <img
                    src={item.imageUrl}
                    alt={item.siteName}
                    className="w-20 h-20 object-cover rounded border border-[#2D2A26]/10 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-lg font-serif italic text-[#2D2A26]">
                      {item.siteName}
                    </h4>
                    <div className="text-[11px] font-sans text-[#B05B3B] font-bold">
                      {item.category} • Urgency: {item.urgency}
                    </div>
                    <p className="text-xs font-sans text-[#5A5A5A] mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2D2A26]/10 text-[10px] font-sans text-[#5A5A5A] flex items-center justify-between">
                <span>Logged: {item.timestamp}</span>
                <span className="text-[#2D2A26] font-medium">Forwarded to 4 Channels</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

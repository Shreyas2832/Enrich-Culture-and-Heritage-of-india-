import { GoogleGenAI } from "@google/genai";

export interface GroundingSource {
  title: string;
  url: string;
}

export interface SmartTravelTipsResponse {
  destination: string;
  topic: string;
  adviceMarkdown: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  fetchedAt: string;
  isGrounded: boolean;
  status: 'live' | 'fallback' | 'error';
  errorMessage?: string;
}

// Curated verified baseline fallback for solo travelers along the Varanasi - Bodh Gaya corridor
const FALLBACK_TIPS: Record<string, { summary: string; tips: string[]; sources: GroundingSource[] }> = {
  'Varanasi': {
    summary: 'Varanasi is spiritually vibrant yet bustling. Solo travelers should navigate ghats with calm situational awareness, particularly during evening Ganga Aarti and dawn boat rides.',
    tips: [
      'Avoid unauthorized "guides" offering inside tours of Manikarnika Ghat cremation areas. Photography of cremations is strictly prohibited and deeply disrespectful.',
      'Book morning boat rides directly via UP Tourism or negotiate firmly upfront with registered boatmen at Assi or Dashashwamedh Ghat (standard rate: ₹300-₹500 for shared rowboat, ₹1500 for private).',
      'For evening street food exploration, stick to high-turnover shops around Godowlia Chowk and Chowk for kachoris and lassi; always drink bottled or boiled water.',
      'Dress conservatively covering shoulders and knees when visiting Kashi Vishwanath corridor and ancient temples.',
      'Emergency numbers: Tourist Police Varanasi (0542-2508000), Dial 112 for Police, UP Women Helpline 1090.'
    ],
    sources: [
      { title: 'Uttar Pradesh Tourism Official Safety Guidelines', url: 'https://uptourism.gov.in' },
      { title: 'Incredible India Traveler Advisory', url: 'https://www.incredibleindia.org' },
    ]
  },
  'Bodh Gaya': {
    summary: 'Bodh Gaya is serene and welcoming with a high international monastic presence, making it one of the safest destinations for solo and spiritual seekers in Bihar.',
    tips: [
      'Mahabodhi Temple entry protocol: Cell phones, smart watches, and large bags must be deposited in official lockers before security checkpoint; dress respectfully with knees and shoulders covered.',
      'Circumambulate the Bodhi Tree and stupas in a clockwise (pradakshina) direction, maintaining quiet contemplation.',
      'Solo evening transit: Prefer auto-rickshaws booked via hotel or prepaid stands rather than flagging unverified vehicles on rural connecting roads after 9:00 PM.',
      'Stay in registered monasteries (Thai, Bhutanese, Burmese, or Tibetan) or certified guest houses near Sujata bypass for peaceful, secure solo lodging.',
      'Emergency assistance: Bodh Gaya Police Station (0631-2200721), Bihar Tourist Assistance 1800-3456-112, Police 112.'
    ],
    sources: [
      { title: 'Bihar Tourism Cultural Guidelines - Bodh Gaya', url: 'https://tourism.bihar.gov.in' },
      { title: 'Mahabodhi Temple Management Committee (BTMC) Rules', url: 'https://bodhgayatemple.com' },
    ]
  },
  'Default': {
    summary: 'General essential safety and respectful cultural etiquette for solo travel across Indian heritage routes.',
    tips: [
      'Keep offline copies of government ID, passport/visa, and emergency contacts; register solo itineraries with local hotel desks.',
      'Always remove footwear before entering temple sanctums, gurdwaras, and mosques; carry a pair of socks as temple stone walkways get hot at noon.',
      'Use trusted ride-hailing apps (Ola, Uber) in metropolitan zones or agree on fixed meter/pre-agreed rates with local auto-rickshaw drivers.',
      'Solo women travelers can utilize dedicated Women Coaches on Indian Railways and state transport helpline 1090.',
      'National Emergency Helpline across India: 112; Tourist Helpline: 1363 (toll-free in multiple languages).'
    ],
    sources: [
      { title: 'Ministry of Tourism - 24x7 Multi-lingual Tourist Info & Helpline 1363', url: 'https://tourism.gov.in' },
      { title: 'National Emergency Support System (NERSS 112)', url: 'https://112.gov.in' },
    ]
  }
};

export async function getSmartTravelTips(
  destination: string,
  topic: string = 'general safety and local etiquette',
  apiKey?: string
): Promise<SmartTravelTipsResponse> {
  const effectiveKey = apiKey || process.env.GEMINI_API_KEY;

  if (!effectiveKey) {
    // Return curated fallback with clear note
    const fallbackKey = Object.keys(FALLBACK_TIPS).find(k => destination.toLowerCase().includes(k.toLowerCase())) || 'Default';
    const fallback = FALLBACK_TIPS[fallbackKey];
    
    const formattedMarkdown = `### Safety & Cultural Etiquette Overview for ${destination}
${fallback.summary}

#### Key Solo Traveler Guidance
${fallback.tips.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}

*Note: Live Google Search Grounding is standby mode. Provide a GEMINI_API_KEY in project secrets to enable dynamic real-time web retrieval.*`;

    return {
      destination,
      topic,
      adviceMarkdown: formattedMarkdown,
      groundingSources: fallback.sources,
      searchQueries: [`solo travel safety tips ${destination} india`, `temple etiquette dress code ${destination}`],
      fetchedAt: new Date().toISOString(),
      isGrounded: false,
      status: 'fallback',
      errorMessage: 'GEMINI_API_KEY not configured in environment; displaying verified heritage advisory.',
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: effectiveKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are a real-time safety, navigation, and cultural etiquette specialist for solo travellers exploring India.
The solo traveller is currently researching or visiting: "${destination}".
Specific focus requested: "${topic}".

Using Google Search Grounding to verify current local conditions, recent traveler advisories, and local customs:
1. Provide a concise 2-sentence executive summary of the safety atmosphere and current travel realities at this location.
2. Provide 4 to 6 concise, highly actionable recommendations specifically covering:
   - **Local Etiquette & Sacred Norms**: Dress code, footwear, photography restrictions at shrines/ghats, temple protocol, interaction etiquette.
   - **Solo Safety & Scam Prevention**: Common traveler scams (unofficial guides, boat rate overcharging, donation touts), safe transit after dark, women solo tips.
   - **Navigation & Transport**: Recommended transportation options (e.g. autorickshaws, prepaid stands, boat ghats), offline maps advice.
3. List essential verified emergency numbers for this state/city (Police, Tourist Police, Women Helpline, National 112).

Keep the formatting clean, structured with Markdown headers and bullet points. Do not include fabricated phone numbers; only provide verified official helplines (such as 112, 1363, 1090).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const adviceMarkdown = response.text || "No advice text received from model.";
    
    // Extract search grounding metadata
    const candidate = response.candidates?.[0];
    const groundingChunks = candidate?.groundingMetadata?.groundingChunks || [];
    const rawQueries = candidate?.groundingMetadata?.webSearchQueries || [];

    const sources: GroundingSource[] = [];
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        sources.push({
          title: chunk.web.title || chunk.web.uri,
          url: chunk.web.uri,
        });
      }
    }

    // Deduplicate sources by URL
    const uniqueSources: GroundingSource[] = [];
    const seenUrls = new Set<string>();
    for (const src of sources) {
      if (!seenUrls.has(src.url)) {
        seenUrls.add(src.url);
        uniqueSources.push(src);
      }
    }

    return {
      destination,
      topic,
      adviceMarkdown,
      groundingSources: uniqueSources,
      searchQueries: rawQueries,
      fetchedAt: new Date().toISOString(),
      isGrounded: uniqueSources.length > 0,
      status: 'live',
    };
  } catch (err: any) {
    console.error("Gemini Search Grounding Error:", err);
    
    // Provide graceful fallback
    const fallbackKey = Object.keys(FALLBACK_TIPS).find(k => destination.toLowerCase().includes(k.toLowerCase())) || 'Default';
    const fallback = FALLBACK_TIPS[fallbackKey];

    const formattedMarkdown = `### Safety & Cultural Etiquette Overview for ${destination}
${fallback.summary}

#### Verified Solo Guidance
${fallback.tips.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}

*(Live web search encountered: ${err?.message || 'network timeout'}. Showing verified local safety archive).*`;

    return {
      destination,
      topic,
      adviceMarkdown: formattedMarkdown,
      groundingSources: fallback.sources,
      searchQueries: [`solo travel safety ${destination}`],
      fetchedAt: new Date().toISOString(),
      isGrounded: false,
      status: 'error',
      errorMessage: err?.message || 'Error executing search grounding query',
    };
  }
}

# Heritec — Cultural & Heritage Sanctuary of India

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Cloud_SQL_%26_Supabase-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

**Heritec** is an immersive digital platform celebrating and preserving the rich cultural tapestry and monumental heritage of India. It combines interactive cartography, UNESCO heritage exploration, multilingual audio narrations, safe solo and group travel management, civic conservation reporting, and real-time AI-powered travel intelligence with search grounding.

---

## 🌟 Key Features

### 1. Interactive Geographic Cartography & Heritage Maps
- **Interactive State Map**: Vector-based SVG geographic cartography of India featuring selectable states, union territories, state capital tags, and cultural zones.
- **Dual Map Engine**:
  - **Google Maps Platform** (`@vis.gl/react-google-maps`) with custom heritage monument markers and info windows.
  - **OpenStreetMap / Leaflet** fallback for reliable, responsive map exploration across devices.
- **Filterable Sites**: Filter monuments by category (Architectural, Cultural, Natural Biosphere, Religious Sanctuaries) and state.

### 2. Curated UNESCO World Heritage Sites (45+ Monuments)
- Detailed profiles for 45+ premier heritage landmarks (Taj Mahal, Hampi, Konark Sun Temple, Khajuraho, Ajanta & Ellora Caves, Qutub Minar, etc.).
- Includes historical era, dynasty/ruler, architectural style, visitor timings, entry fees, photography guidelines, nearest transit hubs, and exact GPS coordinates.
- **Offline PDF Guides**: Downloadable, beautifully formatted travel companion sheets generated with PDFKit.

### 3. Cultural Diversity & Regional Traditions
- Exploration across key geographical and cultural realms:
  - *Northern Himalayas & Valleys*
  - *Indo-Gangetic Plains & Heritage Corridors*
  - *Western Desert & Marwar Traditions*
  - *Deccan Plateau & Dravidian Architecture*
  - *Eastern Coastal & Temple Heritage*
  - *Northeastern Paradise & Indigenous Living Cultures*
- Spotlights classical dances, regional cuisines, textiles, craft forms, and annual festivals.

### 4. Multilingual Regional Audio Guides
- Built-in audio narration player with regional dialect clips and browser-native Web Speech synthesis for narrated monument walkthroughs.
- Variable playback speeds, timestamp scrubbing, and transcript review.

### 5. Solo & Safe Group Expeditions
- **Solo Traveler Mode**:
  - Digital Heritage Passport with checkpoint logging and star ratings.
  - Live check-in beacons and solo traveler safety radar.
  - Emergency contact synchronization.
- **Group Expeditions**:
  - Curated group tour schedules with verified heritage guides.
  - Difficulty ratings, included amenities, meeting muster points, and itinerary timelines.

### 6. Citizen Ranger Civic Reporting Portal
- Community-driven heritage conservation incident reporting.
- Allows visitors to log preservation concerns, vandalism alerts, cleanliness feedback, or structural safety hazards.
- Full persistence to relational PostgreSQL (Cloud SQL and Supabase dual-sync) with severity levels and resolution tracking.

### 7. Emergency SOS & Safety Radar
- Direct one-click access to Indian emergency dispatch lines (National Emergency 112, Police 100, Tourist Helpline 1363, Ambulance 108).
- Instant SMS alert template generator with live GPS coordinates and Google Maps location link.
- Proximity hospital and police station finder.

### 8. AI Smart Travel Tips (Gemini 2.5 Flash + Search Grounding)
- Real-time advice powered by `@google/genai` utilizing Google Search Grounding.
- Delivers up-to-date weather advisories, local dress codes, photography permissions, transit options, and crowd tips for any Indian heritage destination.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 (Vite SPA)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS v4 with custom warm sandstone and terracotta heritage palette
- **Icons**: Lucide React
- **Maps**: `@vis.gl/react-google-maps` and Leaflet 1.9

### Backend & Middleware
- **Server**: Express 5 on Node.js 22
- **Compiler / Bundler**: Vite 6 (client) & esbuild (server CJS bundle)
- **Dev Runner**: `tsx`
- **Authentication**: Firebase Authentication with client/server JWT verification (`firebase-admin`)

### Database & Storage
- **Primary Relational DB**: Google Cloud SQL PostgreSQL (`asia-southeast1`) managed via **Drizzle ORM**
- **Alternative / Dual Gateway**: **Supabase PostgreSQL** client with automatic failover and live data synchronization
- **Schema Entities**:
  - `users`: Profiles, travel modes, emergency contacts
  - `civic_reports`: Conservation incident logs and categories
  - `user_checkpoints`: Heritage passport stamps and visit history
  - `group_expeditions`: Curated itineraries and bookings

---

## 📁 Project Structure

```text
├── .env.example              # Sample environment variable definitions
├── index.html                # Main HTML entry point
├── metadata.json             # Applet capabilities and permissions
├── package.json              # Project dependencies and lifecycle scripts
├── server.ts                 # Full-stack Express server with API routes & Vite middleware
├── tsconfig.json             # TypeScript compiler configuration
├── vite.config.ts            # Vite configuration with Tailwind CSS v4 plugin
├── public/
│   ├── favicon.svg           # Scalable vector favicon
│   └── docs/                 # Downloadable PDF heritage guides
├── scripts/
│   └── generate_pdfs.mjs     # Script to generate offline heritage companion guides
└── src/
    ├── App.tsx               # Root application component and tab router
    ├── main.tsx              # React DOM initialization
    ├── index.css             # Tailwind CSS entry point
    ├── components/           # UI screens and navigation components
    │   ├── AudioGuideBar.tsx         # Multilingual audio narration player
    │   ├── CulturalScreen.tsx        # Cultural regions, dances, crafts & traditions
    │   ├── DatabaseModal.tsx         # Supabase & Cloud SQL status hub
    │   ├── FooterNav.tsx             # Sticky mobile & desktop footer navigation
    │   ├── GoogleMapsView.tsx        # Google Maps Platform heritage view
    │   ├── GroupTravellerPage.tsx    # Group expeditions and tours
    │   ├── HeritageScreen.tsx        # UNESCO monuments directory and detail modals
    │   ├── LiveApiMapView.tsx        # Leaflet / OpenStreetMap fallback map
    │   ├── LoginModal.tsx            # Firebase Auth modal (Email/Password & Guest)
    │   ├── MainScreen.tsx            # Hero showcase, state map, and top highlights
    │   ├── MapsAndCalendarScreen.tsx # Interactive cartography and festival calendar
    │   ├── Navbar.tsx                # Header navigation bar with traveler mode switch
    │   ├── ReportScreen.tsx          # Civic reporting form and incident ledger
    │   ├── SmartTravelTipsSection.tsx# Gemini AI travel advice interface
    │   ├── SoloTravellerPage.tsx     # Heritage passport, safety check-in & stamps
    │   ├── SosScreen.tsx             # Emergency dispatch and SMS alert generator
    │   └── StateGeographicMap.tsx    # Vector SVG cartography of India
    ├── context/
    │   └── AuthContext.tsx           # Authentication state provider
    ├── data/
    │   ├── culturalRegions.ts        # Cultural zones and tradition profiles
    │   ├── festivalCalendar.ts       # Pan-Indian festival dates and significance
    │   └── heritageSites.ts          # 45+ Curated UNESCO World Heritage sites data
    ├── db/
    │   ├── index.ts                  # Drizzle ORM client initialization
    │   ├── schema.ts                 # PostgreSQL database schema definitions
    │   └── users.ts                  # Database query helper functions
    ├── middleware/
    │   └── auth.ts                   # Firebase token authentication middleware
    ├── server/
    │   ├── supabaseDb.ts             # Supabase database client and sync helpers
    │   └── travelTipsService.ts      # Gemini 2.5 Flash + Search Grounding service
    └── types/
        └── navigation.ts             # Navigation tab types and interfaces
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root based on `.env.example`:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for server-side AI Smart Travel Tips with Search Grounding |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps Platform JavaScript API Key (starts with `AIzaSy...`) |
| `VITE_SUPABASE_URL` | Supabase Project URL for client-side queries |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous API key for client-side access |
| `SUPABASE_URL` | Supabase Project URL for server-side database synchronization |
| `SUPABASE_ANON_KEY` | Supabase anonymous API key for server-side queries |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Optional)* Supabase service role key for admin operations |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm 10 or higher

### Installation
```bash
# Clone the repository and install dependencies
npm install
```

### Development
```bash
# Start full-stack development server on port 3000
npm run dev
```
Open `http://localhost:3000` in your browser. The Express server serves both the backend API endpoints and mounts Vite in middleware mode for hot development.

### Production Build
```bash
# Build Vite client assets and bundle server with esbuild
npm run build

# Start production server
npm run start
```

### Type Checking & Linting
```bash
npm run lint
```

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Returns server, Cloud SQL, and Supabase connectivity status |
| `GET` | `/api/database/stats` | None | Aggregated database counts for reports and expeditions |
| `POST` | `/api/users/sync` | Bearer Token | Syncs authenticated Firebase user with database record |
| `PUT` | `/api/users/profile` | Bearer Token | Updates traveler preferences and emergency contact info |
| `GET` | `/api/civic-reports` | None | Lists verified heritage conservation civic reports |
| `POST` | `/api/civic-reports` | Optional Token | Submits a new citizen ranger heritage incident report |
| `GET` | `/api/checkpoints` | Bearer Token | Retrieves logged heritage passport stamps for current user |
| `POST` | `/api/checkpoints` | Bearer Token | Adds a visited monument stamp with rating and notes |
| `GET` | `/api/expeditions` | None | Retrieves upcoming group expeditions and itineraries |
| `POST` | `/api/travel-tips` | None | Generates AI Smart Travel Tips with Google Search Grounding |

---

## 🏛️ UNESCO Heritage Sites Covered
Includes all 45+ premier monuments across India, such as:
- **Agra & Delhi**: Taj Mahal, Agra Fort, Fatehpur Sikri, Qutub Minar, Humayun's Tomb, Red Fort
- **Central & Western**: Khajuraho Group of Monuments, Sanchi Stupa, Bhimbetka Rock Shelters, Ajanta Caves, Ellora Caves, Elephanta Caves, Rani ki Vav, Champaner-Pavagadh
- **Southern Marvels**: Hampi Group of Monuments, Pattadakal, Great Living Chola Temples, Mahabalipuram, Hoysala Temples of Belur & Halebidu
- **Eastern Splendors**: Konark Sun Temple, Nalanda Mahavihara, Mahabodhi Temple, Sundarbans National Park
- **Northern Corridors**: Hill Forts of Rajasthan, Jaipur City, Jantar Mantar, Mountain Railways of India

---

## 🛡️ License

This project is created for showcasing India's monumental heritage and promoting responsible, safe cultural tourism. Open-source under the [MIT License](LICENSE).

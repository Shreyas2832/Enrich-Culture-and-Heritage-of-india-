export interface Checkpoint {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  completed: boolean;
  notes: string;
  coordinates: [number, number]; // lat, lng
  gemBadge?: string;
  womenSafetyRating?: number; // out of 10
}

export interface SoloTravelerProfile {
  name: string;
  role: string;
  bio: string;
  avatarInitials: string;
  placesTravelled: number;
  hiddenGemsDiscovered: number;
  expeditionName: string;
  startPoint: string;
  endPoint: string;
  totalDistanceKm: number;
  currentProgressPct: number;
  checkpoints: Checkpoint[];
  discoveredGemsList: {
    name: string;
    location: string;
    category: string;
    description: string;
  }[];
}

export interface SafeCircuit {
  id: string;
  title: string;
  region: string;
  safetyScore: number; // e.g. 9.8
  ladiesSafetyHighlights: string[];
  keyStops: string[];
  recommendedGroupSize: string;
  stayVerification: string;
  emergencySupport: string;
}

export const SOLO_TRAVELER_DATA: SoloTravelerProfile = {
  name: "Arjun Mehra",
  role: "Architectural Historian & Solo Wanderer",
  bio: "Documenting forgotten stone carvings, river confluences, and living sacred traditions along the ancient Ganga corridor on foot and local rail.",
  avatarInitials: "AM",
  placesTravelled: 14,
  hiddenGemsDiscovered: 6,
  expeditionName: "The Great Magadhan Pilgrimage & River Heritage Trail",
  startPoint: "Assi Ghat, Varanasi, Uttar Pradesh",
  endPoint: "Mahabodhi Temple, Bodh Gaya, Bihar",
  totalDistanceKm: 260,
  currentProgressPct: 75,
  checkpoints: [
    {
      id: "cp-1",
      name: "Assi Ghat & Dashashwamedh",
      location: "Varanasi, UP",
      distanceKm: 0,
      completed: true,
      notes: "Dawn boat ride along the 84 stone ghats, witnessing ancient Ganga Aarti chants.",
      coordinates: [25.2885, 83.0069]
    },
    {
      id: "cp-2",
      name: "Dhamek Stupa & Deer Park",
      location: "Sarnath, UP",
      distanceKm: 14,
      completed: true,
      notes: "Location where Lord Buddha delivered his first sermon (Dharmachakra Pravartana).",
      coordinates: [25.3811, 83.0214]
    },
    {
      id: "cp-3",
      name: "Chunar Sandstone Citadel",
      location: "Mirzapur, UP",
      distanceKm: 58,
      completed: true,
      notes: "Historic fort overlooking river bends, source of Emperor Ashoka's polished pillar stone.",
      coordinates: [25.1278, 82.8732],
      gemBadge: "Rare Sandstone Quarry Heritage"
    },
    {
      id: "cp-4",
      name: "Tomb of Sher Shah Suri",
      location: "Sasaram, Bihar",
      distanceKm: 142,
      completed: true,
      notes: "Spectacular octagonal red sandstone mausoleum set within an artificial square lake.",
      coordinates: [24.9535, 84.0298]
    },
    {
      id: "cp-5",
      name: "Barabar Rock-Cut Caves",
      location: "Jehanabad, Bihar",
      distanceKm: 215,
      completed: false,
      notes: "3rd-century BCE Mauryan echo chambers with glass-smooth polished granite walls.",
      coordinates: [25.0068, 85.0617],
      gemBadge: "Oldest Rock-Cut Caves in India"
    },
    {
      id: "cp-6",
      name: "Mahabodhi Sacred Bodhi Tree",
      location: "Bodh Gaya, Bihar",
      distanceKm: 260,
      completed: false,
      notes: "Final destination: The UNESCO sanctuary where Prince Siddhartha achieved Enlightenment.",
      coordinates: [24.6959, 84.9913]
    }
  ],
  discoveredGemsList: [
    {
      name: "Barabar Granite Caves",
      location: "Jehanabad, Bihar",
      category: "Ancient Architecture",
      description: "Echo chambers with glass-smooth mirror polish constructed in the 3rd century BCE by Emperor Ashoka."
    },
    {
      name: "Chand Baori Stepwell",
      location: "Abhaneri, Rajasthan",
      category: "Hydraulic Wonder",
      description: "3,500 narrow steps carved in geometric symmetry descending 13 stories into the earth."
    },
    {
      name: "Gandikota Canyon Citadel",
      location: "Kadapa, Andhra Pradesh",
      category: "Natural & Fortress",
      description: "Majestic gorge carved by the Penna River framed by a medieval fort citadel."
    },
    {
      name: "Maluti Terracotta Temples",
      location: "Dumka, Jharkhand",
      category: "Terracotta Art",
      description: "72 surviving miniature terracotta temples depicting scenes from Ramayana and Mahabharata."
    },
    {
      name: "Phugtal Cliffside Monastery",
      location: "Zanskar, Ladakh",
      category: "Sacred Hermitage",
      description: "Monastery built into a cliff face around a natural cave, accessible solely on mountain footpaths."
    },
    {
      name: "Unakoti Bas-Relief Rock Sculptures",
      location: "Kailashahar, Tripura",
      category: "Forest Rock Art",
      description: "Thousands of colossal Shiva rock carvings nestled in dense sub-tropical rainforest."
    }
  ]
};

export const GROUP_TRAVELER_DATA = {
  groupName: "Maitri Cultural Collective",
  groupType: "Family & Multi-Gender Heritage Explorers",
  bio: "Curating verified cultural circuits prioritizing safety, respectful local community engagements, well-illuminated heritage walks, and certified female guides.",
  placesTravelled: 28,
  safeCertifiedPlaces: 24,
  expeditionName: "Golden Royalty & Desert Fortresses Circuit",
  startPoint: "Amber Palace, Jaipur, Rajasthan",
  endPoint: "Lake Pichola & City Palace, Udaipur, Rajasthan",
  totalDistanceKm: 395,
  currentProgressPct: 60,
  womenSafetyIndex: 9.8,
  safetyHighlights: [
    "24x7 Verified Tourism Police & Pink Booth Checkpoints",
    "Pre-audited Heritage Haveli Stays with Dedicated Keycards & Female Concierge",
    "ASI-Certified Women Heritage Guides at Monuments",
    "All-hours well-lit heritage bazaar pathways and prepaid government transport",
    "Instant GPS SOS link directly synced with local district tourist helpline"
  ],
  emergencyHelplines: [
    { name: "National Emergency Service", number: "112", desc: "Pan-India Unified Emergency Dispatch" },
    { name: "Women Safety Helpline", number: "1090", desc: "Toll-free 24/7 Police Assistance for Women" },
    { name: "Ministry of Tourism Helpline", number: "1363", desc: "Multi-lingual Tourist Guide & Support" },
    { name: "Pink Booth Heritage Patrol", number: "1091", desc: "Dedicated State Women Safety Cell" }
  ],
  checkpoints: [
    {
      id: "grp-1",
      name: "Amer Fort & Anokhi Museum",
      location: "Jaipur, Rajasthan",
      distanceKm: 0,
      completed: true,
      notes: "Group tour led by certified female docent Smt. Neha Rathore, exploring hand-block printing.",
      coordinates: [26.9855, 75.8513],
      womenSafetyRating: 9.9
    },
    {
      id: "grp-2",
      name: "Jantar Mantar & City Palace",
      location: "Jaipur Pink City",
      distanceKm: 12,
      completed: true,
      notes: "Full CCTV surveillance, pedestrianized heritage corridor, well-lit evening bazaar walks.",
      coordinates: [26.9248, 75.8246],
      womenSafetyRating: 9.8
    },
    {
      id: "grp-3",
      name: "Brahma Temple & Sacred Lake",
      location: "Pushkar, Rajasthan",
      distanceKm: 148,
      completed: true,
      notes: "Designated family ghats, transparent local guide badges, safe group evening Aarti zone.",
      coordinates: [26.4880, 74.5510],
      womenSafetyRating: 9.6
    },
    {
      id: "grp-4",
      name: "Chittorgarh Fort Citadel",
      location: "Chittorgarh, Rajasthan",
      distanceKm: 285,
      completed: false,
      notes: "Vijay Stambha exploration with shuttle transit, verified restrooms, and medical first-aid.",
      coordinates: [24.8887, 74.6269],
      womenSafetyRating: 9.7
    },
    {
      id: "grp-5",
      name: "City Palace & Saheliyon ki Bari",
      location: "Udaipur, Rajasthan",
      distanceKm: 395,
      completed: false,
      notes: "Lakeside illuminated heritage walk, safe boating circuits, and Bagore-ki-Haveli cultural show.",
      coordinates: [24.5764, 73.6835],
      womenSafetyRating: 9.9
    }
  ],
  safeCircuits: [
    {
      id: "sc-1",
      title: "Royal Rajputana Safe Corridor",
      region: "Rajasthan (Jaipur, Jodhpur, Udaipur)",
      safetyScore: 9.8,
      ladiesSafetyHighlights: [
        "Pink Auto-rickshaws driven by women operators in Jaipur",
        "Police assistance booths outside Amer, Mehrangarh, and City Palace",
        "Zero-tolerance tourist grievance kiosk with immediate response"
      ],
      keyStops: ["Hawa Mahal", "Amer Fort", "Mehrangarh Fort", "Lake Pichola"],
      recommendedGroupSize: "4 - 15 Travelers",
      stayVerification: "Heritage hotels with verified CCTV and woman-friendly security protocols",
      emergencySupport: "Rajasthan Tourist Assistance Force (TAF) on active mobile patrol"
    },
    {
      id: "sc-2",
      title: "Serene Spice & Temple Heritage Circuit",
      region: "Kerala (Kochi, Alleppey, Munnar, Thrissur)",
      safetyScore: 9.9,
      ladiesSafetyHighlights: [
        "She-Lodge network and certified Kudumbashree women-run transit",
        "High literacy, highest female traveler comfort rating in India",
        "24-hour illuminated promenade along Fort Kochi Chinese fishing nets"
      ],
      keyStops: ["Mattancherry Palace", "Jewish Synagogue", "Backwater Houseboat", "Kathakali Centre"],
      recommendedGroupSize: "3 - 12 Travelers",
      stayVerification: "Gold-star approved heritage homestays inspected by Kerala Tourism",
      emergencySupport: "Kerala Pink Police Patrol available via one-touch dispatch"
    },
    {
      id: "sc-3",
      title: "Deccan Stone & Silk Trail",
      region: "Karnataka (Mysore, Belur, Halebidu, Hampi)",
      safetyScore: 9.7,
      ladiesSafetyHighlights: [
        "Mysore Palace precinct dedicated family and women safety cells",
        "KSTDC safe buses with SOS alarms and verified conductors",
        "Boulder-strewn Hampi ruins with registered female archaeological guides"
      ],
      keyStops: ["Mysore Amba Vilas Palace", "Belur Chennakeshava", "Hampi Virupaksha Temple"],
      recommendedGroupSize: "4 - 10 Travelers",
      stayVerification: "Karnataka Tourism Jungle Lodges and boutique heritage resorts",
      emergencySupport: "District tourist police units stationed across all UNESCO sectors"
    }
  ]
};

export interface IndiaState {
  id: string;
  name: string;
  capital: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'North-East' | 'Union Territory';
  lat: number;
  lng: number;
  shortCode: string;
  unescoSitesCount: number;
  famousFor: string;
}

export const INDIA_STATES: IndiaState[] = [
  // Northern Region
  {
    id: 'RJ',
    name: 'Rajasthan',
    capital: 'Jaipur',
    region: 'North',
    lat: 26.9124,
    lng: 75.7873,
    shortCode: 'RJ',
    unescoSitesCount: 4, // Hill Forts, Jantar Mantar, Keoladeo, Jaipur City
    famousFor: 'Majestic Hill Forts, Thar Desert, Royal Palaces & Havelis',
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    capital: 'Lucknow',
    region: 'North',
    lat: 26.8467,
    lng: 80.9462,
    shortCode: 'UP',
    unescoSitesCount: 3, // Taj Mahal, Agra Fort, Fatehpur Sikri
    famousFor: 'Mughal Architecture, Holy Ghats of Varanasi, Sangam',
  },
  {
    id: 'DL',
    name: 'Delhi',
    capital: 'New Delhi',
    region: 'Union Territory',
    lat: 28.6139,
    lng: 77.2090,
    shortCode: 'DL',
    unescoSitesCount: 3, // Qutb Minar, Humayun Tomb, Red Fort
    famousFor: 'Historical Dynastic Citadels, Monuments & Capital Heritage',
  },
  {
    id: 'PB',
    name: 'Punjab',
    capital: 'Chandigarh',
    region: 'North',
    lat: 31.1471,
    lng: 75.3412,
    shortCode: 'PB',
    unescoSitesCount: 0,
    famousFor: 'Golden Temple Amritsar, Baisakhi & Land of Five Rivers',
  },
  {
    id: 'HR',
    name: 'Haryana',
    capital: 'Chandigarh',
    region: 'North',
    lat: 29.0588,
    lng: 76.0856,
    shortCode: 'HR',
    unescoSitesCount: 0,
    famousFor: 'Kurukshetra, Vedic Heritage & Surajkund Crafts',
  },
  {
    id: 'HP',
    name: 'Himachal Pradesh',
    capital: 'Shimla',
    region: 'North',
    lat: 31.1048,
    lng: 77.1734,
    shortCode: 'HP',
    unescoSitesCount: 2, // Great Himalayan National Park, Kalka-Shimla Toy Train
    famousFor: 'Great Himalayan Glaciers, Pine Valleys & Tibetan Monasteries',
  },
  {
    id: 'UK',
    name: 'Uttarakhand',
    capital: 'Dehradun',
    region: 'North',
    lat: 30.0668,
    lng: 79.0193,
    shortCode: 'UK',
    unescoSitesCount: 1, // Nanda Devi and Valley of Flowers
    famousFor: 'Char Dham, Alpine Valley of Flowers & Ganges Headwaters',
  },
  {
    id: 'JK',
    name: 'Jammu & Kashmir',
    capital: 'Srinagar / Jammu',
    region: 'Union Territory',
    lat: 33.7782,
    lng: 76.5762,
    shortCode: 'JK',
    unescoSitesCount: 0,
    famousFor: 'Dal Lake Houseboats, Mughal Terraced Gardens, Pashmina Art',
  },
  {
    id: 'LA',
    name: 'Ladakh',
    capital: 'Leh',
    region: 'Union Territory',
    lat: 34.1526,
    lng: 77.5771,
    shortCode: 'LA',
    unescoSitesCount: 0,
    famousFor: 'High Altitude Cold Desert, Ancient Gompas & Pangong Lake',
  },
  {
    id: 'CH',
    name: 'Chandigarh',
    capital: 'Chandigarh',
    region: 'Union Territory',
    lat: 30.7333,
    lng: 76.7794,
    shortCode: 'CH',
    unescoSitesCount: 1, // Le Corbusier Capitol Complex
    famousFor: 'Modernist Architectural Works of Le Corbusier',
  },

  // Western Region
  {
    id: 'MH',
    name: 'Maharashtra',
    capital: 'Mumbai',
    region: 'West',
    lat: 19.7515,
    lng: 75.7139,
    shortCode: 'MH',
    unescoSitesCount: 5, // Ajanta, Ellora, Elephanta, Chhatrapati Shivaji Terminus, Victorian Gothic
    famousFor: 'Rock-Cut Basalt Caves, Maratha Forts & Western Ghats',
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    capital: 'Gandhinagar',
    region: 'West',
    lat: 22.2587,
    lng: 71.1924,
    shortCode: 'GJ',
    unescoSitesCount: 4, // Champaner, Rani ki Vav, Historic City of Ahmedabad, Dholavira
    famousFor: 'Harappan Archaeology, Stepwells, Rann of Kutch & Asiatic Lions',
  },
  {
    id: 'GA',
    name: 'Goa',
    capital: 'Panaji',
    region: 'West',
    lat: 15.2993,
    lng: 74.1240,
    shortCode: 'GA',
    unescoSitesCount: 1, // Churches and Convents of Goa
    famousFor: 'Manueline Portuguese Cathedrals, Spice Coast & Tropical Estuaries',
  },

  // Southern Region
  {
    id: 'KA',
    name: 'Karnataka',
    capital: 'Bengaluru',
    region: 'South',
    lat: 15.3173,
    lng: 75.7139,
    shortCode: 'KA',
    unescoSitesCount: 4, // Hampi, Pattadakal, Hoysala Ensembles, Western Ghats
    famousFor: 'Vijayanagara Ruins at Hampi, Hoysala Carvings, Mysore Palaces',
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    capital: 'Chennai',
    region: 'South',
    lat: 11.1271,
    lng: 78.6569,
    shortCode: 'TN',
    unescoSitesCount: 5, // Mahabalipuram, Great Living Chola Temples, Nilgiri Mountain Railway, Western Ghats
    famousFor: 'Dravidian Shore Temples, Chola Bronze Heritage & Classical Bharatanatyam',
  },
  {
    id: 'KL',
    name: 'Kerala',
    capital: 'Thiruvananthapuram',
    region: 'South',
    lat: 10.8505,
    lng: 76.2711,
    shortCode: 'KL',
    unescoSitesCount: 1, // Western Ghats
    famousFor: 'Tranquil Backwaters, Ayurvedic Traditions, Kathakali & Cardamom Hills',
  },
  {
    id: 'TG',
    name: 'Telangana',
    capital: 'Hyderabad',
    region: 'South',
    lat: 18.1124,
    lng: 79.0193,
    shortCode: 'TG',
    unescoSitesCount: 1, // Kakatiya Rudreshwara (Ramappa) Temple
    famousFor: 'Floating-Brick Ramappa Architecture, Golconda & Charminar',
  },
  {
    id: 'AP',
    name: 'Andhra Pradesh',
    capital: 'Amaravati',
    region: 'South',
    lat: 15.9129,
    lng: 79.7400,
    shortCode: 'AP',
    unescoSitesCount: 0,
    famousFor: 'Lepakshi Hanging Pillar, Tirumala Shrine & Kuchipudi Dance',
  },

  // Central Region
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    capital: 'Bhopal',
    region: 'Central',
    lat: 23.2599,
    lng: 77.4126,
    shortCode: 'MP',
    unescoSitesCount: 3, // Khajuraho, Sanchi Stupa, Bhimbetka Rock Shelters
    famousFor: 'Erotic Chandela Stone Sculpture, Ashokan Great Stupa & Paleolithic Rock Art',
  },
  {
    id: 'CG',
    name: 'Chhattisgarh',
    capital: 'Raipur',
    region: 'Central',
    lat: 21.2787,
    lng: 81.8661,
    shortCode: 'CG',
    unescoSitesCount: 0,
    famousFor: 'Bastar Tribal Art, Chitrakote Niagara Waterfall & Ancient Caves',
  },

  // Eastern Region
  {
    id: 'WB',
    name: 'West Bengal',
    capital: 'Kolkata',
    region: 'East',
    lat: 22.9868,
    lng: 87.8550,
    shortCode: 'WB',
    unescoSitesCount: 3, // Sundarbans, Darjeeling Himalayan Railway, Santiniketan
    famousFor: 'Tagore Santiniketan, Sundarban Mangrove Tigers & Terracotta Temples',
  },
  {
    id: 'OR',
    name: 'Odisha',
    capital: 'Bhubaneswar',
    region: 'East',
    lat: 20.9517,
    lng: 85.0985,
    shortCode: 'OR',
    unescoSitesCount: 1, // Sun Temple Konark
    famousFor: 'Colossal Sun Chariot at Konark, Puri Jagannath & Odissi Dance',
  },
  {
    id: 'BR',
    name: 'Bihar',
    capital: 'Patna',
    region: 'East',
    lat: 25.0961,
    lng: 85.3131,
    shortCode: 'BR',
    unescoSitesCount: 2, // Mahabodhi Temple Complex at Bodh Gaya, Archaeological Site of Nalanda Mahavihara
    famousFor: 'Sacred Enlightenment Bodhi Tree, Ancient Nalanda University & Madhubani Art',
  },
  {
    id: 'JH',
    name: 'Jharkhand',
    capital: 'Ranchi',
    region: 'East',
    lat: 23.6102,
    lng: 85.2799,
    shortCode: 'JH',
    unescoSitesCount: 0,
    famousFor: 'Parasnath Jain Pilgrimage, Chhau Dance & Mineral Plateaus',
  },

  // North-Eastern Region
  {
    id: 'AS',
    name: 'Assam',
    capital: 'Dispur',
    region: 'North-East',
    lat: 26.2006,
    lng: 92.9376,
    shortCode: 'AS',
    unescoSitesCount: 3, // Kaziranga, Manas, Moidams of Ahom Dynasty
    famousFor: 'One-horned Rhinos, Ahom Royal Burial Moidams & Brahmaputra River Island Majuli',
  },
  {
    id: 'SK',
    name: 'Sikkim',
    capital: 'Gangtok',
    region: 'North-East',
    lat: 27.5330,
    lng: 88.5122,
    shortCode: 'SK',
    unescoSitesCount: 1, // Khangchendzonga National Park (Mixed)
    famousFor: 'Sacred Khangchendzonga Peak, Alpine Lakes & Buddhist Monasteries',
  },
  {
    id: 'ML',
    name: 'Meghalaya',
    capital: 'Shillong',
    region: 'North-East',
    lat: 25.4670,
    lng: 91.3662,
    shortCode: 'ML',
    unescoSitesCount: 0,
    famousFor: 'Living Root Bridges of Cherrapunji, Waterfalls & Abode of Clouds',
  },
  {
    id: 'AR',
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    region: 'North-East',
    lat: 28.2180,
    lng: 94.7278,
    shortCode: 'AR',
    unescoSitesCount: 0,
    famousFor: 'Tawang Monastery, Himalayan Passes & Dawn-Lit Mountains',
  },
  {
    id: 'MN',
    name: 'Manipur',
    capital: 'Imphal',
    region: 'North-East',
    lat: 24.6637,
    lng: 93.9063,
    shortCode: 'MN',
    unescoSitesCount: 0,
    famousFor: 'Loktak Floating Phumdis Lake, Keibul Lamjao & Classical Manipuri Dance',
  },
  {
    id: 'NL',
    name: 'Nagaland',
    capital: 'Kohima',
    region: 'North-East',
    lat: 26.1584,
    lng: 94.5624,
    shortCode: 'NL',
    unescoSitesCount: 0,
    famousFor: 'Hornbill Cultural Festival, Naga Heritage Villages & Dzukou Valley',
  },
  {
    id: 'MZ',
    name: 'Mizoram',
    capital: 'Aizawl',
    region: 'North-East',
    lat: 23.1645,
    lng: 92.9376,
    shortCode: 'MZ',
    unescoSitesCount: 0,
    famousFor: 'Cheraw Bamboo Dance, Blue Mountain & Lush Hills',
  },
  {
    id: 'TR',
    name: 'Tripura',
    capital: 'Agartala',
    region: 'North-East',
    lat: 23.9408,
    lng: 91.9882,
    shortCode: 'TR',
    unescoSitesCount: 0,
    famousFor: 'Ujjayanta Palace, Neermahal Water Palace & Unakoti Rock Carvings',
  },
];

// Helper to get state details by name
export function findStateByName(stateName: string): IndiaState | undefined {
  const norm = stateName.trim().toLowerCase();
  return INDIA_STATES.find(s => 
    s.name.toLowerCase() === norm || 
    norm.includes(s.name.toLowerCase()) || 
    s.name.toLowerCase().includes(norm)
  );
}

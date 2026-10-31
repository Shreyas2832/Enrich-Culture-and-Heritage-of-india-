export interface FestivalItem {
  id: string;
  name: string;
  regionalName: string;
  season: string;
  approxMonth: string;
  region: string;
  heritageSpot: string;
  description: string;
  culturalSignificance: string;
  traditions: string[];
}

export const INDIAN_FESTIVALS: FestivalItem[] = [
  {
    id: "diwali",
    name: "Diwali (Deepavali)",
    regionalName: "Festival of Lights",
    season: "Autumn",
    approxMonth: "October - November",
    region: "Pan-India (Varanasi, Ayodhya, Jaipur)",
    heritageSpot: "Ganga Ghats, Varanasi & Pink City Bazaars, Jaipur",
    description: "Celebration of the victory of light over darkness and knowledge over ignorance. Cities are illuminated with earthen clay diyas, intricate floral rangoli, and fireworks.",
    culturalSignificance: "Marks Lord Rama's return to Ayodhya and honors Goddess Lakshmi for prosperity.",
    traditions: ["Lighting mustard oil earthen lamps", "Clay Lakshmi-Ganesha puja", "Exchanging traditional sweets like Kaju Katli", "Floral rangoli designs at thresholds"]
  },
  {
    id: "holi",
    name: "Holi & Lathmar Holi",
    regionalName: "Festival of Colors & Spring Rebirth",
    season: "Spring",
    approxMonth: "March",
    region: "Northern & Central India (Barsana, Mathura, Vrindavan, Jaipur)",
    heritageSpot: "Radha Rani Temple, Barsana & City Palace, Udaipur",
    description: "Joyous celebration welcoming spring with herbal gulal powders, folk music on the dholak, and communal bonfires on Holika Dahan.",
    culturalSignificance: "Celebrates the eternal divine love of Radha and Krishna and the triumph of devotee Prahlad.",
    traditions: ["Holika Dahan sacred bonfires", "Applying natural turmeric and flower-based gulal", "Savoring Gujiya pastries and Thandai", "Folk Braj Rasleela performances"]
  },
  {
    id: "durga-puja",
    name: "Durga Puja",
    regionalName: "Durgotsava (UNESCO Intangible Heritage)",
    season: "Autumn",
    approxMonth: "September - October",
    region: "Eastern India (Kolkata, Shantiniketan, Cuttack)",
    heritageSpot: "Bagbazar & Kumartuli Potter Colony, Kolkata",
    description: "A ten-day celebration inscribed on UNESCO's Intangible Cultural Heritage list, transforming entire cities into sprawling open-air art galleries of thematic pandals.",
    culturalSignificance: "Celebrates the goddess Durga vanquishing the demon Mahishasura, symbolizing divine cosmic feminine energy (Shakti).",
    traditions: ["Kumartuli clay idol crafting", "Dhaak drum beats and Dhunuchi dance", "Sindoor Khela on Vijayadashami", "Pandal hopping with family"]
  },
  {
    id: "pushkar-fair",
    name: "Pushkar Camel Fair",
    regionalName: "Kartik Mela",
    season: "Late Autumn",
    approxMonth: "November",
    region: "Western India (Pushkar, Rajasthan)",
    heritageSpot: "Sacred Pushkar Lake & Sand Dunes",
    description: "One of the world's largest livestock and camel fairs held on the banks of holy Pushkar Lake, accompanied by folk dancing, puppet shows, and turban-tying contests.",
    culturalSignificance: "Coincides with the auspicious Kartik Purnima full moon holy dip in Pushkar lake.",
    traditions: ["Ornate camel decoration contests", "Kalbelia and Ghoomar folk performances", "Spiritual Maha Aarti at Brahma Ghat", "Traditional desert crafts bazaar"]
  },
  {
    id: "onam",
    name: "Onam Harvest Festival",
    regionalName: "Thiruvonam",
    season: "Monsoon Harvest",
    approxMonth: "August - September",
    region: "Southern India (Kerala)",
    heritageSpot: "Thrikkakara Temple, Kochi & Aranmula Boat Race",
    description: "Kerala's premier cultural harvest festival celebrated over 10 days with floral carpets (Pookkalam), snake boat races (Vallam Kali), and sumptuous vegetarian feasts.",
    culturalSignificance: "Welcomes the spirit of the benevolent mythical King Mahabali who ruled an egalitarian golden age.",
    traditions: ["Intricate fresh floral carpet (Pookkalam)", "Grand Onasadya feast with 26 vegetarian dishes", "Aranmula snake boat races on Pamba river", "Pulikali tiger folk street dance"]
  },
  {
    id: "pongal",
    name: "Pongal & Makar Sankranti",
    regionalName: "Tamil Sun Harvest Celebration",
    season: "Winter Solstice",
    approxMonth: "January",
    region: "Southern & Central India (Tamil Nadu, Karnataka, Andhra)",
    heritageSpot: "Brihadisvara Temple, Thanjavur & Madurai Meenakshi",
    description: "Four-day harvest festival offering grateful devotion to the Sun God (Surya), farm cattle, and nature for sustaining agrarian life.",
    culturalSignificance: "Marks the sun's auspicious northward transit into Capricorn (Uttarayana).",
    traditions: ["Boiling freshly harvested rice and jaggery in earthen pots until it overflows", "Kolam chalk artwork with rice flour", "Mattu Pongal honoring bulls and cows", "Sugarcane offerings"]
  },
  {
    id: "hornbill",
    name: "Hornbill Festival",
    regionalName: "Festival of Festivals",
    season: "Winter",
    approxMonth: "December",
    region: "Northeastern India (Kohima, Nagaland)",
    heritageSpot: "Kisama Heritage Village, Kohima",
    description: "A breathtaking cultural extravaganza gathering 17 Naga indigenous tribes to celebrate their warrior traditions, woodcraft, music, and colorful ceremonial attire.",
    culturalSignificance: "Named after the revered Indian Hornbill bird, celebrating ecological bonding and tribal unity.",
    traditions: ["Log drum beats and warrior horn chants", "Traditional bamboo archer competitions", "Authentic morung architectural displays", "Indigenous handloom fashion and cuisine"]
  },
  {
    id: "bihu",
    name: "Rongali Bihu",
    regionalName: "Bohag Bihu (Assamese New Year)",
    season: "Spring",
    approxMonth: "April",
    region: "Eastern / Northeastern India (Assam)",
    heritageSpot: "Kaziranga Heritage Corridors & Sivasagar Ahom Palaces",
    description: "Spring festival of joy, romance, and fertility marked by energetic Bihu dancing, handloom gamusa gifts, and melodies of the pepa horn.",
    culturalSignificance: "Signals the onset of the agricultural sowing season and the Assamese calendar new year.",
    traditions: ["Dressing in golden Muga silk mekhela sador", "Energetic Bihu dance with pepa and dhol", "Gifting hand-woven red-bordered Gamusa", "Pitha rice cakes and sweet laroos"]
  },
  {
    id: "khajuraho-dance",
    name: "Khajuraho Dance Festival",
    regionalName: "Nritya Mahotsav",
    season: "Winter",
    approxMonth: "February",
    region: "Central India (Khajuraho, Madhya Pradesh)",
    heritageSpot: "Western Group of Temples, Chitragupta Temple Complex",
    description: "A week-long celebration where India's foremost classical dancers perform against the floodlit backdrop of 1,000-year-old carved stone temples.",
    culturalSignificance: "Brings ancient stone sculptural postures back to life through Bharatanatyam, Kathak, Odissi, and Kuchipudi.",
    traditions: ["Open-air evening classical recitals", "Art and craft fair of Dhokra metal and pottery", "Heritage architectural night walks", "Workshops with master gurus"]
  },
  {
    id: "hemis-festival",
    name: "Hemis Tsechu Festival",
    regionalName: "Sacred Mask Dance of Ladakh",
    season: "Summer",
    approxMonth: "June - July",
    region: "Northern Himalayan Region (Ladakh)",
    heritageSpot: "Hemis Gompa Monastery, Leh",
    description: "Two-day Buddhist celebration featuring sacred Cham masked dances performed by lamas in vibrant silk robes to the sound of cymbals and long horns.",
    culturalSignificance: "Commemorates the birth anniversary of Guru Padmasambhava, founder of Tibetan Buddhism.",
    traditions: ["Cham dances depicting triumph of good over demons", "Unfurling of the colossal centuries-old silk thangka", "Chanting of esoteric Buddhist mantras", "Ladakhi woolcraft and butter tea market"]
  }
];

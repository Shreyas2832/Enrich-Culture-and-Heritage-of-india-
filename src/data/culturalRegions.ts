export interface CulturalRegion {
  id: string;
  name: string;
  title: string;
  tagline: string;
  overview: string;
  audioNarration: string;
  states: string[];
  danceForms: string[];
  festivals: string[];
  architecture: string;
  textiles: string[];
  cuisines: string[];
  heritageFocus: string;
}

export const CULTURAL_REGIONS: CulturalRegion[] = [
  {
    id: "northern",
    name: "Northern Region",
    title: "The Cradle of Vedic Philosophy & Imperial Grandeur",
    tagline: "Himalayan spiritual sanctuaries, Sufi qawwali traditions, and royal Mughal architecture.",
    overview: "The Northern region of India is defined by the mighty Himalayan snow peaks, the sacred river basins of the Ganga and Yamuna, and centuries of imperial synthesis. From the classical Kathak dance of Lucknow and Jaipur to the devotional mystic poetry of Kabir, Mirabai, and Amir Khusrau, Northern culture represents an unbroken lineage of philosophy and art. It is the land of timeless pilgrimages, vibrant harvest festivals, and masterly red sandstone and marble monuments.",
    audioNarration: "Welcome to the Northern Region of India, the cradle of Vedic philosophy and imperial magnificence. Here, sacred traditions blend seamlessly with courtly elegance. Experience the rhythmic footwork of Kathak dance, the soul-stirring melodies of Hindustani classical music, and the architectural wonders of the Mughal and Rajput dynasties. From the holy ghats of Varanasi to the golden fields of Punjab during Baisakhi, North India offers a rich tapestry of faith, folklore, and timeless craft.",
    states: ["Jammu & Kashmir", "Himachal Pradesh", "Punjab", "Haryana", "Uttarakhand", "Uttar Pradesh", "Delhi", "Ladakh"],
    danceForms: ["Kathak", "Bhangra & Giddha", "Nati", "Rouf", "Chholiya"],
    festivals: ["Kumbh Mela", "Diwali", "Holi of Braj", "Baisakhi", "Ganga Dussehra", "Hemis Festival"],
    architecture: "Nagara temple spires (e.g. Kedarnath, Kashi Vishwanath), Indo-Islamic dome and arch monuments, wooden Himalayan pagoda architecture.",
    textiles: ["Pashmina & Kani shawls of Kashmir", "Banarasi silk brocades", "Chikan embroidery of Lucknow", "Phulkari of Punjab"],
    cuisines: ["Awadhi Dum Pukht", "Mughlai kormas & kebabs", "Punjabi Makki di Roti & Sarson da Saag", "Kashmiri Wazwan"],
    heritageFocus: "Spiritual river ghats, Himalayan monasteries, and UNESCO imperial forts."
  },
  {
    id: "eastern",
    name: "Eastern Region",
    title: "The Realm of Sacred Monsoons, Tantra & Classical Arts",
    tagline: "Spiritual cradles of Buddhism, terracotta temple artistry, and tribal folklore.",
    overview: "Eastern India embraces the fertile plains of the lower Ganga, the lush Brahmaputra valley, and the mystical Bay of Bengal coastline. It is the historical birthplace of Buddhism and Jainism at Bodh Gaya and Rajgir, the home of ancient Nalanda University, and the soul of Rabindranath Tagore's literary Renaissance. Eastern traditions celebrate the divine feminine through Durga Puja and Chhath Puja, echoed in the sacred rhythms of Odissi and Sattriya dance.",
    audioNarration: "Explore the Eastern Region of India, a land steeped in profound spirituality, literary brilliance, and tribal heritage. From the terracotta temples of Bishnupur to the sun-kissed chariot of Konark, Eastern culture reverberates with artistic devotion. Immerse yourself in the sacred classical movements of Odissi and Sattriya, celebrate the grandeur of Kolkata's Durga Puja, and witness the ancient Ahom royal moidams in the tea-scented hills of Assam.",
    states: ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Sikkim", "Tripura", "Meghalaya"],
    danceForms: ["Odissi", "Sattriya", "Chhau martial dance", "Bihu", "Gaudiya Nritya", "Jhumar"],
    festivals: ["Durga Puja", "Chhath Puja", "Rath Yatra of Puri", "Rongali Bihu", "Hornbill Festival"],
    architecture: "Kalinga coastal stone temples (Konark, Puri, Lingaraj), Bengal Terracotta temples of Bishnupur, ancient Buddhist Mahaviharas of Nalanda.",
    textiles: ["Baluchari & Jamdani sarees", "Sambalpuri Ikat", "Muga golden silk of Assam", "Tussar silk of Jharkhand"],
    cuisines: ["Bengali Shorshe Ilish & Sandesh", "Odia Dalma & Chhena Poda", "Bihari Litti Chokha", "Assamese Khar & Masor Tenga"],
    heritageFocus: "Ancient Buddhist monastic sites, UNESCO living heritage festivals, and sacred forest reserves."
  },
  {
    id: "western",
    name: "Western Region",
    title: "Desert Chivalry, Maritime Ports & Intricate Stepwells",
    tagline: "Fortified desert citadels, coastal Konkan traditions, and vibrant folk celebrations.",
    overview: "Western India is a dramatic convergence of golden Thar Desert sands, the rugged basalt cliffs of the Sahyadri mountains, and ancient Arabian Sea maritime trading routes. Here, Rajput valor, Maratha naval fortitude, and Gujarati mercantile ingenuity thrive side by side. It is internationally renowned for rock-cut cave art at Ajanta and Ellora, subterranean marvels like Rani-ki-Vav, and the nine nights of energetic Garba dancing.",
    audioNarration: "Discover the Western Region of India, where desert legends, rock-cut marvels, and dynamic coastal trade unite. From the golden battlements of Jaisalmer to the vibrant rhythmic circles of Navratri Garba, the west vibrates with chivalry and celebration. Behold the 1,500-year-old Buddhist paintings in Ajanta Caves, the subterranean sculpted tiers of Rani-ki-Vav stepwell, and the historic maritime port architecture of Mumbai.",
    states: ["Rajasthan", "Gujarat", "Maharashtra", "Goa"],
    danceForms: ["Ghoomar & Kalbelia", "Garba & Dandiya Raas", "Lavani", "Fugdi & Dhalo", "Bhavai"],
    festivals: ["Navratri & Garba", "Ganesh Chaturthi", "Pushkar Camel Fair", "Goa Carnival", "Desert Festival Jaisalmer"],
    architecture: "Maru-Gurjara stepwell and temple styles, Maratha hill and sea forts, Indo-Saracenic and Victorian Art Deco ensembles of Mumbai.",
    textiles: ["Bandhani tie-dye of Gujarat & Rajasthan", "Patola double-ikat of Patan", "Paithani silk of Maharashtra", "Kota Doria"],
    cuisines: ["Rajasthani Dal Baati Churma & Ker Sangri", "Gujarati Thali with Dhokla & Thepla", "Maharashtrian Puran Poli & Misal", "Goan Fish Curry"],
    heritageFocus: "UNESCO desert forts, monolithic rock-cut cave complexes, and subterranean water architecture."
  },
  {
    id: "southern",
    name: "Southern Region",
    title: "Granite Vimanas, Carnatic Ragas & Coastal Traditions",
    tagline: "Towering Dravidian gopurams, ancient Sangam literature, and Ayurvedic wellness heritage.",
    overview: "Surrounded by three oceans and cradled by the Western and Eastern Ghats, Southern India preserves millennia of continuous Dravidian culture. The region boasts monumental stone temples engineered by the Chola, Pallava, Chera, Pandya, and Vijayanagara dynasties. Its classical traditions are anchored in Bharatanatyam and Kathakali, accompanied by the mathematical beauty of Carnatic music, ancient bronze sculpting, and holistic Ayurvedic science.",
    audioNarration: "Step into the Southern Region of India, an extraordinary sanctuary of ancient Dravidian heritage and living temple rituals. Gaze upon the sky-piercing gopurams of Madurai and Thanjavur, listen to the sublime cadences of Carnatic ragas, and witness the dramatic eye movements and mudras of Kathakali and Bharatanatyam. Here, fragrant spice plantations and ancient maritime ports have welcomed the world for over two thousand years.",
    states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
    danceForms: ["Bharatanatyam", "Kathakali & Mohiniyattam", "Kuchipudi", "Yakshagana", "Theyyam"],
    festivals: ["Onam", "Pongal / Makar Sankranti", "Mysore Dasara", "Bonalu", "Thrissur Pooram"],
    architecture: "Dravidian granite temples with stepped vimanas and towering gopurams, Hoysala stellate soapstone temples, Kerala sloping timber roof shrines.",
    textiles: ["Kanchipuram pure mulberry silk", "Mysore silk", "Pochampally Ikat", "Kasavu gold-bordered handlooms of Kerala"],
    cuisines: ["Chettinad spiced delicacies", "Kerala Sadya feast served on banana leaf", "Hyderabadi Dum Biryani", "Udupi vegetarian tiffin"],
    heritageFocus: "Living Chola stone temples, UNESCO ruins of the Vijayanagara Empire at Hampi, and Hoysala ensembles."
  },
  {
    id: "central",
    name: "Central Region",
    title: "The Heart of Tribal Art, Stone Stupas & Forest Lore",
    tagline: "Prehistoric Bhimbetka rock art, Emperor Ashoka's Great Stupa, and wildlife sanctuaries.",
    overview: "Located at the geometric heart of the Indian subcontinent, the Central region is an ancient crossroads where geological antiquity meets spiritual philosophy. From the 30,000-year-old rock shelters of Bhimbetka to the tranquil 3rd-century BCE Great Stupa of Sanchi and the sensuous Chandela temples of Khajuraho, Central India tells the deepest story of human evolution, artistic expression, and forest harmony.",
    audioNarration: "Welcome to Central India, the tranquil heartland of the subcontinent where India's oldest stone monuments and prehistoric art reside. Walk among the ancient Buddhist gateways of Sanchi Stupa, marvel at the celestial carvings of Khajuraho, and trace thirty millennia of human memory in the Bhimbetka rock shelters. In the dense Sal and Teak forests, tribal communities preserve Gond and Bastar craft traditions that honor nature and the cosmic cycle.",
    states: ["Madhya Pradesh", "Chhattisgarh"],
    danceForms: ["Karma & Saila tribal dances", "Matki dance of Malwa", "Gaur Maria", "Pandavani ballad theatre"],
    festivals: ["Khajuraho Dance Festival", "Lokrang Bhopal", "Bastar Dussehra", "Bhagoria Haat", "Mandu Festival"],
    architecture: "Ancient Buddhist stone stupas with carved torana gates, Nagara sandstone temples with soaring curvilinear shikhara towers.",
    textiles: ["Chanderi sheer silk-cotton sarees", "Maheshwari handloom silks", "Bastar bell metal (Dhokra)", "Gond tribal hand-paintings"],
    cuisines: ["Indori Poha-Jalebi", "Bhopali Gosht Korma", "Chhattisgarhi Chila & Fara", "Dal Bafla with ghee"],
    heritageFocus: "Ashokan Buddhist relics, Paleolithic rock shelters, and medieval temple carvings."
  }
];

export const CULTURE_OF_INDIA_SUMMARY = {
  title: "The Cultural Essence of India",
  shortNote: "A profound mosaic of 22 official languages, classical dance forms, spiritual philosophies, and living festivals celebrating unity in diversity.",
  fullDescription: "Indian culture is a five-thousand-year-old living civilizational stream that has continually assimilated, synthesized, and flourished. Grounded in the philosophical ethos of 'Vasudhaiva Kutumbakam' (The World is One Family), it bridges profound metaphysical inquiry with radiant sensory celebrations. From Vedic hymns and classical Carnatic and Hindustani music to timeless crafts like Banarasi brocade and Pashmina weaving, Indian traditions honor the sacred connection between humanity, nature, and the cosmos.",
  audioNarration: "Indian culture is an extraordinary living civilizational stream spanning five millennia of human creativity and spiritual wisdom. Grounded in the timeless principle of Vasudhaiva Kutumbakam, meaning the world is one family, our traditions celebrate unity within vibrant diversity. From classical dance forms like Bharatanatyam and Kathak to majestic harvest festivals, sacred riverside rituals, and ancient handloom crafts, Indian culture is a living philosophy of compassion, creativity, and continuity."
};

export const HERITAGE_OF_INDIA_SUMMARY = {
  title: "The Monumental Heritage of India",
  shortNote: "Home to 45 UNESCO World Heritage sites spanning rock-cut cave sanctuaries, imperial forts, stepwells, and ancient biodiversity reserves.",
  fullDescription: "The architectural and archaeological heritage of India stands as testimony to human engineering ingenuity, artistic devotion, and royal patronage. Spanning Bronze Age urban centers like Harappan Dholavira, rock-cut monoliths at Ellora, the cosmic sundials of Jantar Mantar, and the celestial white marble harmony of the Taj Mahal, India's built heritage connects the tangible stone to the intangible spirit of human aspiration.",
  audioNarration: "India's heritage is an open-air museum of world history, recognized globally with 45 prestigious UNESCO World Heritage sites. From the 30,000-year-old painted rock shelters of Bhimbetka to the colossal chariot of the Konark Sun Temple and the pristine high-altitude meadows of Khangchendzonga, each monument and sanctuary reflects unmatched engineering daring, aesthetic refinement, and harmonious coexistence with nature."
};

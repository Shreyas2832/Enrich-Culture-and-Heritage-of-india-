export interface HeritageSite {
  id: number;
  name: string;
  type: 'Cultural' | 'Natural' | 'Mixed';
  year: number;
  state: string;
  location: string;
  country: string; // 'India'
  image: string;
  imageCaption?: string;
  gallery?: {
    url: string;
    caption: string;
  }[];
  shortNote: string;
  description: string; // "About the Site"
  about?: string;
  address: string;
  latitude: number;
  longitude: number;
  significance: string; // "Historical & Cultural Significance"
  facts: string[]; // "Interesting Facts"
}

export const UNESCO_HERITAGE_SITES: HeritageSite[] = [
  {
    id: 1,
    name: "Ajanta Caves",
    type: "Cultural",
    year: 1983,
    state: "Maharashtra",
    location: "Aurangabad District, Maharashtra",
    country: "India",
    image: "https://plus.unsplash.com/premium_photo-1697730364913-61ebe23e2dd7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageCaption: "Panoramic horseshoe cliff and carved chaitya facades of Ajanta Caves",
    gallery: [
          {
                url: "https://plus.unsplash.com/premium_photo-1697730364913-61ebe23e2dd7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                caption: "Panoramic crescent view of the 30 rock-cut basalt Buddhist sanctuaries"
          },
          {
                url: "https://plus.unsplash.com/premium_photo-1697730364913-61ebe23e2dd7?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                caption: "Cave 26 Chaitya hall featuring classical Buddhist stone reliefs"
          }
    ],
    shortNote: "30 rock-cut Buddhist cave monuments famous for classical Indian frescoes and sculpture.",
    description: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra. Carved into a sheer horse-shoe shaped basalt cliff along the Waghur River gorge, the caves include prayer halls (chaityas) and monastic sanctuaries (viharas) celebrated for their expressive frescoes, gesture poses, and delicate mineral pigments.",
    address: "Ajanta Caves Road, Lenapur, Maharashtra 431117, India",
    latitude: 20.5519,
    longitude: 75.7033,
    significance: "Masterpiece of Buddhist religious art and ancient Indian mural painting techniques, portraying Jataka folklore with unmatched emotional sensitivity.",
    facts: [
      "The caves lay forgotten under dense jungle overgrowth for over a millennium until British officer John Smith rediscovered them on a tiger-hunting expedition in 1819.",
      "The natural mural paints were formulated from organic plant matter, cow dung, clay, and rare imported stones like Afghan lapis lazuli.",
      "They are excavated entirely by hand using only simple iron chisels and hammers into volcanic flood basalt."
    ]
  },
  {
    id: 2,
    name: "Ellora Caves",
    type: "Cultural",
    year: 1983,
    state: "Maharashtra",
    location: "Aurangabad District, Maharashtra",
    country: "India",
    image: "https://plus.unsplash.com/premium_photo-1697729588019-20a1f5a325d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageCaption: "Cave 16 Kailasa Temple, monolithic rock-cut multi-level marvel of Ellora",
    gallery: [
          {
                url: "https://plus.unsplash.com/premium_photo-1697729588019-20a1f5a325d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                caption: "Monolithic Kailasa Temple carved top-down from living basalt cliff"
          },
          {
                url: "https://plus.unsplash.com/premium_photo-1697729588019-20a1f5a325d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                caption: "Ornate rock-cut pillars and friezes depicting sacred Hindu epics"
          }
    ],
    shortNote: "Monumental rock-cut temples representing Buddhism, Hinduism, and Jainism harmony.",
    description: "Ellora is one of the largest rock-cut temple complexes in the world, featuring 34 excavated monasteries and temples dating from 600 to 1000 CE. Located along the Charanandri hills, the site exhibits side-by-side sanctuaries created by Buddhist, Hindu, and Jain artisans, serving as a testament to the religious tolerance and cultural synthesis of ancient India.",
    address: "Ellora Cave Road, Ellora, Maharashtra 431102, India",
    latitude: 20.0268,
    longitude: 75.1780,
    significance: "Cave 16 features the Kailasa temple, a chariot-shaped monument dedicated to Shiva and carved from a single cliff face—the largest monolithic rock excavation on Earth.",
    facts: [
      "Kailasa Temple was sculpted from the top of the mountain downwards, requiring the removal of over 200,000 tons of rock with zero margin for structural error.",
      "It represents Mount Kailash, the mythical Himalayan abode of Lord Shiva, and stands twice the height of the Parthenon in Athens.",
      "It preserves three distinct faith traditions (12 Buddhist, 17 Hindu, and 5 Jain caves) built harmoniously along a single two-kilometer scarp."
    ]
  },
  {
    id: 3,
    name: "Agra Fort",
    type: "Cultural",
    year: 1983,
    state: "Uttar Pradesh",
    location: "Agra, Uttar Pradesh",
    country: "India",
    image: "https://www.alightindia.com/cdn/uploads/postimages/ORIGINAL/agra-fort%20%20%20Tripad--fc3056.jpg",
    imageCaption: "Red sandstone ramparts and grand bastions of Agra Fort",
    gallery: [
          {
                url: "https://www.alightindia.com/cdn/uploads/postimages/ORIGINAL/agra-fort%20%20%20Tripad--fc3056.jpg",
                caption: "Towering red sandstone ramparts and bastion gates of Agra Fort"
          },
          {
                url: "https://www.alightindia.com/cdn/uploads/postimages/ORIGINAL/agra-fort%20%20%20Tripad--fc3056.jpg",
                caption: "Jahangiri Mahal inner courtyards with carved marble inlays"
          }
    ],
    shortNote: "Vast 16th-century Mughal red sandstone fortress that served as imperial seat.",
    description: "Agra Fort is an imposing 94-acre brick-and-red-sandstone fortress on the banks of the Yamuna River. Serving as the primary imperial residence of the Mughal emperors from Akbar through Jahangir and Shah Jahan until 1638, the fort encloses magnificent royal palaces including Jahangir Mahal, Khas Mahal, the mirror-encrusted Sheesh Mahal, and the white marble Moti Masjid.",
    address: "Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003, India",
    latitude: 27.1795,
    longitude: 78.0211,
    significance: "The preeminent citadel of Mughal imperial authority, defensive engineering, and Indo-Islamic palatial fusion.",
    facts: [
      "Emperor Shah Jahan spent the final eight years of his life imprisoned in the fort's Musamman Burj tower by his son Aurangzeb, gazing across the Yamuna at the Taj Mahal.",
      "Its outer walls rise more than 70 feet high and stretch for over 2.5 kilometers with double moats originally teeming with crocodiles.",
      "Over 4,000 stone builders worked continuously for eight years under Emperor Akbar to complete its colossal sandstone battlements."
    ]
  },
  {
    id: 4,
    name: "Taj Mahal",
    type: "Cultural",
    year: 1983,
    state: "Uttar Pradesh",
    location: "Agra, Uttar Pradesh",
    country: "India",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Iconic white marble mausoleum and reflecting pools of the Taj Mahal",
    gallery: [
          {
                url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
                caption: "Iconic frontal symmetry of the Taj Mahal reflected in the Charbagh pool"
          },
          {
                url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Taj_Mahal%2C_Agra%2C_India_edit2.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit2.jpg",
                caption: "Intricate pietra dura floral marble inlays and calligraphic Qur'anic carvings"
          }
    ],
    shortNote: "Ivory-white marble mausoleum on the Yamuna river, universal jewel of Muslim art in India.",
    description: "The Taj Mahal is an ivory-white marble mausoleum commissioned in 1631 by Mughal Emperor Shah Jahan in memory of his beloved empress Mumtaz Mahal. Standing upon an elevated square plinth on the southern bank of the Yamuna River within formal Charbagh paradise gardens, the monument combines pristine Persian geometry, Indian lotus motifs, and floral pietra dura gemstone inlay.",
    address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India",
    latitude: 27.1751,
    longitude: 78.0421,
    significance: "Universally acknowledged as the crowning jewel of Indo-Islamic architecture and an enduring global symbol of romantic devotion.",
    facts: [
      "The translucent white Makrana marble subtly shifts hue with atmospheric light: glowing rose-pink at dawn, gleaming milky-white at midday, and luminous gold under full moonlight.",
      "The four corner minarets were deliberately constructed with a slight outward tilt of approximately 3 degrees to prevent them from collapsing onto the central dome in an earthquake.",
      "Chief architect Ustad Ahmad Lahori coordinated more than 20,000 artisans, calligraphy masters, and 1,000 royal elephants over a period of 22 years."
    ]
  },
  {
    id: 5,
    name: "Sun Temple, Konark",
    type: "Cultural",
    year: 1984,
    state: "Odisha",
    location: "Puri District, Odisha",
    country: "India",
    image: "https://devdhams.com/wp-content/uploads/2025/12/Konark-Sun-Temple.jpg",
    imageCaption: "13th-century Sun Temple with colossal carved stone chariot wheels at Konark",
    gallery: [
          {
                url: "https://devdhams.com/wp-content/uploads/2025/12/Konark-Sun-Temple.jpg",
                caption: "The legendary 24-spoke stone wheel functioning as an astronomical sundial"
          },
          {
                url: "https://devdhams.com/wp-content/uploads/2025/12/Konark-Sun-Temple.jpg",
                caption: "Jagamohana assembly hall elevated on the grand stone chariot platform"
          }
    ],
    shortNote: "13th-century chariot-shaped stone temple honoring Surya with 24 carved stone wheels.",
    description: "The Konark Sun Temple is a monumental 13th-century sanctuary dedicated to the solar deity Surya, erected by King Narasimhadeva I of the Eastern Ganga Dynasty. Designed in the shape of a colossal celestial chariot with 24 intricately carved stone wheels drawn by seven galloping stone horses, the temple's sandstone facades feature elaborate carvings of musicians, celestial dancers, and maritime trading scenes.",
    address: "Konark, Puri District, Odisha 752111, India",
    latitude: 19.8876,
    longitude: 86.0945,
    significance: "Masterpiece of Kalinga stone architecture, sacred geometry, and precise astronomical solar alignment.",
    facts: [
      "The 24 wheels function as precision sundials: the shadows cast by the spokes calculate exact local time down to minutes.",
      "European sea merchants previously navigated by the temple tower from the Bay of Bengal, naming it the 'Black Pagoda' due to its dark stone facade.",
      "Legend tells that the sanctum originally featured a heavy floating magnetic lodestone that caused early navigational compasses to deviate."
    ]
  },
  {
    id: 6,
    name: "Group of Monuments at Mahabalipuram",
    type: "Cultural",
    year: 1984,
    state: "Tamil Nadu",
    location: "Chengalpattu District, Tamil Nadu",
    country: "India",
    image: "https://www.travelviewpoint.com/wp-content/uploads/2021/12/SHORE-TEMPLES.jpg",
    imageCaption: "8th-century Shore Temple overlooking the Bay of Bengal, Mahabalipuram",
    gallery: [
          {
                url: "https://www.travelviewpoint.com/wp-content/uploads/2021/12/SHORE-TEMPLES.jpg",
                caption: "Shore Temple standing against the sea breeze of the Bay of Bengal"
          },
          {
                url: "https://www.travelviewpoint.com/wp-content/uploads/2021/12/SHORE-TEMPLES.jpg",
                caption: "Monolithic rock-cut Pancha Rathas (Five Chariots) carved from single granite boulders"
          }
    ],
    shortNote: "7th-century coastal rock-cut temples, rathas, and giant open-air reliefs by the Pallavas.",
    description: "The Group of Monuments at Mahabalipuram is a collection of 7th and 8th-century monolithic rock-cut shrines, cave temples, and monolithic stone chariots (Pancha Rathas) erected by the Pallava Dynasty along the Coromandel Coast. The site contains the renowned Shore Temple, which has stood directly against ocean salt spray for over 1,300 years, and Arjuna's Penance, one of the world's largest open-air bas-reliefs.",
    address: "Mahabalipuram, Chengalpattu District, Tamil Nadu 603104, India",
    latitude: 12.6269,
    longitude: 80.1927,
    significance: "Pioneering bedrock of South Indian Dravidian stone temple architecture and maritime Silk Road trade.",
    facts: [
      "Arjuna's Penance is carved across two giant granite boulders measuring 27 meters long, featuring life-sized elephants, celestial beings, and river nymphs.",
      "The Pancha Rathas are five monolithic stone structures, each sculpted out of a single continuous boulder of granite without mortar or joints.",
      "The 2004 Indian Ocean tsunami briefly receded to uncover long-submerged stone ruins of the legendary 'Seven Pagodas' offshore."
    ]
  },
  {
    id: 7,
    name: "Kaziranga National Park",
    type: "Natural",
    year: 1985,
    state: "Assam",
    location: "Golaghat & Nagaon Districts, Assam",
    country: "India",
    image: "https://www.tourmyindia.com/socialimg/kaziranga-national-park.jpg",
    imageCaption: "Great Indian one-horned rhinoceros in the grasslands of Kaziranga",
    gallery: [
          {
                url: "https://www.tourmyindia.com/socialimg/kaziranga-national-park.jpg",
                caption: "Vulnerable Indian One-horned Rhinoceros grazing in tall elephant grasslands"
          }
    ],
    shortNote: "Fertile floodplains sheltering two-thirds of the world's great one-horned rhinoceroses.",
    description: "Kaziranga National Park covers 430 square kilometers along the southern floodplains of the mighty Brahmaputra River in Assam. Consisting of dense tall elephant grass, marshlands, and tropical moist broadleaf forests, the park is celebrated globally as the ultimate sanctuary for the vulnerable Indian one-horned rhinoceros and shelters thriving populations of wild water buffalo, swamp deer, and Bengal tigers.",
    address: "Kanchanjuri, Golaghat and Nagaon, Assam 785609, India",
    latitude: 26.5775,
    longitude: 93.1711,
    significance: "The world's premier conservation success story, home to over 2,600 one-horned rhinos and the highest tiger density in India.",
    facts: [
      "When conservationist Mary Curzon visited in 1904, barely twelve rhinos remained; today the park protects more than 2,600 animals.",
      "Kaziranga is home to the 'Big Five' of Indian wildlife: the Indian Rhino, Royal Bengal Tiger, Asian Elephant, Wild Water Buffalo, and Eastern Swamp Deer.",
      "It is an Important Bird Area (IBA) sheltering hundreds of thousands of migratory waterfowl along the Brahmaputra flyway."
    ]
  },
  {
    id: 8,
    name: "Manas Wildlife Sanctuary",
    type: "Natural",
    year: 1985,
    state: "Assam",
    location: "Barpeta & Bongaigaon Districts, Assam",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.wjqrUOYwDg6UlMUUXRmRQwHaEd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Pristine sub-Himalayan forest and wildlife sanctuary at Manas",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.wjqrUOYwDg6UlMUUXRmRQwHaEd?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Manas River meandering along the India-Bhutan transboundary biosphere reserve"
          }
    ],
    shortNote: "Biodiversity hotspot at the Himalayan foothills home to pygmy hogs and golden langurs.",
    description: "Manas Wildlife Sanctuary is located in the Himalayan foothills of western Assam, contiguous with the Royal Manas National Park of Bhutan. Traversed by the crystal-clear Manas River, the sanctuary boasts rich alluvial grasslands, subtropical forests, and pristine watershed ecosystems that provide habitat for rare endemic species such as the pygmy hog, hispid hare, and Gee's golden langur.",
    address: "Gobardhana, Barpeta and Bongaigaon, Assam 781315, India",
    latitude: 26.6594,
    longitude: 91.0011,
    significance: "Vital transboundary biodiversity corridor in the Eastern Himalayas sheltering numerous critically endangered species found nowhere else.",
    facts: [
      "It is the sole surviving wild refuge for the critically endangered pygmy hog, the world's smallest wild pig standing barely 10 inches tall.",
      "The sanctuary simultaneously holds five distinct conservation statuses: UNESCO Heritage Site, Project Tiger Reserve, Elephant Reserve, Biosphere Reserve, and Ramsar Wetland.",
      "The Manas River is a major tributary of the Brahmaputra, splitting into the Beki and Bholkaduba rivers as it enters the plains."
    ]
  },
  {
    id: 9,
    name: "Keoladeo National Park",
    type: "Natural",
    year: 1985,
    state: "Rajasthan",
    location: "Bharatpur, Rajasthan",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.KHto4MKdWSYNcjPMMM6wBwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Wetland bird sanctuary and painted storks at Keoladeo National Park, Bharatpur",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.KHto4MKdWSYNcjPMMM6wBwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Mosaic of dry woodlands and aquatic marshes alive with avian diversity"
          }
    ],
    shortNote: "World-famous wetland avifauna haven hosting thousands of migratory waterfowl.",
    description: "Keoladeo National Park, formerly known as Bharatpur Bird Sanctuary, is an artificial wetland reserve spanning 29 square kilometers in eastern Rajasthan. Created in the mid-18th century by the Maharaja of Bharatpur through a network of earthen dykes and sluices, the park hosts over 370 bird species, serving as a critical wintering haven for migratory aquatic birds from Siberia, Central Asia, and China.",
    address: "Agra Road, Bharatpur, Rajasthan 321001, India",
    latitude: 27.1591,
    longitude: 77.5233,
    significance: "Globally critical staging ground on the Central Asian Flyway and the former winter home of the critically endangered Siberian crane.",
    facts: [
      "The entire wetland ecosystem was man-made over 250 years ago by constructing the Ajan Bund dam to prevent seasonal flooding in Bharatpur.",
      "Renowned ornithologist Dr. Sálim Ali used this sanctuary to conduct pioneering bird ringing and migration studies across Asia.",
      "During peak winter months, over 100,000 birds nest simultaneously across the park's babool tree groves."
    ]
  },
  {
    id: 10,
    name: "Churches and Convents of Goa",
    type: "Cultural",
    year: 1986,
    state: "Goa",
    location: "Old Goa (Velha Goa), Goa",
    country: "India",
    image: "https://cultureandheritage.org/wp-content/uploads/2023/06/xyz-65-1200x798.jpg",
    imageCaption: "Baroque facade of the Basilica of Bom Jesus, Old Goa",
    gallery: [
          {
                url: "https://cultureandheritage.org/wp-content/uploads/2023/06/xyz-65-1200x798.jpg",
                caption: "Basilica of Bom Jesus preserving the sacred relics of St. Francis Xavier"
          }
    ],
    shortNote: "Colonial Manueline and Baroque religious monuments that spread Western art across Asia.",
    description: "The Churches and Convents of Old Goa comprise an ensemble of monumental religious structures built during Portuguese colonial rule from the early 16th century onward. The site includes the Basilica of Bom Jesus, which preserves the sacred relics of St. Francis Xavier in a silver casket, the towering Sé Catedral with its Golden Bell, and the Church of St. Francis of Assisi.",
    address: "Old Goa Road, Velha Goa, Goa 403402, India",
    latitude: 15.5009,
    longitude: 73.9116,
    significance: "The primary crucible for the dissemination of Manueline, Mannerist, and Baroque architectural styles across South and East Asia.",
    facts: [
      "The Basilica of Bom Jesus houses the naturally mummified body of St. Francis Xavier, displayed for public veneration once every ten years.",
      "The Golden Bell inside Sé Catedral is the largest church bell in Goa and one of the best-sounding bells in the world.",
      "These monuments were constructed from red laterite stone coated with lime plaster to resist torrential coastal monsoon rains."
    ]
  },
  {
    id: 11,
    name: "Khajuraho Group of Monuments",
    type: "Cultural",
    year: 1986,
    state: "Madhya Pradesh",
    location: "Chhatarpur District, Madhya Pradesh",
    country: "India",
    image: "https://images.news18.com/ibnlive/uploads/2021/09/khajuraho.jpeg",
    imageCaption: "Soaring shikhara and sculpted reliefs of Kandariya Mahadeva Temple, Khajuraho",
    gallery: [
          {
                url: "https://images.news18.com/ibnlive/uploads/2021/09/khajuraho.jpeg",
                caption: "Kandariya Mahadeva temple adorned with hundreds of sculpted celestial nymphs"
          }
    ],
    shortNote: "Nagara-style Hindu and Jain temples renowned for nagara spires and sensual stone sculpture.",
    description: "The Khajuraho Group of Monuments consists of striking Hindu and Jain temples built between 885 and 1050 CE by the Chandela Dynasty in Madhya Pradesh. Celebrated for their soaring Nagara-style mountain spires (shikhara) and exquisite sandstone relief carvings, the temples depict gods, celestial nymphs (apsaras), warriors, musicians, and sensual scenes reflecting the balanced Hindu philosophy of Dharma, Artha, Kama, and Moksha.",
    address: "Sevagram, Khajuraho, Madhya Pradesh 471606, India",
    latitude: 24.8318,
    longitude: 79.9199,
    significance: "Zenith of medieval Chandela architecture, celebrating both metaphysical divinity and the richness of human emotions in stone.",
    facts: [
      "Of the original 85 temples spread over 20 square kilometers, only 25 have survived to the present day.",
      "Despite popular misconceptions, erotic sculptures comprise less than 10% of the total carvings, with the remainder honoring deities, cosmic balance, and daily medieval life.",
      "The Kandariya Mahadeva Temple features 872 sculpted figures over three feet tall covering its exterior sandstone facades."
    ]
  },
  {
    id: 12,
    name: "Group of Monuments at Hampi",
    type: "Cultural",
    year: 1986,
    state: "Karnataka",
    location: "Vijayanagara District, Karnataka",
    country: "India",
    image: "https://th.bing.com/th/id/OIP.FvFiKM1uTMblwOK7NsVeswHaEH?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "The iconic Stone Chariot at Vittala Temple, Hampi",
    gallery: [
          {
                url: "https://th.bing.com/th/id/OIP.FvFiKM1uTMblwOK7NsVeswHaEH?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "The legendary Garuda Stone Chariot in the Vittala Temple courtyard"
          }
    ],
    shortNote: "Magnificent capital ruins of the Vijayanagara Empire amidst boulder-strewn Tungabhadra landscapes.",
    description: "Hampi was the grand capital of the Vijayanagara Empire from 1336 to 1565 CE, situated along the rugged banks of the Tungabhadra River in Karnataka. Chronicles left by Persian and Portuguese travelers describe Hampi as one of the richest cities in the world. Today, its ruins encompass over 1,600 surviving monuments across 4,100 hectares, including the active Virupaksha Temple, royal enclosures, and the iconic stone chariot of Vijaya Vittala.",
    address: "Hampi, Vijayanagara District, Karnataka 583239, India",
    latitude: 15.3350,
    longitude: 76.4600,
    significance: "Magnificent capital ruins of one of the richest and most powerful medieval empires in Asian history.",
    facts: [
      "The 56 stone pillars in the Ranga Mandapa of the Vittala Temple are known as the 'musical pillars'—they resonate with the musical notes of the Indian classical saptaswara when struck.",
      "The iconic Stone Chariot in front of the Vittala Temple is dedicated to Garuda and is featured on the reverse side of India's ₹50 currency note.",
      "The Virupaksha Temple has enjoyed an unbroken tradition of daily Hindu worship since the 7th century CE, surviving the city's sacking in 1565."
    ]
  },
  {
    id: 13,
    name: "Fatehpur Sikri",
    type: "Cultural",
    year: 1986,
    state: "Uttar Pradesh",
    location: "Agra District, Uttar Pradesh",
    country: "India",
    image: "https://tse1.explicit.bing.net/th/id/OIP._Hzg3pqYDN-2PMqkXMPqogHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Monumental 54-meter Buland Darwaza entrance at Fatehpur Sikri",
    gallery: [
          {
                url: "https://tse1.explicit.bing.net/th/id/OIP._Hzg3pqYDN-2PMqkXMPqogHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "The 54-meter Buland Darwaza ('Gate of Magnificence') and imperial palaces"
          }
    ],
    shortNote: "Emperor Akbar's fortified red sandstone capital city, home to Buland Darwaza.",
    description: "Fatehpur Sikri was founded in 1571 by Mughal Emperor Akbar to serve as his imperial capital following the prophecy of the Sufi saint Sheikh Salim Chishti regarding the birth of an heir. The red sandstone city contains one of the largest mosques in India (Jama Masjid), the monumental Buland Darwaza gate, the intricately carved white marble tomb of Salim Chishti, and the enigmatic pillar chamber of Diwan-i-Khas.",
    address: "Fatehpur Sikri, Agra District, Uttar Pradesh 283110, India",
    latitude: 27.0945,
    longitude: 77.6679,
    significance: "Intact imperial city showcasing Akbar's synthesised architectural vision combining Gujarati, Rajasthani, and Persian structural forms.",
    facts: [
      "Buland Darwaza ('Gate of Magnificence') stands 54 meters tall and is the highest gateway in Asia, built to commemorate Akbar's victory over Gujarat.",
      "The central pillar of the Diwan-i-Khas features a lotus capital supporting four overhead bridges where Akbar held inter-faith theological dialogues with scholars of different religions.",
      "The entire city was abandoned after only 14 years in 1585 due to acute drinking water shortages and imperial military campaigns in Punjab."
    ]
  },
  {
    id: 14,
    name: "Group of Monuments at Pattadakal",
    type: "Cultural",
    year: 1987,
    state: "Karnataka",
    location: "Bagalkot District, Karnataka",
    country: "India",
    image: "https://i.redd.it/44ocw5i1qhf61.jpg",
    imageCaption: "7th-8th century Chalukya temple complex along the Malaprabha River, Pattadakal",
    gallery: [
          {
                url: "https://i.redd.it/44ocw5i1qhf61.jpg",
                caption: "Virupaksha and Mallikarjuna temples illustrating Chalukyan architectural mastery"
          }
    ],
    shortNote: "Harmonious blend of Northern Nagara and Southern Dravidian temple styles by the Chalukyas.",
    description: "Pattadakal is a 7th and 8th-century complex of Hindu and Jain temples situated on the west bank of the Malaprabha River in Karnataka. Used by the Early Chalukya dynasty as the ceremonial site for royal coronations (Pattabhisheka), the monuments represent a historic synthesis of North Indian Nagara and South Indian Dravidian architectural idioms within a single sacred enclave.",
    address: "Pattadakal, Bagalkot District, Karnataka 587201, India",
    latitude: 15.9489,
    longitude: 75.8160,
    significance: "The coronation sanctum of the Chalukya kings, illustrating the harmonious artistic fusion of northern and southern temple designs.",
    facts: [
      "Queen Lokamahadevi commissioned the grand Virupaksha Temple in 740 CE to celebrate her husband King Vikramaditya II's military victory over the Pallavas of Kanchipuram.",
      "The complex contains ten major temples, four built in the Dravidian style, four in the northern Nagara style, and one (Papanatha) that fuses both.",
      "The stone carvings depict scenes from the Ramayana, Mahabharata, and Panchatantra fables with lively dramatic expressions."
    ]
  },
  {
    id: 15,
    name: "Elephanta Caves",
    type: "Cultural",
    year: 1987,
    state: "Maharashtra",
    location: "Elephanta Island, Raigad District, Maharashtra",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.6E8jY4n4X5Mpmr82rccL_QHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Colossal three-headed Maheshmurti Trimurti Shiva sculpture, Elephanta Caves",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.6E8jY4n4X5Mpmr82rccL_QHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Rock-cut basalt pillars framing the three-faced Sadashiva masterpiece"
          }
    ],
    shortNote: "Island rock-cut cave temples dedicated to Shiva, celebrated for the three-headed Trimurti.",
    description: "The Elephanta Caves are a collection of rock-cut cave temples predominantly dedicated to the Hindu deity Shiva, excavated between the 5th and 8th centuries CE on Gharapuri Island in Mumbai Harbour. The main cave contains colossal bas-relief panels depicting cosmic Shaivite legends, dominated by the iconic 20-foot high Sadashiva or Trimurti relief representing the Creator, Preserver, and Destroyer aspects of the divine.",
    address: "Gharapuri, Elephanta Island, Raigad, Maharashtra 400094, India",
    latitude: 18.9633,
    longitude: 72.9315,
    significance: "One of the most sublime and spiritually expressive rock-art sanctuaries dedicated to Shiva in Indian art history.",
    facts: [
      "16th-century Portuguese navigators named the island 'Elephanta' after discovering a monolithic black stone elephant statue standing near the landing point.",
      "The central Trimurti relief depicts Shiva simultaneously as Aghora (the terrifying destroyer), Tatpurusha (the serene preserver), and Vamadeva (the gentle creator).",
      "The entire cave network covers 60,000 square feet, carved straight out of solid volcanic basalt."
    ]
  },
  {
    id: 16,
    name: "Sundarbans National Park",
    type: "Natural",
    year: 1987,
    state: "West Bengal",
    location: "South 24 Parganas, West Bengal",
    country: "India",
    image: "https://tse3.mm.bing.net/th/id/OIP.Jik0glb8pLjnsFGcRh-vrwHaEb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Royal Bengal Tiger amidst the mangrove waterways of Sundarbans",
    gallery: [
          {
                url: "https://tse3.mm.bing.net/th/id/OIP.Jik0glb8pLjnsFGcRh-vrwHaEb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Pristine mangrove waterways and tidal estuaries of the Sundarbans Delta"
          }
    ],
    shortNote: "World's largest contiguous coastal mangrove forest and home of the swimming Royal Bengal Tiger.",
    description: "Sundarbans National Park encompasses the Indian sector of the world's largest coastal mangrove delta, formed at the confluence of the Ganges, Brahmaputra, and Meghna rivers entering the Bay of Bengal. Covering 10,000 square kilometers across India and Bangladesh, the labyrinth of tidal waterways, mudflats, and halophytic mangrove trees supports a specialized ecosystem inhabited by swimming Royal Bengal tigers, estuarine crocodiles, and Gangetic river dolphins.",
    address: "Dayapur, Gosaba, South 24 Parganas, West Bengal 743370, India",
    latitude: 21.9497,
    longitude: 89.1833,
    significance: "The world's largest mangrove forest ecosystem and a vital biophysical coastal barrier shielding millions from severe tropical cyclones.",
    facts: [
      "The Royal Bengal tigers of Sundarbans are uniquely adapted to drink saline tidal water and are legendary for swimming across wide ocean channels.",
      "The forest is named after the 'Sundari' mangrove tree (Heritiera fomes), which grows specialized aerial breathing roots (pneumatophores) that jut up above water.",
      "It is home to the world's largest population of saltwater crocodiles, with specimens exceeding 20 feet in length."
    ]
  },
  {
    id: 17,
    name: "Great Living Chola Temples",
    type: "Cultural",
    year: 1987,
    state: "Tamil Nadu",
    location: "Thanjavur, Gangaikonda Cholapuram & Darasuram, Tamil Nadu",
    country: "India",
    image: "https://static.vecteezy.com/system/resources/previews/013/872/175/large_2x/tanjore-big-temple-or-brihadeshwara-temple-was-built-by-king-raja-raja-cholan-in-thanjavur-tamil-nadu-it-is-the-very-oldest-and-tallest-temple-in-india-this-temple-listed-in-unesco-s-heritage-site-free-photo.jpg",
    imageCaption: "Towering 66-meter granite vimana of Brihadisvara Temple, Thanjavur",
    gallery: [
          {
                url: "https://static.vecteezy.com/system/resources/previews/013/872/175/large_2x/tanjore-big-temple-or-brihadeshwara-temple-was-built-by-king-raja-raja-cholan-in-thanjavur-tamil-nadu-it-is-the-very-oldest-and-tallest-temple-in-india-this-temple-listed-in-unesco-s-heritage-site-free-photo.jpg",
                caption: "Brihadisvara Temple 66-meter Vimana crowned with an 80-tonne monolithic cupola"
          }
    ],
    shortNote: "Brihadisvara temples of Thanjavur and Gangaikonda Cholapuram, and Airavatesvara at Darasuram.",
    description: "The Great Living Chola Temples comprise three monumental Dravidian stone sanctuaries built between the 11th and 12th centuries CE by the Chola Empire: Brihadisvara Temple at Thanjavur, Brihadisvara at Gangaikonda Cholapuram, and Airavatesvara Temple at Darasuram. Renowned for their towering pyramidal vimana towers, monolithic granite cupolas, and continuous ritual worship, they represent the pinnacle of South Indian architecture.",
    address: "Membalam Road, Balaganapathy Nagar, Thanjavur, Tamil Nadu 613007, India",
    latitude: 10.7828,
    longitude: 79.1318,
    significance: "The apex of South Indian Dravidian stone engineering, bronze iconography, and thousand-year living temple traditions.",
    facts: [
      "The vimana tower of the Thanjavur temple rises 66 meters high, crowned by an 80-ton single block of granite hauled up an inclined earth ramp over six kilometers long.",
      "The massive Nandi bull at Thanjavur is carved from a single granite boulder and weighs approximately 25 tons.",
      "Unlike most North Indian temples, the inner sanctum tower (Vimana) is vastly larger than the entrance gateway towers (Gopurams)."
    ]
  },
  {
    id: 18,
    name: "Nanda Devi and Valley of Flowers National Parks",
    type: "Natural",
    year: 1988,
    state: "Uttarakhand",
    location: "Chamoli District, Garhwal Himalaya, Uttarakhand",
    country: "India",
    image: "https://thumbs.dreamstime.com/b/breathtaking-alpine-meadow-panorama-snowcapped-peaks-wildflower-bloom-majestic-mountain-landscape-immerse-yourself-373626203.jpg",
    imageCaption: "Alpine meadows of blossoms against snowy peaks in Valley of Flowers",
    gallery: [
          {
                url: "https://thumbs.dreamstime.com/b/breathtaking-alpine-meadow-panorama-snowcapped-peaks-wildflower-bloom-majestic-mountain-landscape-immerse-yourself-373626203.jpg",
                caption: "Lush meadows surrounded by rugged snow-capped peaks of the Garhwal Himalaya"
          }
    ],
    shortNote: "Glaciated Himalayan high-altitude wilderness carpeted with endemic alpine floral meadows.",
    description: "This high-altitude glacial sanctuary in Uttarakhand combines the dramatic wilderness of Nanda Devi National Park—surrounding India's second-highest peak (7,816m)—with the gentle meadows of the Valley of Flowers. During the monsoon months, the valley awakens in a riot of endemic alpine blossoms such as the sacred Brahma Kamal, blue poppies, and cobra lilies, providing a safe haven for snow leopards, Asiatic black bears, and Himalayan musk deer.",
    address: "Chamoli District, Garhwal Himalaya, Uttarakhand 246443, India",
    latitude: 30.7280,
    longitude: 79.6053,
    significance: "A sublime biodiversity transition zone between the Zanskar and Great Himalaya ranges, combining sacred geography with pristine alpine flora.",
    facts: [
      "The Valley of Flowers was introduced to the outside world in 1931 when British mountaineer Frank S. Smythe accidentally stumbled upon it while returning from an expedition to Mt. Kamet.",
      "Over 520 species of alpine flowering plants carpet the high valley floor between July and September.",
      "The core basin of Nanda Devi Sanctuary is surrounded by a ring of 12 peaks over 21,000 feet, forming an impenetrable natural mountain fortress."
    ]
  },
  {
    id: 19,
    name: "Buddhist Monuments at Sanchi",
    type: "Cultural",
    year: 1989,
    state: "Madhya Pradesh",
    location: "Raisen District, Madhya Pradesh",
    country: "India",
    image: "https://media.istockphoto.com/id/1367134055/id/foto/stupa-no-1-west-gateway-torana-and-stupa-the-great-stupa-situs-warisan-dunia-sanchi-madhya.jpg?s=170667a&w=0&k=20&c=ilT1b6W9PJ31nNfaq7he2TPwUw2OKWqztKHkt_e-6zs=",
    imageCaption: "The Great Stupa and ornamental torana gateway at Sanchi",
    gallery: [
          {
                url: "https://media.istockphoto.com/id/1367134055/id/foto/stupa-no-1-west-gateway-torana-and-stupa-the-great-stupa-situs-warisan-dunia-sanchi-madhya.jpg?s=170667a&w=0&k=20&c=ilT1b6W9PJ31nNfaq7he2TPwUw2OKWqztKHkt_e-6zs=",
                caption: "The Great Stupa dome and elaborately carved Ashokan Torana gateway"
          }
    ],
    shortNote: "Ancient Buddhist complex featuring the Great Stupa with intricately carved torana gateways.",
    description: "Sanchi is an ancient Buddhist monastic sanctuary situated on a hilltop in Madhya Pradesh, established by Mauryan Emperor Ashoka in the 3rd century BCE. Its centerpiece, the Great Stupa (Stupa 1), is a hemispherical stone dome enclosing holy relics of the Buddha. The stupa is framed by four monumental ceremonial gateways (Toranas) adorned with relief carvings depicting Jataka stories, historical events, and Ashokan imperial patronage.",
    address: "Sanchi, Raisen District, Madhya Pradesh 464661, India",
    latitude: 23.4795,
    longitude: 77.7397,
    significance: "The oldest surviving stone structure in India and the foundational archetype for Buddhist stupa architecture worldwide.",
    facts: [
      "The stone carvings on the gateways were commissioned and executed by ivory carvers from nearby Vidisha, creating extraordinarily delicate detail in hard sandstone.",
      "The Buddha is never represented in human form in the earliest carvings, but instead through aniconic symbols: his footprints, the Bodhi tree, an umbrella, or the wheel of law.",
      "British archaeologist Sir John Marshall restored the ruins between 1912 and 1919, preserving them in their authentic hilltop setting."
    ]
  },
  {
    id: 20,
    name: "Humayun's Tomb, Delhi",
    type: "Cultural",
    year: 1993,
    state: "Delhi",
    location: "Nizamuddin East, New Delhi, Delhi",
    country: "India",
    image: "https://plus.unsplash.com/premium_photo-1697729555861-e406b4989ee1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageCaption: "Red sandstone and white marble dome of Humayun's Tomb, Delhi",
    gallery: [
          {
                url: "https://plus.unsplash.com/premium_photo-1697729555861-e406b4989ee1?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                caption: "Mughal double-domed mausoleum framed by water channels of the Charbagh"
          }
    ],
    shortNote: "The first grand garden-tomb on the Indian subcontinent, direct precursor to the Taj Mahal.",
    description: "Humayun's Tomb was commissioned in 1558 by Mughal Empress Bega Begum (Haji Begum) for her husband, the second Mughal Emperor Humayun. Designed by Persian architect Mirak Mirza Ghiyas, it was the first grand garden-tomb on the Indian subcontinent. The red sandstone monument introduced double domes, high arched alcoves (pishtaq), and a geometric 30-acre Charbagh four-quartered paradise garden with water canals.",
    address: "Mathura Road, Nizamuddin East, New Delhi, Delhi 110013, India",
    latitude: 28.5933,
    longitude: 77.2507,
    significance: "The direct architectural prototype for the Taj Mahal and the birthplace of dynastic Mughal tomb architecture in India.",
    facts: [
      "Known as the 'Dormitory of the Mughals', the complex contains more than 150 graves of Mughal royalty within its cells and terrace.",
      "It was the first building in India to employ a Persian-style double dome, which allows the outer dome to be tall while keeping the interior ceiling in human proportion.",
      "Last Mughal Emperor Bahadur Shah Zafar took refuge here with three princes during the 1857 Indian rebellion before being captured by Captain William Hodson."
    ]
  },
  {
    id: 21,
    name: "Qutb Minar and its Monuments, Delhi",
    type: "Cultural",
    year: 1993,
    state: "Delhi",
    location: "Mehrauli, New Delhi, Delhi",
    country: "India",
    image: "https://th.bing.com/th/id/R.d6361bf60474d0bebd0163df5fe9d35d?rik=0UaPDSoqHhmX%2fw&riu=http%3a%2f%2fwww.bhavyaholidays.com%2fblogs%2fwp-content%2fuploads%2f2014%2f03%2fQutub-Minar-Delhi.jpg&ehk=jWlKgqANH%2fF%2bw6HhyTVcTSv5SvBoOfR%2b6%2faLVNTUoto%3d&risl=&pid=ImgRaw&r=0",
    imageCaption: "73-meter fluted red sandstone Qutb Minar tower and iron pillar ruins, Delhi",
    gallery: [
          {
                url: "https://th.bing.com/th/id/R.d6361bf60474d0bebd0163df5fe9d35d?rik=0UaPDSoqHhmX%2fw&riu=http%3a%2f%2fwww.bhavyaholidays.com%2fblogs%2fwp-content%2fuploads%2f2014%2f03%2fQutub-Minar-Delhi.jpg&ehk=jWlKgqANH%2fF%2bw6HhyTVcTSv5SvBoOfR%2b6%2faLVNTUoto%3d&risl=&pid=ImgRaw&r=0",
                caption: "Towering sandstone minaret adorned with intricate balconies and geometric calligraphy"
          }
    ],
    shortNote: "73-meter fluted red sandstone minaret alongside the 1,600-year-old rust-resistant Iron Pillar.",
    description: "The Qutb complex in south Delhi is a historic ensemble of monuments from the Delhi Sultanate. Its defining landmark is the Qutb Minar, a 72.5-meter fluted red sandstone victory minaret begun by Qutb-ud-din Aibak in 1199 CE. The complex also features the Quwwat-ul-Islam Mosque, the monumental Alai Darwaza gateway, and the famous 4th-century Gupta Iron Pillar, which has miraculously resisted rust for over 1,600 years.",
    address: "Seth Sarai, Mehrauli, New Delhi, Delhi 110030, India",
    latitude: 28.5244,
    longitude: 77.1855,
    significance: "The tallest brick minaret in the world and a monumental symbol of early Indo-Islamic artistic fusion under the Delhi Sultanate.",
    facts: [
      "The Qutb Minar tapers from a base diameter of 14.3 meters down to only 2.7 meters at the top, accessed via 379 spiral stone steps.",
      "The Gupta Iron Pillar in the courtyard was forged in the 4th century CE and contains a high proportion of phosphorus that creates a protective passive film, preventing rust.",
      "Sultan Alauddin Khilji began building an adjacent minaret (Alai Minar) intended to be twice the height of Qutb Minar, but construction halted at 24 meters upon his death."
    ]
  },
  {
    id: 22,
    name: "Mountain Railways of India",
    type: "Cultural",
    year: 1999,
    state: "West Bengal, Tamil Nadu, Himachal Pradesh",
    location: "Darjeeling, Nilgiri & Kalka-Shimla, Multi-State",
    country: "India",
    image: "https://tse2.mm.bing.net/th/id/OIP.aRrM80VooiHEDu9Rwd7g1QHaEr?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Historic Nilgiri and Darjeeling mountain railway steam engines",
    gallery: [
          {
                url: "https://tse2.mm.bing.net/th/id/OIP.aRrM80VooiHEDu9Rwd7g1QHaEr?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "The legendary Darjeeling 'Toy Train' climbing through misty Himalayan pine forests"
          }
    ],
    shortNote: "Ingenious narrow-gauge hill railways: Darjeeling Himalayan, Nilgiri Mountain, and Kalka Shimla.",
    description: "The Mountain Railways of India designation comprises three historic narrow-gauge railway lines: the Darjeeling Himalayan Railway (1881) in West Bengal, the Nilgiri Mountain Railway (1908) in Tamil Nadu, and the Kalka-Shimla Railway (1903) in Himachal Pradesh. Built during the British colonial era to link remote hill stations with the plains, these lines utilized bold engineering solutions such as spiral loops, switchbacks, and rack-and-pinion systems.",
    address: "Hill Cart Road, Darjeeling, West Bengal 734101, India",
    latitude: 27.0360,
    longitude: 88.2627,
    significance: "Pioneering 19th-century mountain railway engineering triumphs that transformed isolated mountain regions through innovative transit design.",
    facts: [
      "The Darjeeling 'Toy Train' climbs from 100 meters elevation at New Jalpaiguri up to 2,258 meters at Ghum, the highest railway station in India.",
      "The Nilgiri Mountain Railway is the only rack-and-pinion railway operating in India, utilizing a central toothed rail to climb gradients of 1 in 12.5.",
      "The Kalka-Shimla line passes through 103 tunnels and crosses more than 800 stone arch viaducts along its 96-kilometer route."
    ]
  },
  {
    id: 23,
    name: "Mahabodhi Temple Complex at Bodh Gaya",
    type: "Cultural",
    year: 2002,
    state: "Bihar",
    location: "Bodh Gaya, Gaya District, Bihar",
    country: "India",
    image: "https://static.toiimg.com/photo/69372761/3.jpg?width=748&resize=4",
    imageCaption: "50-meter pyramidal stone spire of Mahabodhi Temple, Bodh Gaya",
    gallery: [
          {
                url: "https://static.toiimg.com/photo/69372761/3.jpg?width=748&resize=4",
                caption: "55-meter grand pyramidal temple spire rising above the sacred Bodhi Tree"
          }
    ],
    shortNote: "The holiest Buddhist shrine marking the exact location where Gautama Buddha attained Enlightenment.",
    description: "The Mahabodhi Temple Complex in Bodh Gaya marks the sacred spot where Siddhartha Gautama attained supreme Enlightenment (Bodhi) beneath the sacred Bodhi Tree in approximately 528 BCE. The main temple is a 55-meter grand pyramidal brick tower dating back to the 5th and 6th centuries CE. Enclosing the Diamond Throne (Vajrasana) and sacred lotus pond, it is revered as the spiritual center of the Buddhist world.",
    address: "Bodh Gaya, Gaya District, Bihar 824231, India",
    latitude: 24.6959,
    longitude: 84.9913,
    significance: "The supreme spiritual birthplace of Buddhism, preserving an unbroken tradition of global pilgrimage for over two and a half millennia.",
    facts: [
      "The sacred Bodhi tree growing behind the temple is a direct descendant of the original Ficus religiosa tree beneath which Buddha sat in meditation.",
      "Emperor Ashoka visited Bodh Gaya around 260 BCE and constructed the Diamond Throne (Vajrasana) to commemorate the exact Enlightenment point.",
      "It is one of the earliest brick temple structures surviving in India and had a profound influence on temple architecture throughout East and Southeast Asia."
    ]
  },
  {
    id: 24,
    name: "Rock Shelters of Bhimbetka",
    type: "Cultural",
    year: 2003,
    state: "Madhya Pradesh",
    location: "Raisen District, Madhya Pradesh",
    country: "India",
    image: "https://www.timetravelturtle.com/wp-content/uploads/2019/03/Bhopal-2018-342_new.jpg",
    imageCaption: "Prehistoric rock art and Paleolithic sandstone shelters of Bhimbetka",
    gallery: [
          {
                url: "https://www.timetravelturtle.com/wp-content/uploads/2019/03/Bhopal-2018-342_new.jpg",
                caption: "Ancient ochre pigments showing hunters, warriors on horseback, and wild beasts"
          }
    ],
    shortNote: "Over 750 prehistoric rock shelters bearing paintings that span from the Paleolithic to Mesolithic eras.",
    description: "The Rock Shelters of Bhimbetka are an archaeological treasure in the foothills of the Vindhyan Mountains, featuring more than 750 rock shelters spread over seven hills. The walls of these sandstone shelters bear prehistoric rock paintings created by Stone Age hunter-gatherers, with the earliest artworks dating back approximately 30,000 years. The ochre, white, and red drawings depict animals, hunting, family scenes, and ritual dancing.",
    address: "Bhojpur Road, Raisen District, Madhya Pradesh 464990, India",
    latitude: 22.9372,
    longitude: 77.6127,
    significance: "The earliest evidence of human creative expression and continuous settlement on the Indian subcontinent.",
    facts: [
      "The site was discovered in 1957 by Indian archaeologist Dr. V. S. Wakankar, who spotted the distinctive sandstone rock formations while traveling on a train.",
      "The prehistoric pigments have survived millennia without fading because the mineral colors reacted chemically with the iron-bearing sandstone rock surface.",
      "The name Bhimbetka is derived from 'Bhimbaithaka', referring to the resting place of Bhima, the heroic Pandava brother of the Mahabharata."
    ]
  },
  {
    id: 25,
    name: "Chhatrapati Shivaji Maharaj Terminus",
    type: "Cultural",
    year: 2004,
    state: "Maharashtra",
    location: "Fort, Mumbai, Maharashtra",
    country: "India",
    image: "https://www.robinage.com/wp-content/uploads/2021/08/cst-main.jpg",
    imageCaption: "High Victorian Gothic Revival facade of Chhatrapati Shivaji Maharaj Terminus, Mumbai",
    gallery: [
          {
                url: "https://www.robinage.com/wp-content/uploads/2021/08/cst-main.jpg",
                caption: "Ornate Victorian Gothic facade, carved turrets, and grand central dome"
          }
    ],
    shortNote: "Masterpiece of Victorian High Gothic Revival architecture blended with traditional Indian motifs.",
    description: "Chhatrapati Shivaji Maharaj Terminus (formerly Victoria Terminus) is an opulent railway terminus in Mumbai designed by British architectural engineer F. W. Stevens. Completed in 1888 after ten years of construction, the building represents an extraordinary meeting of Victorian Italian Gothic Revival architecture with traditional Indian stone carvings, vaulted tile ceilings, stained-glass windows, and ornate wrought-iron grilles.",
    address: "Chhatrapati Shivaji Terminus Area, Fort, Mumbai, Maharashtra 400001, India",
    latitude: 18.9398,
    longitude: 72.8354,
    significance: "An exceptional masterwork of 19th-century railway architecture, symbolizing Mumbai's rise as India's premier international port city.",
    facts: [
      "The crowning stone statue atop the main octagonal dome is the female figure of 'Progress', holding a torch pointing toward the sky in her right hand.",
      "Indian craftsmen and students from the Sir Jamsetjee Jeejebhoy School of Art executed the intricate bas-relief carvings of peacocks, monkeys, and botanical flora.",
      "Today it serves as the operational headquarters of Central Railway, handling over three million commuter rail passengers every single day."
    ]
  },
  {
    id: 26,
    name: "Champaner-Pavagadh Archaeological Park",
    type: "Cultural",
    year: 2004,
    state: "Gujarat",
    location: "Panchmahal District, Gujarat",
    country: "India",
    image: "https://worldheritagesites.net/wp-content/uploads/2024/08/jama-masjid-768x512.jpg",
    imageCaption: "16th-century Jama Masjid and Pavagadh hill citadel, Champaner",
    gallery: [
          {
                url: "https://worldheritagesites.net/wp-content/uploads/2024/08/jama-masjid-768x512.jpg",
                caption: "Sculpted stone arches and towering minarets of the Champaner Jama Masjid"
          }
    ],
    shortNote: "Concentration of unexcavated archaeological heritage and 16th-century capital of Mahmud Begada.",
    description: "Champaner-Pavagadh is an extraordinary archaeological park in Gujarat containing unexcavated prehistoric and medieval ruins. It incorporates an 8th-to-14th-century Hindu hill fortress perched on Pavagadh volcanic hill and the 16th-century capital of the Gujarat Sultanate founded by Sultan Mahmud Begada. The site features the Jama Masjid, military fortifications, water-harvesting stepwells, and the Kalika Mata Temple.",
    address: "Champaner, Panchmahal District, Gujarat 389360, India",
    latitude: 22.4833,
    longitude: 73.5333,
    significance: "The only complete and unchanged pre-Mughal Islamic city in India, blending Hindu and Islamic architectural traditions.",
    facts: [
      "The Jama Masjid of Champaner is renowned for its 172 carved pillars, central dome, and intricate stone jali screens that filter desert sunlight.",
      "The site preserves an advanced medieval hydraulic network of stepwells, cisterns, and percolation reservoirs that supported a population of over 100,000.",
      "Pavagadh hill is a sacred pilgrimage peak; the Kalika Mata Temple on its summit attracts millions of pilgrims annually."
    ]
  },
  {
    id: 27,
    name: "Red Fort Complex, Delhi",
    type: "Cultural",
    year: 2007,
    state: "Delhi",
    location: "Chandni Chowk, New Delhi, Delhi",
    country: "India",
    image: "https://www.deshvidesh.com/wp-content/uploads/2018/10/Red-Fort-Complex.jpg",
    imageCaption: "Lahore Gate and red sandstone ramparts of Lal Qila (Red Fort), Delhi",
    gallery: [
          {
                url: "https://www.deshvidesh.com/wp-content/uploads/2018/10/Red-Fort-Complex.jpg",
                caption: "Monumental red sandstone battlements and the Lahore Gate of Lal Qila"
          }
    ],
    shortNote: "Majestic octagonal red sandstone fortress built by Shah Jahan, symbol of Indian independence.",
    description: "The Red Fort (Lal Qila) was commissioned in 1639 by fifth Mughal Emperor Shah Jahan when he shifted his imperial capital from Agra to Shahjahanabad (Delhi). Enclosed by imposing octagonal red sandstone ramparts spanning 2.4 kilometers, the complex encloses palatial pavilions linked by water channels known as Nahr-i-Bihisht (Stream of Paradise), the Diwan-i-Aam public audience hall, and the private Diwan-i-Khas.",
    address: "Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006, India",
    latitude: 28.6562,
    longitude: 77.2410,
    significance: "The sovereign architectural symbol of modern Indian democracy, where the Prime Minister addresses the nation on Independence Day.",
    facts: [
      "The famous Persian inscription inside the Diwan-i-Khas proclaims: 'If there be a paradise on earth, it is here, it is here, it is here.'",
      "The fort originally housed the legendary Peacock Throne of Shah Jahan before it was looted by Persian invader Nader Shah in 1739.",
      "Every year on August 15th, the Prime Minister of India hoists the national tricolor flag from the ramparts of the Lahore Gate."
    ]
  },
  {
    id: 28,
    name: "The Jantar Mantar, Jaipur",
    type: "Cultural",
    year: 2010,
    state: "Rajasthan",
    location: "Pink City, Jaipur, Rajasthan",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.gkd4Z0MLO2gQ6-RDWh7rXQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Vrihat Samrat Yantra stone equinoctial sundial at Jantar Mantar, Jaipur",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.gkd4Z0MLO2gQ6-RDWh7rXQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "The colossal Vrihat Samrat Yantra sundial accurate to within two seconds"
          }
    ],
    shortNote: "Astronomical observation site featuring the world's largest stone sundial, built by Sawai Jai Singh II.",
    description: "The Jantar Mantar in Jaipur is a collection of 19 monumental stone architectural astronomical instruments completed in 1734 by the astronomer-king Sawai Jai Singh II. Designed for naked-eye astronomical observation, the instruments measure solar time, predict eclipses, track planetary coordinates, and determine celestial altitudes with astonishing mathematical precision.",
    address: "Gangori Bazaar, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002, India",
    latitude: 26.9248,
    longitude: 75.8246,
    significance: "The most significant, most comprehensive, and best-preserved historic astronomical observatory in India.",
    facts: [
      "The Vrihat Samrat Yantra is the world's largest stone sundial, standing 27 meters tall; its shadow moves visibly at the rate of 1 millimeter per second.",
      "The instruments enabled Jai Singh II to compile the 'Zij-i Muhammad Shahi', an astronomical table more accurate than European equivalents of the period.",
      "The instruments are built from local sandstone and white marble, with brass graduations inscribed directly into the stone arcs."
    ]
  },
  {
    id: 29,
    name: "Western Ghats",
    type: "Natural",
    year: 2012,
    state: "Kerala, Tamil Nadu, Karnataka, Goa, Maharashtra, Gujarat",
    location: "Sahyadri Mountain Range, 6 Western States",
    country: "India",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b20d91e4-0d5a-4509-b0cb-9686195155c9/dg1mfka-c7bce730-be2e-4b22-a994-1c2d362031c4.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IyMGQ5MWU0LTBkNWEtNDUwOS1iMGNiLTk2ODYxOTUxNTVjOVwvZGcxbWZrYS1jN2JjZTczMC1iZTJlLTRiMjItYTk5NC0xYzJkMzYyMDMxYzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PfgIVKyYD3T8yM_aVbRYimOeLfW1Y7d68LC5XSDluRY",
    imageCaption: "Misty mountain peaks and biodiversity hotspot of the Western Ghats (Sahyadris)",
    gallery: [
          {
                url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b20d91e4-0d5a-4509-b0cb-9686195155c9/dg1mfka-c7bce730-be2e-4b22-a994-1c2d362031c4.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IyMGQ5MWU0LTBkNWEtNDUwOS1iMGNiLTk2ODYxOTUxNTVjOVwvZGcxbWZrYS1jN2JjZTczMC1iZTJlLTRiMjItYTk5NC0xYzJkMzYyMDMxYzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PfgIVKyYD3T8yM_aVbRYimOeLfW1Y7d68LC5XSDluRY",
                caption: "Misty emerald tea terraces and cloud-forest ridges of the Sahyadri mountains"
          }
    ],
    shortNote: "One of the world's eight 'hottest hotspots' of biological diversity and monsoon generator.",
    description: "The Western Ghats (Sahyadri) is a 1,600-kilometer mountain range traversing six Indian states along the western peninsular coast. Older than the Himalayas, the mountains act as a massive natural climate wall that traps southwest monsoon clouds. The evergreen montane cloud forests and shola grasslands harbor extraordinary levels of endemic flora and fauna, including lion-tailed macaques, Nilgiri tahrs, and the purple frog.",
    address: "Agasthyamalai to Sahyadri Range across 6 Western Indian States, India",
    latitude: 10.1500,
    longitude: 77.0000,
    significance: "Recognized as one of the world's eight 'hottest hotspots' of biological diversity, supporting over 325 globally threatened species.",
    facts: [
      "The mountain range serves as the critical water tower for peninsular India, giving birth to major river systems including the Godavari, Krishna, and Kaveri.",
      "Over 50% of its amphibian and reptile species are completely endemic, meaning they are found nowhere else on planet Earth.",
      "The subterranean Purple Frog (Nasikabatrachus sahyadrensis), discovered here in 2003, is a living fossil that evolved over 130 million years ago."
    ]
  },
  {
    id: 30,
    name: "Hill Forts of Rajasthan",
    type: "Cultural",
    year: 2013,
    state: "Rajasthan",
    location: "Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer & Jaisalmer, Rajasthan",
    country: "India",
    image: "https://i.pinimg.com/736x/ca/7d/be/ca7dbed794fb2412a2cb304452b3c286.jpg",
    imageCaption: "Monumental battlements and ramparts of Kumbhalgarh Fort, Rajasthan",
    gallery: [
          {
                url: "https://i.pinimg.com/736x/ca/7d/be/ca7dbed794fb2412a2cb304452b3c286.jpg",
                caption: "The Great Wall of India at Kumbhalgarh winding along mountain crests"
          }
    ],
    shortNote: "Six majestic Rajput hill fortresses: Chittorgarh, Kumbhalgarh, Sawai Madhopur, Jhalawar, Jaipur, and Jaisalmer.",
    description: "This serial UNESCO inscription encompasses six monumental hilltop fortresses across Rajasthan: Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amer, and Jaisalmer. Constructed between the 8th and 18th centuries by Rajput rulers, the forts represent brilliant military adaptations to rocky desert and mountain topography, featuring massive serpentine perimeter walls, rainwater harvesting systems, and opulent royal palaces.",
    address: "Chittorgarh Fort, Chittorgarh, Rajasthan 312001, India",
    latitude: 24.8887,
    longitude: 74.6269,
    significance: "The supreme manifestation of medieval Rajput warrior culture, chivalry, defensive military engineering, and royal palace elegance.",
    facts: [
      "Kumbhalgarh Fort boasts a continuous perimeter wall stretching 36 kilometers—the second-longest continuous wall on Earth after the Great Wall of China.",
      "Chittorgarh Fort covers nearly 700 acres and witnessed three legendary historical sieges commemorated by the Vijay Stambha (Tower of Victory).",
      "Gagron Fort is a rare example of a 'Jal Durg' (water-protected fort), surrounded on three sides by the Ahu and Kali Sindh rivers."
    ]
  },
  {
    id: 31,
    name: "Rani-ki-Vav (The Queen’s Stepwell)",
    type: "Cultural",
    year: 2014,
    state: "Gujarat",
    location: "Patan, Gujarat",
    country: "India",
    image: "https://s-media-cache-ak0.pinimg.com/originals/c8/58/f3/c858f3e5c6861ccf7d7f34daf46e3079.jpg",
    imageCaption: "Seven-level carved subterranean stepwell with Vishnu reliefs at Rani ki Vav, Patan",
    gallery: [
          {
                url: "https://s-media-cache-ak0.pinimg.com/originals/c8/58/f3/c858f3e5c6861ccf7d7f34daf46e3079.jpg",
                caption: "Seven subterranean sculpted storeys featuring over 500 Vishnu avatar reliefs"
          }
    ],
    shortNote: "Inverted temple stepwell with seven levels of sculpted panels celebrating the Dashavatara.",
    description: "Rani-ki-Vav is a magnificent subterranean stepwell located in Patan, Gujarat, on the banks of the ancient Saraswati River. Commissioned in 1063 CE by Queen Udayamati in memory of King Bhima I of the Solanki dynasty, the stepwell is designed as an 'inverted temple' descending seven storeys into the earth. It is adorned with over 500 principal sculptures depicting the Dashavatara incarnations of Lord Vishnu and celestial apsaras.",
    address: "Mohan Nagar Society, Patan, Gujarat 384265, India",
    latitude: 23.8589,
    longitude: 72.1018,
    significance: "The pinnacle of subterranean water management architecture and Maru-Gurjara sculptural sophistication in ancient India.",
    facts: [
      "The monument lay buried under thick river silt for nearly 700 years after the Saraswati River flooded, keeping its delicate sculptures in pristine condition until excavation in the 1980s.",
      "At the lowest fourth level, a sculpture depicts Lord Vishnu reclining upon the thousand-headed serpent Sheshanaga.",
      "The stepwell is prominently featured on the reverse side of the new Indian ₹100 currency note issued by the Reserve Bank of India."
    ]
  },
  {
    id: 32,
    name: "Great Himalayan National Park Conservation Area",
    type: "Natural",
    year: 2014,
    state: "Himachal Pradesh",
    location: "Kullu District, Himachal Pradesh",
    country: "India",
    image: "https://tse3.mm.bing.net/th/id/OIP.LMMauv3VF12kr8Tz0CCADwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Glacial alpine peaks and pristine valleys of Great Himalayan National Park",
    gallery: [
          {
                url: "https://tse3.mm.bing.net/th/id/OIP.LMMauv3VF12kr8Tz0CCADwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Pristine mountain ranges of Kullu sheltering Western Tragopan and blue sheep"
          }
    ],
    shortNote: "Glacial alpine peaks, sub-alpine meadows, and riverine forests in Kullu district.",
    description: "Great Himalayan National Park spans 905 square kilometers in the western Himalaya in Himachal Pradesh. Characterized by soaring glacial peaks reaching over 6,000 meters, pristine alpine meadows, and dense temperate forests, the park protects the headwaters of the Tirthan, Sainj, and Jiwa Nal rivers. It provides vital habitat for 25 distinct forest types and endangered Himalayan wildlife.",
    address: "Shamshi, Kullu District, Himachal Pradesh 175126, India",
    latitude: 31.7580,
    longitude: 77.5580,
    significance: "An extraordinarily intact Western Himalayan ecosystem preserving untouched glacial watershed habitats and rare endemic biodiversity.",
    facts: [
      "The park shelters one of the largest remaining wild populations of the Western Tragopan, a pheasant species known in Hindi as 'Jujurana' (King of Birds).",
      "No roads or permanent human settlements exist within the park boundaries; it can only be explored via self-supported foot trekking.",
      "It supports rare high-altitude medicinal herbs including the prized caterpillar fungus (Yartsa Gunbu) and Himalayan yew."
    ]
  },
  {
    id: 33,
    name: "Archaeological Site of Nalanda Mahavihara",
    type: "Cultural",
    year: 2016,
    state: "Bihar",
    location: "Nalanda District, Bihar",
    country: "India",
    image: "https://media01.stockfood.com/largepreviews/MjIwMzE5NzU5MA==/71070890-Sariputra-Stupa-Temple-Site-No-3-Nalanda-Mahavihara-Bihar-India.jpg",
    imageCaption: "Sariputta Stupa 3 and ancient monastic quadrangle at Nalanda Mahavihara",
    gallery: [
          {
                url: "https://media01.stockfood.com/largepreviews/MjIwMzE5NzU5MA==/71070890-Sariputra-Stupa-Temple-Site-No-3-Nalanda-Mahavihara-Bihar-India.jpg",
                caption: "Excavated red-brick Sariputta Stupa No. 3 and monastic residential cells"
          }
    ],
    shortNote: "Ancient monastic and scholastic institution that was the premier university of the Buddhist world.",
    description: "Nalanda Mahavihara in Bihar was the most renowned residential university of ancient Asia, functioning continuously from the 3rd century BCE to the 13th century CE. Supported by Mauryan, Gupta, and Pala rulers, Nalanda attracted up to 10,000 scholars and 2,000 teachers from China, Korea, Japan, Tibet, and Indonesia. The excavated red-brick site includes stupas, shrines, residential viharas, and classrooms.",
    address: "Nalanda Mahavihara, Bargaon, Bihar 803111, India",
    latitude: 25.1357,
    longitude: 85.4449,
    significance: "The premier intellectual epicenter of ancient Asia, pioneering residential academic learning, debate, and philosophical inquiry.",
    facts: [
      "Chinese Buddhist pilgrim Xuanzang studied at Nalanda for five years in the 7th century CE, leaving detailed travel chronicles of its vast libraries.",
      "Nalanda's legendary multi-storey library, known as Dharmaganja ('Treasury of Truth'), housed hundreds of thousands of handwritten palm-leaf manuscripts.",
      "Admission was notoriously competitive: applicants were rigorously examined by gatekeeper scholars at the university entrance."
    ]
  },
  {
    id: 34,
    name: "Khangchendzonga National Park",
    type: "Mixed",
    year: 2016,
    state: "Sikkim",
    location: "North & West Sikkim Districts, Sikkim",
    country: "India",
    image: "https://media.nepaltrekadventures.com/uploads/socialmedia/kanchenjunga-b1-1.jpg",
    imageCaption: "Glacial massif of Mount Kanchenjunga (8,586m) over Khangchendzonga National Park",
    gallery: [
          {
                url: "https://media.nepaltrekadventures.com/uploads/socialmedia/kanchenjunga-b1-1.jpg",
                caption: "Golden sunrise illuminating the 8,586-meter snowy peaks of Mount Kanchenjunga"
          }
    ],
    shortNote: "India's only Mixed World Heritage site, sacred mountain domain of Mt. Kanchenjunga.",
    description: "Khangchendzonga National Park in Sikkim is India's sole Mixed World Heritage property, recognized for both cultural and natural universal significance. Covering nearly 25% of Sikkim, the park centers on Mount Kanchenjunga (8,586m)—the third-highest peak on Earth. The park encompasses glaciers, 18 high-altitude lakes, sacred Buddhist hidden valleys (Beyul), and sacred Lepcha indigenous landscapes.",
    address: "North and West Sikkim Districts, Sikkim 737116, India",
    latitude: 27.7000,
    longitude: 88.3300,
    significance: "India's only Mixed (Cultural + Natural) site, fusing sacred mountain cosmology with spectacular Himalayan biodiversity.",
    facts: [
      "Mount Kanchenjunga is revered as a protective deity by the people of Sikkim; mountaineering expeditions historically halted six feet short of the actual summit to avoid defiling the peak.",
      "The park includes the massive Zemu Glacier, one of the largest glaciers in the Eastern Himalayas, stretching 26 kilometers in length.",
      "It is home to the elusive snow leopard, Himalayan tahr, red panda, and over 550 species of birds."
    ]
  },
  {
    id: 35,
    name: "The Architectural Work of Le Corbusier",
    type: "Cultural",
    year: 2016,
    state: "Chandigarh",
    location: "Capitol Complex, Sector 1, Chandigarh",
    country: "India",
    image: "https://tse2.mm.bing.net/th/id/OIP.jpxtrjCLtvfEyZAPDtVeAAHaFi?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Palace of Assembly and Open Hand Monument at Chandigarh Capitol Complex",
    gallery: [
          {
                url: "https://tse2.mm.bing.net/th/id/OIP.jpxtrjCLtvfEyZAPDtVeAAHaFi?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "The iconic 26-meter Open Hand Monument turning with the Himalayan winds"
          }
    ],
    shortNote: "Modernist Capitol Complex in Chandigarh, an outstanding contribution to the Modern Movement.",
    description: "The Capitol Complex in Chandigarh was designed by Swiss-French modern architecture pioneer Le Corbusier in the 1950s following the partition of India. The 100-acre complex forms the governmental head of the planned city and includes three monumental raw-concrete (béton brut) edifices: the Legislative Assembly, the Secretariat, and the High Court, framed by the iconic Open Hand Monument.",
    address: "Sector 1, Chandigarh, Punjab/Haryana 160001, India",
    latitude: 30.7580,
    longitude: 76.8040,
    significance: "A monumental milestone of 20th-century Modernist urbanism, demonstrating the response of modern design to the aspirations of newly independent India.",
    facts: [
      "The Open Hand Monument (La Main Ouverte) stands 26 meters high and rotates like a weather vane in the wind, symbolizing 'open to give, open to receive'.",
      "Prime Minister Jawaharlal Nehru commissioned Le Corbusier to design Chandigarh as a symbol of India's freedom, unfettered by traditions of the past.",
      "The Legislative Assembly building features an innovative hyperbolic paraboloid cooling tower over the legislative chamber, inspired by industrial cooling towers."
    ]
  },
  {
    id: 36,
    name: "Historic City of Ahmadabad",
    type: "Cultural",
    year: 2017,
    state: "Gujarat",
    location: "Old Walled City, Ahmedabad, Gujarat",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.4Qmp_7xvBp_j9tgla4JRFwHaDj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Tree of Life carved stone lattice jali screen at Sidi Saiyyed Mosque, Ahmedabad",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.4Qmp_7xvBp_j9tgla4JRFwHaDj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Intricate wooden pol streetscapes and Indo-Saracenic historic gates"
          }
    ],
    shortNote: "Walled city founded by Sultan Ahmad Shah in 1411 with traditional pols and wooden bird feeders.",
    description: "Founded in 1411 CE by Sultan Ahmad Shah on the eastern banks of the Sabarmati River, the walled city of Ahmadabad is India's first UNESCO World Heritage City. The urban core contains a rich architectural legacy from the Gujarat Sultanate, including the Bhadra citadel, monumental city gates, and mosques, alongside hundreds of traditional gated residential neighborhoods known as 'pols' featuring carved wooden houses and chabutras.",
    address: "Old Walled City, Ahmedabad, Gujarat 380001, India",
    latitude: 23.0225,
    longitude: 72.5714,
    significance: "The first city in India inscribed as a World Heritage Site, celebrated for its historic urban fabric and communal pol living traditions.",
    facts: [
      "The city contains over 600 'pols'—densely packed gated neighborhoods with communal courtyards, secret escape passageways, and intricate rainwater cisterns.",
      "The Sidi Saiyyed Mosque inside the city is renowned for its intricately carved stone latticework 'Tree of Life' window jali, the official emblem of IIM Ahmedabad.",
      "It became the spiritual center of the Indian freedom struggle when Mahatma Gandhi established the Sabarmati Ashram on the riverbank in 1917."
    ]
  },
  {
    id: 37,
    name: "Victorian Gothic and Art Deco Ensembles of Mumbai",
    type: "Cultural",
    year: 2018,
    state: "Maharashtra",
    location: "Fort & Marine Drive, Mumbai, Maharashtra",
    country: "India",
    image: "https://banasri.in/wp-content/uploads/2024/06/Victorian-and-Art-Deco-banasri.in_.jpg",
    imageCaption: "Victorian Gothic Rajabai Clock Tower and High Court along Oval Maidan, Mumbai",
    gallery: [
          {
                url: "https://banasri.in/wp-content/uploads/2024/06/Victorian-and-Art-Deco-banasri.in_.jpg",
                caption: "Victorian Gothic law courts and the Rajabai Clock Tower ensemble"
          }
    ],
    shortNote: "Victorian neo-Gothic public buildings facing the Oval Maidan and 20th-century Art Deco seafront ensembles.",
    description: "This urban heritage ensemble in south Mumbai features a unique dialogue between two distinct architectural eras facing each other across the Oval Maidan. On the east stand 19th-century Victorian Neo-Gothic public edifices including Mumbai University and the Bombay High Court. On the west along Marine Drive stands the world's second-largest cluster of 20th-century Art Deco residential buildings.",
    address: "Oval Maidan, Maharshi Karve Road, Churchgate, Mumbai, Maharashtra 400020, India",
    latitude: 18.9322,
    longitude: 72.8296,
    significance: "The world's second-largest ensemble of Art Deco architecture after Miami, exemplifying the rapid modernization of a major Indian commercial metropolis.",
    facts: [
      "The 85-meter Rajabai Clock Tower on the Mumbai University campus was modeled after London's Big Ben and chimes classical tunes every 15 minutes.",
      "Mumbai's Art Deco style evolved into 'Indo-Deco', blending nautical streamlines with Indian motifs like lotus rosettes and sunbursts.",
      "The two facing styles across the green cricket grounds of Oval Maidan symbolize Mumbai's evolution from a colonial outpost to a modern Indian metropolis."
    ]
  },
  {
    id: 38,
    name: "Jaipur City, Rajasthan",
    type: "Cultural",
    year: 2019,
    state: "Rajasthan",
    location: "Walled City, Jaipur, Rajasthan",
    country: "India",
    image: "https://static.toiimg.com/photo/msid-105088670,width-96,height-65.cms",
    imageCaption: "Iconic honeycomb pink sandstone facade of Hawa Mahal, Jaipur Pink City",
    gallery: [
          {
                url: "https://static.toiimg.com/photo/msid-105088670,width-96,height-65.cms",
                caption: "Hawa Mahal (Palace of Winds) with 953 honeycombed pink sandstone jharokhas"
          }
    ],
    shortNote: "Vibrant planned walled city established in 1727 featuring pink facades and Vedic grid planning.",
    description: "The fortified city of Jaipur was founded in 1727 by Maharaja Sawai Jai Singh II. Unlike traditional medieval Indian cities that evolved organically, Jaipur was laid out according to a grid plan guided by Vedic Shilpa Shastra and architectural concepts from Pandit Vidyadhar Bhattacharya. In 1876, the entire city was painted in a uniform terracotta pink wash to welcome the Prince of Wales, earning it the title 'The Pink City'.",
    address: "Walled City, Jaipur, Rajasthan 302002, India",
    latitude: 26.9124,
    longitude: 75.7873,
    significance: "An exemplary 18th-century planned city combining ancient Hindu town planning principles with vibrant Mughal-style commercial bazaar axes.",
    facts: [
      "The city is planned into nine square sectors representing the 'Navagraha' (nine astrological planets) flanked by colossal city gates.",
      "The Hawa Mahal ('Palace of Winds') features 953 honeycomb casements (jharokhas) that allowed royal ladies to observe street processions unseen.",
      "By municipal law enforced since the 19th century, buildings inside the walled city must maintain their standardized terracotta pink facade coloring."
    ]
  },
  {
    id: 39,
    name: "Kakatiya Rudreshwara (Ramappa) Temple",
    type: "Cultural",
    year: 2021,
    state: "Telangana",
    location: "Palampet, Mulugu District, Telangana",
    country: "India",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg76Fhd5kxhyphenhyphentEjvfb3dVzU2LDyu9u_4jrM_1Bmvvqz3fzq9evSlMrXtLCFv8skz0ToVJZ0ekN75jZZgdPxy1QzkfU48SN3UIVuf-A5lHHd7ThoizjW1xMygIJCyIZrwKINPDjzZm-aH2EHuY2jFn9flMEgIgVd2zvZ_FYT7GshMnjVWLwb6PBNw0KRecX_/w1200-h630-p-k-no-nu/Kakatiya-Ramappa-Temple-Becomes-World-Heritage-site.webp",
    imageCaption: "13th-century Kakatiya Ramappa Temple built with floating bricks, Telangana",
    gallery: [
          {
                url: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg76Fhd5kxhyphenhyphentEjvfb3dVzU2LDyu9u_4jrM_1Bmvvqz3fzq9evSlMrXtLCFv8skz0ToVJZ0ekN75jZZgdPxy1QzkfU48SN3UIVuf-A5lHHd7ThoizjW1xMygIJCyIZrwKINPDjzZm-aH2EHuY2jFn9flMEgIgVd2zvZ_FYT7GshMnjVWLwb6PBNw0KRecX_/w1200-h630-p-k-no-nu/Kakatiya-Ramappa-Temple-Becomes-World-Heritage-site.webp",
                caption: "Stellate carved sandstone vimana and pyramidal floating-brick shikhara"
          }
    ],
    shortNote: "13th-century Kakatiya temple built with floating bricks and carved black basalt bracket figures.",
    description: "The Rudreshwara (Ramappa) Temple is a 13th-century Shaivite sanctuary in Palampet village, Telangana, constructed during the Kakatiya dynasty under General Recharla Rudra. Situated near Ramappa lake on a six-foot star-shaped platform, the temple is constructed with porous 'floating bricks' and framed by lustrous black basalt bracket figures (Madanikas) depicting dancers and mythical beasts carved with jewel-like precision.",
    address: "Palampet, Mulugu District, Telangana 506345, India",
    latitude: 18.2600,
    longitude: 79.9400,
    significance: "A supreme technological innovation featuring an earthquake-resilient sandbox foundation and the only temple in India named after its chief sculptor, Ramappa.",
    facts: [
      "The bricks used in the temple's upper shikhar tower are so lightweight and porous that they actually float on water, reducing weight on the foundations.",
      "The temple rests on an ancient earthquake-resistant 'sandbox technique' foundation, which safely dissipated tremors during a massive earthquake in the 17th century.",
      "Persian traveler Marco Polo reportedly described the Kakatiya kingdom temples as 'the brightest stars in the galaxy of medieval temples'."
    ]
  },
  {
    id: 40,
    name: "Dholavira: A Harappan City",
    type: "Cultural",
    year: 2021,
    state: "Gujarat",
    location: "Khadir Bet, Kutch District, Gujarat",
    country: "India",
    image: "https://tse1.explicit.bing.net/th/id/OIP.XhpIyuXTKsj3eO7tg9XAJQHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Ancient Indus Valley Harappan stone water reservoirs and citadel at Dholavira",
    gallery: [
          {
                url: "https://tse1.explicit.bing.net/th/id/OIP.XhpIyuXTKsj3eO7tg9XAJQHaEn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Monumental stone-cut reservoirs and Citadel gates of the Harappan civilization"
          }
    ],
    shortNote: "Ancient Indus Valley metropolis in the Rann of Kutch renowned for its ingenious water reservoirs.",
    description: "Dholavira is an ancient Bronze Age metropolis of the Indus Valley (Harappan) Civilization located on the island of Khadir Bet in the Great Rann of Kutch, occupied from approximately 3000 to 1500 BCE. The fortified city is composed of a citadel, middle town, and lower town built of dressed stone. It features the world's most sophisticated prehistoric water harvesting system with 16 stone-cut reservoirs and storm canals.",
    address: "Khadir Bet, Bhachau Taluka, Kutch District, Gujarat 370165, India",
    latitude: 23.8860,
    longitude: 70.2170,
    significance: "The most pristine excavated Bronze Age Indus Valley city in South Asia, illustrating visionary water engineering and town planning.",
    facts: [
      "Archaeologists discovered a famous ten-letter inscription made of white gypsum paste at the northern gate, considered the world's oldest surviving billboard.",
      "The massive rock-cut water reservoirs occupied more than 30% of the total city area, collecting seasonal rainwater from the Mansar and Manhar streams.",
      "Unlike most other Harappan cities built of kiln-baked mud bricks, Dholavira was constructed almost entirely from cut sandstone blocks."
    ]
  },
  {
    id: 41,
    name: "Santiniketan",
    type: "Cultural",
    year: 2023,
    state: "West Bengal",
    location: "Bolpur, Birbhum District, West Bengal",
    country: "India",
    image: "https://www.hindustantimes.com/ht-img/img/2023/09/17/1600x900/Santiniketan-in-West-Bengal-s-Birbhum-district-_1683746835198_1694956262962.jpg",
    imageCaption: "Rabindranath Tagore's ashram abode and Upasana Griha at Santiniketan",
    gallery: [
          {
                url: "https://www.hindustantimes.com/ht-img/img/2023/09/17/1600x900/Santiniketan-in-West-Bengal-s-Birbhum-district-_1683746835198_1694956262962.jpg",
                caption: "Stained Belgian glass Upasana Griha prayer hall amidst open-air groves"
          }
    ],
    shortNote: "Nobel laureate Rabindranath Tagore's open-air ashram school and international university Visva-Bharati.",
    description: "Santiniketan was established in rural West Bengal in 1901 by poet and Nobel laureate Rabindranath Tagore as an experimental open-air residential school, which blossomed into the global university Visva-Bharati in 1921. Reimagining education away from rigid colonial pedagogy, classes are conducted outdoors under shady banyan and sal trees, integrating fine arts, craft, music, and pan-Asian philosophical humanism.",
    address: "Santiniketan, Bolpur, Birbhum District, West Bengal 731235, India",
    latitude: 23.6800,
    longitude: 87.6800,
    significance: "A pioneering residential open-air educational haven embodying Tagore's internationalist philosophy of universal human harmony and nature-based art.",
    facts: [
      "Tagore established the university's motto as 'Yatra Visvam Bhavatyekanidam' ('Where the world makes a home in a single nest').",
      "Celebrated Indian painter Nandalal Bose, sculptor Ramkinkar Baij, and filmmaker Satyajit Ray studied and created pioneering modern art here.",
      "Students continue to attend daily classes sitting on woven mats under the open canopy of trees in natural communion with the seasons."
    ]
  },
  {
    id: 42,
    name: "Sacred Ensembles of the Hoysalas",
    type: "Cultural",
    year: 2023,
    state: "Karnataka",
    location: "Belur, Halebidu & Somanathapura, Karnataka",
    country: "India",
    image: "https://assets.cntraveller.in/photos/650c1f1932e526278a0fdce2/16:9/w_1024%2Cc_limit/GettyImages-1410729674.jpg",
    imageCaption: "Intricately carved stellate sanctum of Chennakeshava Temple, Belur (Hoysala)",
    gallery: [
          {
                url: "https://assets.cntraveller.in/photos/650c1f1932e526278a0fdce2/16:9/w_1024%2Cc_limit/GettyImages-1410729674.jpg",
                caption: "Star-shaped Chennakeshava Temple at Belur adorned with intricate soapstone friezes"
          }
    ],
    shortNote: "12th to 13th-century stellate star-shaped temples of Belur, Halebidu, and Somanathapura.",
    description: "The Sacred Ensembles of the Hoysalas comprise three masterly 12th and 13th-century temple complexes in southern Karnataka: the Chennakeshava Temple at Belur, the Hoysaleshwara Temple at Halebidu, and the Keshava Temple at Somanathapura. Built from soft chloritic schist (soapstone) on stellate star-shaped platforms, the temples feature layered friezes of marching elephants, charging cavalry, mythological beasts, and celestial dancers.",
    address: "Temple Road, Belur, Hassan District, Karnataka 573115, India",
    latitude: 13.1620,
    longitude: 75.8590,
    significance: "The absolute zenith of soapstone sculptural detailing and star-plan stellate temple architecture in South Indian history.",
    facts: [
      "Unlike most ancient Indian temples where sculptors remained anonymous, Hoysala master artisans like Jakanachari and Ruvari Mallitamma proudly signed their names on their carvings.",
      "The soapstone was soft when freshly quarried, allowing sculptors to chisel intricate undercut jewelry, lace-like drapery, and fingernails before the stone hardened with air exposure.",
      "The base friezes feature hundreds of carved elephants wrapping around the temple perimeter, with no two elephants sharing identical postures or ornamentation."
    ]
  },
  {
    id: 43,
    name: "Moidams – the Mound-Burial System of the Ahom Dynasty",
    type: "Cultural",
    year: 2024,
    state: "Assam",
    location: "Charaideo, Sibsagar District, Assam",
    country: "India",
    image: "https://tse1.mm.bing.net/th/id/OIP.q6TCC9FmtN0gGnYXroTSowHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    imageCaption: "Charaideo royal earthen burial mound (maidam) of the Ahom dynasty, Assam",
    gallery: [
          {
                url: "https://tse1.mm.bing.net/th/id/OIP.q6TCC9FmtN0gGnYXroTSowHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
                caption: "Sacred royal burial tumuli of the 600-year Tai-Ahom dynasty at Charaideo"
          }
    ],
    shortNote: "Royal earthen burial mounds of the Ahom kings and queens in Charaideo, the Pyramids of Assam.",
    description: "The Moidams at Charaideo in eastern Assam are the vaulted earthen tumuli burial mounds of the royal rulers of the Tai-Ahom dynasty, who reigned over the Brahmaputra Valley for 600 years (1228–1826 CE). Resembling the pyramids of ancient Egypt and imperial tumuli of China, each Moidam contains a vaulted brick-and-stone underground chamber (Chow-Chali) covered by a hemispherical earthen hillock.",
    address: "Charaideo, Sibsagar District, Assam 785690, India",
    latitude: 26.9440,
    longitude: 94.8690,
    significance: "The first cultural World Heritage site from Northeast India, representing 600 years of unique Tai-Ahom mortuary architecture and ancestor reverence.",
    facts: [
      "The site preserves 90 royal burial mounds across the hills of Charaideo, which was the first capital established by King Chao Lung Siu-Ka-Pha in 1253 CE.",
      "The deceased monarchs were entombed along with royal paraphernal items, ivory, gold ornaments, weapons, and provisions for their journey into the spirit world.",
      "The mounds range from modest hillocks to massive stepped earthen domes rising several storeys high."
    ]
  },
  {
    id: 44,
    name: "Jaipur Amber Fort (Part of Hill Forts of Rajasthan)",
    type: "Cultural",
    year: 2013,
    state: "Rajasthan",
    location: "Amer, Jaipur, Rajasthan",
    country: "India",
    image: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/7c/4d/f6.jpg",
    imageCaption: "Amber Fort palace ramparts reflecting upon Maota Lake in Jaipur",
    gallery: [
          {
                url: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/7c/4d/f6.jpg",
                caption: "Amer Fort perched on the Aravalli hills reflecting upon Maota Lake"
          }
    ],
    shortNote: "Amer Fort perched on the Cheel ka Teela hill, famous for Sheesh Mahal (Mirror Palace).",
    description: "Amer Fort (Amber Fort) sits high atop Cheel ka Teela (Hill of Eagles) overlooking the tranquil waters of Maota Lake, 11 kilometers north of Jaipur. Constructed in yellow and pink sandstone by Raja Man Singh I in 1592, the fort encloses courtyard after courtyard of Rajput and Mughal palace artistry, highlighted by the Sheesh Mahal (Hall of Mirrors), Sukh Niwas water-cooled chambers, and the monumental Ganesh Pol gateway.",
    address: "Devi Singh Pura, Amer, Jaipur, Rajasthan 302001, India",
    latitude: 26.9855,
    longitude: 75.8513,
    significance: "A magnificent confluence of rugged Rajput defensive battlements and opulent Indo-Islamic palace interiors.",
    facts: [
      "The Sheesh Mahal (Mirror Palace) is encrusted with convex Belgian glass mirror mosaics; when a single candle is lit, the reflection mimics a star-filled night sky.",
      "A hidden underground tunnel connects Amer Fort to Jaigarh Fort on the higher cliff above, intended as an escape route during sieges.",
      "The Sukh Niwas palace utilized an ingenious medieval air-conditioning system where breezes were chilled by passing over channels of cold spring water."
    ]
  },
  {
    id: 45,
    name: "Jaisalmer Fort (Part of Hill Forts of Rajasthan)",
    type: "Cultural",
    year: 2013,
    state: "Rajasthan",
    location: "Jaisalmer, Thar Desert, Rajasthan",
    country: "India",
    image: "https://www.travelaroundtheworldblog.com/wp-content/uploads/2025/03/jaisalmer-fort.png",
    imageCaption: "Sonar Qila (Golden Fort) yellow sandstone citadel in the Thar Desert, Jaisalmer",
    gallery: [
          {
                url: "https://www.travelaroundtheworldblog.com/wp-content/uploads/2025/03/jaisalmer-fort.png",
                caption: "Sonar Qila sandstone bastions rising out of the sand dunes of Jaisalmer"
          }
    ],
    shortNote: "The golden living fort rising from the Thar Desert sands, housing thousands of residents.",
    description: "Jaisalmer Fort, celebrated in folklore as 'Sonar Qila' (The Golden Fort), rises dramatically like a golden mirage from the sandy plains of the Thar Desert on Trikuta Hill. Founded in 1156 CE by the Rajput king Rawal Jaisal, it is one of the world's very few surviving 'living forts', with approximately 4,000 residents living inside its 99 defensive bastions, historic havelis, and medieval Jain temples.",
    address: "Fort Road, Khejer Para, Manak Chowk, Jaisalmer, Rajasthan 345001, India",
    latitude: 26.9124,
    longitude: 70.9126,
    significance: "A living desert fortress town on the ancient Silk Road caravan trade route, constructed entirely without mortar from yellow sandstone.",
    facts: [
      "The yellow sandstone walls appear tawny lion-gold during midday and turn into deep honey-amber as the desert sun sets.",
      "The fort's houses and temples were assembled using interlocking sandstone blocks without a single ounce of cement or mortar.",
      "The seven medieval Jain temples inside the fort house rare 12th-century palm-leaf manuscripts and exquisite stone carvings of tirthankaras."
    ]
  }
];

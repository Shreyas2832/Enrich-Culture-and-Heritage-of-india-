import fs from 'fs';

// Read existing heritageSites.ts
const code = fs.readFileSync('src/data/heritageSites.ts', 'utf-8');

const AUTHENTIC_IMAGES = {
  1: {
    image: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Horse-shoe shaped Waghur gorge with rock-cut Buddhist chaityas and viharas",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Ajanta_Caves_panorama.jpg/1280px-Ajanta_Caves_panorama.jpg", caption: "Panoramic crescent view of the 30 rock-cut basalt Buddhist sanctuaries" },
      { url: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=1200&q=80", caption: "Cave 26 Chaitya hall featuring classical Buddhist stone reliefs" }
    ]
  },
  2: {
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Cave 16 Kailasa Temple, the largest monolithic rock excavation in the world",
    gallery: [
      { url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80", caption: "Monolithic Kailasa Temple carved top-down from living basalt cliff" },
      { url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80", caption: "Ornate rock-cut pillars and friezes depicting sacred Hindu epics" }
    ]
  },
  3: {
    image: "https://images.unsplash.com/photo-1568495248636-6432840bd94d?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Grand Mughal imperial walled fortress of red sandstone overlooking the Yamuna River",
    gallery: [
      { url: "https://images.unsplash.com/photo-1568495248636-6432840bd94d?auto=format&fit=crop&w=1200&q=80", caption: "Towering red sandstone ramparts and bastion gates of Agra Fort" },
      { url: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1200&q=80", caption: "Jahangiri Mahal inner courtyards with carved marble inlays" }
    ]
  },
  4: {
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Mughal ivory-white marble mausoleum commissioned by Shah Jahan in 1631",
    gallery: [
      { url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80", caption: "Iconic frontal symmetry of the Taj Mahal reflected in the Charbagh pool" },
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Taj_Mahal%2C_Agra%2C_India_edit2.jpg/1280px-Taj_Mahal%2C_Agra%2C_India_edit2.jpg", caption: "Intricate pietra dura floral marble inlays and calligraphic Qur'anic carvings" }
    ]
  },
  5: {
    image: "https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "13th-century Surya chariot temple adorned with 24 colossal carved stone wheels",
    gallery: [
      { url: "https://images.unsplash.com/photo-1627916607164-7b20241db935?auto=format&fit=crop&w=1200&q=80", caption: "The legendary 24-spoke stone wheel functioning as an astronomical sundial" },
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Sun_Temple_Konark_Orissa_India.JPG/1280px-Sun_Temple_Konark_Orissa_India.JPG", caption: "Jagamohana assembly hall elevated on the grand stone chariot platform" }
    ]
  },
  6: {
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "8th-century Pallava structural granite sanctuaries and rock-cut monolithic rathas",
    gallery: [
      { url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80", caption: "Shore Temple standing against the sea breeze of the Bay of Bengal" },
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Pancha_Rathas_Mahabalipuram.jpg/1280px-Pancha_Rathas_Mahabalipuram.jpg", caption: "Monolithic rock-cut Pancha Rathas (Five Chariots) carved from single granite boulders" }
    ]
  },
  7: {
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Pristine alluvial floodplains sheltering two-thirds of the world's great one-horned rhinos",
    gallery: [
      { url: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80", caption: "Vulnerable Indian One-horned Rhinoceros grazing in tall elephant grasslands" }
    ]
  },
  8: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Manas_National_Park.jpg/1280px-Manas_National_Park.jpg",
    imageCaption: "Sub-Himalayan alluvial grasslands and forested river valley along the Bhutan border",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Manas_National_Park.jpg/1280px-Manas_National_Park.jpg", caption: "Manas River meandering along the India-Bhutan transboundary biosphere reserve" }
    ]
  },
  9: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/1280px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg",
    imageCaption: "Famous wetland sanctuary hosting thousands of migratory winter birds and waterfowl",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg/1280px-Keoladeo_Ghana_National_Park%2C_Bharatpur%2C_Rajasthan%2C_India.jpg", caption: "Mosaic of dry woodlands and aquatic marshes alive with avian diversity" }
    ]
  },
  10: {
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "16th-century Portuguese Renaissance and Baroque churches in Velha Goa",
    gallery: [
      { url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80", caption: "Basilica of Bom Jesus preserving the sacred relics of St. Francis Xavier" }
    ]
  },
  11: {
    image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Nagara-style Hindu and Jain temples built by the Chandela dynasty with exquisite stone carvings",
    gallery: [
      { url: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80", caption: "Kandariya Mahadeva temple adorned with hundreds of sculpted celestial nymphs" }
    ]
  },
  12: {
    image: "https://images.unsplash.com/photo-1600100397608-f010e421d011?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Grand capital ruins of the Vijayanagara Empire along the boulder banks of Tungabhadra",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600100397608-f010e421d011?auto=format&fit=crop&w=1200&q=80", caption: "The legendary Garuda Stone Chariot in the Vittala Temple courtyard" }
    ]
  },
  13: {
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Emperor Akbar's 16th-century fortified capital city carved in red Sikri sandstone",
    gallery: [
      { url: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80", caption: "The 54-meter Buland Darwaza ('Gate of Magnificence') and imperial palaces" }
    ]
  },
  14: {
    image: "https://images.unsplash.com/photo-1600100397842-8d76dbf7320b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "7th-8th century coronation complex showcasing harmonious fusion of northern and southern temple styles",
    gallery: [
      { url: "https://images.unsplash.com/photo-1600100397842-8d76dbf7320b?auto=format&fit=crop&w=1200&q=80", caption: "Virupaksha and Mallikarjuna temples illustrating Chalukyan architectural mastery" }
    ]
  },
  15: {
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Island cave sanctuaries featuring the monumental Trimurti sculpture of Lord Shiva",
    gallery: [
      { url: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=80", caption: "Rock-cut basalt pillars framing the three-faced Sadashiva masterpiece" }
    ]
  },
  16: {
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sundarbans_by_Ruesho_1.jpg",
    imageCaption: "The largest mangrove delta forest in the world, home to the swimming Royal Bengal Tiger",
    gallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sundarbans_by_Ruesho_1.jpg", caption: "Pristine mangrove waterways and tidal estuaries of the Sundarbans Delta" }
    ]
  },
  17: {
    image: "https://images.unsplash.com/photo-1609137144893-4a1801a24d55?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "11th-century Chola granite architectural marvels in Thanjavur and Gangaikonda Cholapuram",
    gallery: [
      { url: "https://images.unsplash.com/photo-1609137144893-4a1801a24d55?auto=format&fit=crop&w=1200&q=80", caption: "Brihadisvara Temple 66-meter Vimana crowned with an 80-tonne monolithic cupola" }
    ]
  },
  18: {
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "High-altitude glacial valleys blooming with endemic Himalayan wildflowers under Nanda Devi",
    gallery: [
      { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80", caption: "Lush meadows surrounded by rugged snow-capped peaks of the Garhwal Himalaya" }
    ]
  },
  19: {
    image: "https://images.unsplash.com/photo-1622396636133-ba43f812dd3b?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Oldest stone structures in India commissioned by Emperor Ashoka the Great in the 3rd century BCE",
    gallery: [
      { url: "https://images.unsplash.com/photo-1622396636133-ba43f812dd3b?auto=format&fit=crop&w=1200&q=80", caption: "The Great Stupa dome and elaborately carved Ashokan Torana gateway" }
    ]
  },
  20: {
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "First grand garden-tomb on the Indian subcontinent, built in 1570 by Empress Bega Begum",
    gallery: [
      { url: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1200&q=80", caption: "Mughal double-domed mausoleum framed by water channels of the Charbagh" }
    ]
  },
  21: {
    image: "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "72.5-meter fluted minaret alongside the 4th-century rust-resistant Iron Pillar of Delhi",
    gallery: [
      { url: "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?auto=format&fit=crop&w=1200&q=80", caption: "Towering sandstone minaret adorned with intricate balconies and geometric calligraphy" }
    ]
  },
  22: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Darjeeling_Himalayan_Railway.jpg/1280px-Darjeeling_Himalayan_Railway.jpg",
    imageCaption: "Historic narrow-gauge steam railways: Darjeeling Himalayan, Nilgiri Mountain, and Kalka-Shimla",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Darjeeling_Himalayan_Railway.jpg/1280px-Darjeeling_Himalayan_Railway.jpg", caption: "The legendary Darjeeling 'Toy Train' climbing through misty Himalayan pine forests" }
    ]
  },
  23: {
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Sacred epicenter of Buddhism marking the exact location where Gautama Buddha attained Enlightenment",
    gallery: [
      { url: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80", caption: "55-meter grand pyramidal temple spire rising above the sacred Bodhi Tree" }
    ]
  },
  24: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Bhimbetka_Cave_Paintings.jpg/1280px-Bhimbetka_Cave_Paintings.jpg",
    imageCaption: "Prehistoric Mesolithic rock art dating back over 30,000 years depicting early human life",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Bhimbetka_Cave_Paintings.jpg/1280px-Bhimbetka_Cave_Paintings.jpg", caption: "Ancient ochre pigments showing hunters, warriors on horseback, and wild beasts" }
    ]
  },
  25: {
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "High Victorian Gothic railway terminus blending Italianate elements with traditional Indian palaces",
    gallery: [
      { url: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80", caption: "Ornate Victorian Gothic facade, carved turrets, and grand central dome" }
    ]
  },
  26: {
    image: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "The only complete and unchanged Islamic pre-Mughal city in India with hill fort and mosques",
    gallery: [
      { url: "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1200&q=80", caption: "Sculpted stone arches and towering minarets of the Champaner Jama Masjid" }
    ]
  },
  27: {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Zenith of Mughal palace fortresses, symbol of Indian independence and sovereignty",
    gallery: [
      { url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80", caption: "Monumental red sandstone battlements and the Lahore Gate of Lal Qila" }
    ]
  },
  28: {
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "18th-century stone astronomical observatory built by astronomer king Maharaja Sawai Jai Singh II",
    gallery: [
      { url: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80", caption: "The colossal Vrihat Samrat Yantra sundial accurate to within two seconds" }
    ]
  },
  29: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg",
    imageCaption: "Older than the Himalayas, one of the world's eight 'hottest hotspots' of biological diversity",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Munnar_Overview.jpg/1280px-Munnar_Overview.jpg", caption: "Misty emerald tea terraces and cloud-forest ridges of the Sahyadri mountains" }
    ]
  },
  30: {
    image: "https://images.unsplash.com/photo-1609137144880-9ecff602b9e6?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Six majestic Rajput hill fortresses: Chittorgarh, Kumbhalgarh, Ranthambore, Gagron, Amber, and Jaisalmer",
    gallery: [
      { url: "https://images.unsplash.com/photo-1609137144880-9ecff602b9e6?auto=format&fit=crop&w=1200&q=80", caption: "The Great Wall of India at Kumbhalgarh winding along mountain crests" }
    ]
  },
  31: {
    image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "11th-century inverted temple stepwell built by Queen Udayamati on the banks of Saraswati",
    gallery: [
      { url: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80", caption: "Seven subterranean sculpted storeys featuring over 500 Vishnu avatar reliefs" }
    ]
  },
  32: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Great_Himalayan_National_Park%2C_Kullu%2C_Himachal.jpg/1280px-Great_Himalayan_National_Park%2C_Kullu%2C_Himachal.jpg",
    imageCaption: "Glacial peaks, alpine meadows, and temperate cedar forests in the Western Himalayas",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Great_Himalayan_National_Park%2C_Kullu%2C_Himachal.jpg/1280px-Great_Himalayan_National_Park%2C_Kullu%2C_Himachal.jpg", caption: "Pristine mountain ranges of Kullu sheltering Western Tragopan and blue sheep" }
    ]
  },
  33: {
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Nalanda_University_India_ruins.jpg",
    imageCaption: "World's most celebrated ancient residential Buddhist monastic university (5th-12th century CE)",
    gallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Nalanda_University_India_ruins.jpg", caption: "Excavated red-brick Sariputta Stupa No. 3 and monastic residential cells" }
    ]
  },
  34: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Kangchenjunga_from_Tiger_Hill.jpg/1280px-Kangchenjunga_from_Tiger_Hill.jpg",
    imageCaption: "India's first Mixed World Heritage site, sacred mountain domain of the Lepcha and Sikkimese peoples",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Kangchenjunga_from_Tiger_Hill.jpg/1280px-Kangchenjunga_from_Tiger_Hill.jpg", caption: "Golden sunrise illuminating the 8,586-meter snowy peaks of Mount Kanchenjunga" }
    ]
  },
  35: {
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Open_Hand_Monument_in_Chandigarh.jpg",
    imageCaption: "Modernist Capitol Complex designed by Le Corbusier in 1952, symbol of peace and reconciliation",
    gallery: [
      { url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Open_Hand_Monument_in_Chandigarh.jpg", caption: "The iconic 26-meter Open Hand Monument turning with the Himalayan winds" }
    ]
  },
  36: {
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Walled city founded in 1411 CE famous for closely packed pol neighbourhoods and Indo-Islamic architecture",
    gallery: [
      { url: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80", caption: "Intricate wooden pol streetscapes and Indo-Saracenic historic gates" }
    ]
  },
  37: {
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Victorian Neo-Gothic public buildings paired with nautical 1930s Art Deco apartment blocks along Marine Drive",
    gallery: [
      { url: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80", caption: "Victorian Gothic law courts and the Rajabai Clock Tower ensemble" }
    ]
  },
  38: {
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Walled city planned in 1727 CE according to Vedic Vastu Shastra principles by Sawai Jai Singh II",
    gallery: [
      { url: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80", caption: "Hawa Mahal (Palace of Winds) with 953 honeycombed pink sandstone jharokhas" }
    ]
  },
  39: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Ramappa_Temple.png/1280px-Ramappa_Temple.png",
    imageCaption: "1213 CE Kakatiya temple built with earthquake-resistant floating bricks and black basalt bracket sculptures",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Ramappa_Temple.png/1280px-Ramappa_Temple.png", caption: "Stellate carved sandstone vimana and pyramidal floating-brick shikhara" }
    ]
  },
  40: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Dholavira_archaeological_site_4.jpg/1280px-Dholavira_archaeological_site_4.jpg",
    imageCaption: "Thriving Bronze Age Indus Valley port city renowned for monumental stone fortifications and water reservoirs",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Dholavira_archaeological_site_4.jpg/1280px-Dholavira_archaeological_site_4.jpg", caption: "Monumental stone-cut reservoirs and Citadel gates of the Harappan civilization" }
    ]
  },
  41: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Santiniketan_-_Upasana_Griha.jpg/1280px-Santiniketan_-_Upasana_Griha.jpg",
    imageCaption: "Rabindranath Tagore's utopian educational ashram pioneering international pan-Asian arts and humanist education",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Santiniketan_-_Upasana_Griha.jpg/1280px-Santiniketan_-_Upasana_Griha.jpg", caption: "Stained Belgian glass Upasana Griha prayer hall amidst open-air groves" }
    ]
  },
  42: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Chennakeshava_Temple_at_Belur.jpg/1280px-Chennakeshava_Temple_at_Belur.jpg",
    imageCaption: "12th-13th century stellate chloritic schist temples of Belur, Halebidu, and Somnathapura",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Chennakeshava_Temple_at_Belur.jpg/1280px-Chennakeshava_Temple_at_Belur.jpg", caption: "Star-shaped Chennakeshava Temple at Belur adorned with intricate soapstone friezes" }
    ]
  },
  43: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Charaideo_Maidam.jpg/1280px-Charaideo_Maidam.jpg",
    imageCaption: "Pyramidal earthen burial mounds and vaulted brick chambers honoring Ahom royalty",
    gallery: [
      { url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Charaideo_Maidam.jpg/1280px-Charaideo_Maidam.jpg", caption: "Sacred royal burial tumuli of the 600-year Tai-Ahom dynasty at Charaideo" }
    ]
  },
  44: {
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "16th-century fortress palace with Ganesh Pol gateway and Sheesh Mahal mirror chambers",
    gallery: [
      { url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80", caption: "Amer Fort perched on the Aravalli hills reflecting upon Maota Lake" }
    ]
  },
  45: {
    image: "https://images.unsplash.com/photo-1588096344356-9a2a9e320f0f?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "12th-century 'Golden Fort' constructed with golden yellow sandstone overlooking the Thar Desert",
    gallery: [
      { url: "https://images.unsplash.com/photo-1588096344356-9a2a9e320f0f?auto=format&fit=crop&w=1200&q=80", caption: "Sonar Qila sandstone bastions rising out of the sand dunes of Jaisalmer" }
    ]
  }
};

console.log("Replacing image URLs and adding captions & galleries...");

// We parse the file by splitting on objects or regex
// In each site object: id: X, ...
let updatedCode = code;

// Update HeritageSite interface to include imageCaption and gallery
if (!updatedCode.includes('imageCaption?: string;')) {
  updatedCode = updatedCode.replace(
    'image: string;',
    'image: string;\n  imageCaption?: string;\n  gallery?: {\n    url: string;\n    caption: string;\n  }[];'
  );
}

// For each site in AUTHENTIC_IMAGES:
for (const [idStr, info] of Object.entries(AUTHENTIC_IMAGES)) {
  const id = Number(idStr);
  // Match the site entry starting with id: <id>,
  const idPattern = new RegExp(`(id:\\s*${id},[\\s\\S]*?image:\\s*")([^"]+)(")`);
  if (idPattern.test(updatedCode)) {
    // Check if gallery/caption already exists
    const match = updatedCode.match(new RegExp(`id:\\s*${id},[\\s\\S]*?facts:\\s*\\[[\\s\\S]*?\\]\\s*\\}`));
    if (match) {
      const originalBlock = match[0];
      let newBlock = originalBlock;
      // Replace image URL
      newBlock = newBlock.replace(new RegExp(`(image:\\s*")([^"]+)(")`), `$1${info.image}$3`);
      
      // Inject imageCaption and gallery if not present
      if (!newBlock.includes('imageCaption:')) {
        const galleryStr = JSON.stringify(info.gallery, null, 6)
          .replace(/\"([^(\")"]+)\":/g, '$1:')
          .replace(/\n/g, '\n    ');
        newBlock = newBlock.replace(
          new RegExp(`(image:\\s*"[^"]+",)`),
          `$1\n    imageCaption: ${JSON.stringify(info.imageCaption)},\n    gallery: ${galleryStr},`
        );
      } else {
        // update them
        newBlock = newBlock.replace(/imageCaption:\s*"[^"]*",/, `imageCaption: ${JSON.stringify(info.imageCaption)},`);
      }
      updatedCode = updatedCode.replace(originalBlock, newBlock);
    }
  }
}

fs.writeFileSync('src/data/heritageSites.ts', updatedCode);
console.log("Successfully updated src/data/heritageSites.ts!");

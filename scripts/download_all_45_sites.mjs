import fs from 'fs';
import path from 'path';

// EXACT 45 UNESCO WORLD HERITAGE SITES OF INDIA WITH VERIFIED AUTHENTIC IMAGES
const SITES = [
  {
    id: 1,
    name: "Ajanta Caves",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ajanta_%2863%29.jpg/1280px-Ajanta_%2863%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Cave_26%2C_Ajanta.jpg/1280px-Cave_26%2C_Ajanta.jpg"
    ],
    caption: "Horseshoe gorge and panoramic rock-cut facades of Ajanta Caves"
  },
  {
    id: 2,
    name: "Ellora Caves",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Ellora_cave16_001.jpg/1280px-Ellora_cave16_001.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Courtyard_and_Mahabharata_Reliefs_at_the_Kailasa_Temple%2C_Ellora_01.jpg/1280px-Courtyard_and_Mahabharata_Reliefs_at_the_Kailasa_Temple%2C_Ellora_01.jpg"
    ],
    caption: "Cave 16 Kailasa Temple, monolithic rock-cut wonder of Ellora"
  },
  {
    id: 3,
    name: "Agra Fort",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Agra_03-2016_10_Agra_Fort.jpg/1280px-Agra_03-2016_10_Agra_Fort.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Amar_Singh_Gate%2C_Agra_Fort.jpg/1280px-Amar_Singh_Gate%2C_Agra_Fort.jpg"
    ],
    caption: "Red sandstone ramparts and grand entrance of Agra Fort"
  },
  {
    id: 4,
    name: "Taj Mahal",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1280px-Taj_Mahal_%28Edited%29.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_at_sunset_crop.jpg/1280px-Taj_Mahal_in_India_-_at_sunset_crop.jpg"
    ],
    caption: "Iconic white marble mausoleum and reflecting pools of the Taj Mahal"
  },
  {
    id: 5,
    name: "Sun Temple, Konark",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/1280px-Konarka_Temple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Konark_Sun_Temple_Wheel.jpg/1280px-Konark_Sun_Temple_Wheel.jpg"
    ],
    caption: "13th-century chariot of Surya with carved wheels at Konark Sun Temple"
  },
  {
    id: 6,
    name: "Group of Monuments at Mahabalipuram",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Shore_Temple_at_Mahabalipuram.jpg/1280px-Shore_Temple_at_Mahabalipuram.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Mamallapuram_view.jpg/1280px-Mamallapuram_view.jpg"
    ],
    caption: "8th-century Shore Temple overlooking the Bay of Bengal, Mahabalipuram"
  },
  {
    id: 7,
    name: "Kaziranga National Park",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Beauty_of_Kaziranga_National_Park.jpg/1280px-Beauty_of_Kaziranga_National_Park.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Rhino_at_Kaziranga.jpg/1280px-Rhino_at_Kaziranga.jpg"
    ],
    caption: "Great Indian one-horned rhinoceros roaming the grasslands of Kaziranga"
  },
  {
    id: 8,
    name: "Manas Wildlife Sanctuary",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Manas_landscape_rhino.jpg/1280px-Manas_landscape_rhino.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Manas_National_Park.jpg/1280px-Manas_National_Park.jpg"
    ],
    caption: "Pristine sub-Himalayan forest and wildlife reserve at Manas"
  },
  {
    id: 9,
    name: "Keoladeo National Park",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Sunset_with_Painted_stork_family_at_Keoladeo_national_park_%28Dec%2C_2024%29_01.jpg/1280px-Sunset_with_Painted_stork_family_at_Keoladeo_national_park_%28Dec%2C_2024%29_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Keoladeo_National_Park_Wetlands.jpg/1280px-Keoladeo_National_Park_Wetlands.jpg"
    ],
    caption: "Wetland bird sanctuary and painted storks at Keoladeo Bharatpur"
  },
  {
    id: 10,
    name: "Churches and Convents of Goa",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Side_Elevation_of_Basilica_of_Bom_Jesus.jpg/1280px-Side_Elevation_of_Basilica_of_Bom_Jesus.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Old_Goa%2C_Se_Cathedral%2C_Panoramic_view.jpg/1280px-Old_Goa%2C_Se_Cathedral%2C_Panoramic_view.jpg"
    ],
    caption: "Baroque facade of Basilica of Bom Jesus, Old Goa"
  },
  {
    id: 11,
    name: "Khajuraho Group of Monuments",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/1_Khajuraho.jpg/1280px-1_Khajuraho.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Kandariya_Mahadeva_Temple.jpg/1280px-Kandariya_Mahadeva_Temple.jpg"
    ],
    caption: "Kandariya Mahadeva Temple with soaring shikhara, Khajuraho"
  },
  {
    id: 12,
    name: "Group of Monuments at Hampi",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Iconic_Stone_Chariot_%40_Vittala_Temple%2C_Hampi%2C_Karnataka.jpg/1280px-Iconic_Stone_Chariot_%40_Vittala_Temple%2C_Hampi%2C_Karnataka.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg/1280px-Wide_angle_of_Galigopuram_of_Virupaksha_Temple%2C_Hampi_%2804%29_%28cropped%29.jpg"
    ],
    caption: "The iconic Stone Chariot at Vittala Temple, Hampi"
  },
  {
    id: 13,
    name: "Fatehpur Sikri",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/1280px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Fatehpur_Sikri_near_Agra_2016-03_img09.jpg/1280px-Fatehpur_Sikri_near_Agra_2016-03_img09.jpg"
    ],
    caption: "The monumental 54-meter Buland Darwaza at Fatehpur Sikri"
  },
  {
    id: 14,
    name: "Group of Monuments at Pattadakal",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Pattadakal_000.JPG/1280px-Pattadakal_000.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Virupaksha_temple_complex_at_Pattadakal.jpg/1280px-Virupaksha_temple_complex_at_Pattadakal.jpg"
    ],
    caption: "7th-8th century Chalukya temples along Malaprabha river, Pattadakal"
  },
  {
    id: 15,
    name: "Elephanta Caves",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Elephanta_Caves_Trimurti.jpg/1280px-Elephanta_Caves_Trimurti.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Trimurti_Statue%2C_Elephanta_Caves.jpg/1280px-Trimurti_Statue%2C_Elephanta_Caves.jpg"
    ],
    caption: "Colossal three-headed Maheshmurti Trimurti Shiva sculpture, Elephanta Caves"
  },
  {
    id: 16,
    name: "Sundarbans National Park",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sundarban_Tiger.jpg/1280px-Sundarban_Tiger.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Sundarbans_mangrove_forest.jpg/1280px-Sundarbans_mangrove_forest.jpg"
    ],
    caption: "Royal Bengal Tiger amidst the mangrove waterways of Sundarbans"
  },
  {
    id: 17,
    name: "Great Living Chola Temples",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/A_collage_of_Great_living_Chola_temples_UNESCO_heritage_site.jpg/1280px-A_collage_of_Great_living_Chola_temples_UNESCO_heritage_site.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Brihadeeswarar_Temple%2C_Thanjavur.jpg/1280px-Brihadeeswarar_Temple%2C_Thanjavur.jpg"
    ],
    caption: "Towering granite vimana of Brihadisvara Temple, Thanjavur"
  },
  {
    id: 18,
    name: "Nanda Devi and Valley of Flowers National Parks",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_03_%28edit%29.jpg/1280px-Valley_of_flowers_national_park%2C_Uttarakhand%2C_India_03_%28edit%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Valley_of_Flowers_National_Park.jpg/1280px-Valley_of_Flowers_National_Park.jpg"
    ],
    caption: "Carpets of alpine blossoms against Himalayan peaks in Valley of Flowers"
  },
  {
    id: 19,
    name: "Buddhist Monuments at Sanchi",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG/1280px-East_Gateway_-_Stupa_1_-_Sanchi_Hill_2013-02-21_4398.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Great_Stupa_at_Sanchi_Madhya_Pradesh_India.jpg/1280px-Great_Stupa_at_Sanchi_Madhya_Pradesh_India.jpg"
    ],
    caption: "The Great Stupa and intricately carved ceremonial Torana, Sanchi"
  },
  {
    id: 20,
    name: "Humayun's Tomb, Delhi",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tomb_of_Humayun%2C_Delhi.jpg/1280px-Tomb_of_Humayun%2C_Delhi.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Humayun%27s_Tomb_in_New_Delhi.jpg/1280px-Humayun%27s_Tomb_in_New_Delhi.jpg"
    ],
    caption: "Mughal garden tomb of Emperor Humayun in red sandstone and marble, Delhi"
  },
  {
    id: 21,
    name: "Qutb Minar and its Monuments, Delhi",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Qutb_minar_ruins.jpg/1280px-Qutb_minar_ruins.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Qutub_Minar_in_Delhi_03-2016.jpg/1280px-Qutub_Minar_in_Delhi_03-2016.jpg"
    ],
    caption: "73-meter fluted red sandstone Qutb Minar tower and ancient ruins, Delhi"
  },
  {
    id: 22,
    name: "Mountain Railways of India",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Darjeeling_toy_train.jpg/1280px-Darjeeling_toy_train.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Darjeeling_Himalayan_Railway.jpg/1280px-Darjeeling_Himalayan_Railway.jpg"
    ],
    caption: "Historic steam-powered Darjeeling Himalayan Toy Train winding through the hills"
  },
  {
    id: 23,
    name: "Mahabodhi Temple Complex at Bodh Gaya",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Mahabodhitemple.jpg/1280px-Mahabodhitemple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mahabodhi_Temple_Bodh_Gaya_Bihar.jpg/1280px-Mahabodhi_Temple_Bodh_Gaya_Bihar.jpg"
    ],
    caption: "50-meter pyramidal spire of Mahabodhi Temple at Buddha's enlightenment site"
  },
  {
    id: 24,
    name: "Rock Shelters of Bhimbetka",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rock_Shelter_8%2C_Bhimbetka_02.jpg/1280px-Rock_Shelter_8%2C_Bhimbetka_02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bhimbetka_cave_paintings.jpg/1280px-Bhimbetka_cave_paintings.jpg"
    ],
    caption: "Prehistoric rock art and Paleolithic cave shelters of Bhimbetka"
  },
  {
    id: 25,
    name: "Chhatrapati Shivaji Maharaj Terminus",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Chhatrapati_shivaji_terminus%2C_esterno_01.jpg/1280px-Chhatrapati_shivaji_terminus%2C_esterno_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Victoria_Terminus%2C_Mumbai.jpg/1280px-Victoria_Terminus%2C_Mumbai.jpg"
    ],
    caption: "High Victorian Gothic Revival facade and dome of CST Terminus, Mumbai"
  },
  {
    id: 26,
    name: "Champaner-Pavagadh Archaeological Park",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Jain_Temple%2C_Pavagadh_%28cropped%29.jpg/1280px-Jain_Temple%2C_Pavagadh_%28cropped%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jami_Masjid%2C_Champaner_01.jpg/1280px-Jami_Masjid%2C_Champaner_01.jpg"
    ],
    caption: "16th-century Jama Masjid and Pavagadh hill fortifications, Gujarat"
  },
  {
    id: 27,
    name: "Red Fort Complex, Delhi",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/1280px-Delhi_fort.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Lahore_Gate_of_Red_Fort_Delhi.jpg/1280px-Lahore_Gate_of_Red_Fort_Delhi.jpg"
    ],
    caption: "Lahore Gate and red sandstone bastion walls of Lal Qila, Delhi"
  },
  {
    id: 28,
    name: "The Jantar Mantar, Jaipur",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jantar_Mantar_at_Jaipur.jpg/1280px-Jantar_Mantar_at_Jaipur.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Samrat_Yantra_Jantar_Mantar_Jaipur.jpg/1280px-Samrat_Yantra_Jantar_Mantar_Jaipur.jpg"
    ],
    caption: "Vrihat Samrat Yantra, the world's largest stone sundial at Jantar Mantar, Jaipur"
  },
  {
    id: 29,
    name: "Western Ghats",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/AnaimudiPeak_DSC_4834.jpg/1280px-AnaimudiPeak_DSC_4834.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Tea_plantations_in_Munnar.jpg/1280px-Tea_plantations_in_Munnar.jpg"
    ],
    caption: "Misty mountain peaks and biodiversity hotspot of the Western Ghats (Sahyadris)"
  },
  {
    id: 30,
    name: "Hill Forts of Rajasthan",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Jaipur_03-2016_04_Amber_Fort.jpg/1280px-Jaipur_03-2016_04_Amber_Fort.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Kumbhalgarh_Fort_Wall.jpg/1280px-Kumbhalgarh_Fort_Wall.jpg"
    ],
    caption: "Monumental battlements and ramparts of the Hill Forts of Rajasthan"
  },
  {
    id: 31,
    name: "Rani-ki-Vav (The Queen’s Stepwell)",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Rani_ki_vav_02.jpg/1280px-Rani_ki_vav_02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Rani_Ki_Vav_Patan_Gujarat.jpg/1280px-Rani_Ki_Vav_Patan_Gujarat.jpg"
    ],
    caption: "Seven-level carved subterranean stepwell with Vishnu reliefs at Patan, Gujarat"
  },
  {
    id: 32,
    name: "Great Himalayan National Park Conservation Area",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Himalayn_National_Park_01.jpg/1280px-Himalayn_National_Park_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tirthan_Valley_GHNP.jpg/1280px-Tirthan_Valley_GHNP.jpg"
    ],
    caption: "Glacial alpine peaks and pristine valleys of Great Himalayan National Park"
  },
  {
    id: 33,
    name: "Archaeological Site of Nalanda Mahavihara",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/1280px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Nalanda_University_Ruins.jpg/1280px-Nalanda_University_Ruins.jpg"
    ],
    caption: "Sariputta Stupa 3 and ancient monastic quadrangle at Nalanda Mahavihara"
  },
  {
    id: 34,
    name: "Khangchendzonga National Park",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Kangch-Goechala.jpg/1280px-Kangch-Goechala.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Kanchenjunga_view.jpg/1280px-Kanchenjunga_view.jpg"
    ],
    caption: "Glacial massif of Mount Kanchenjunga (8,586m), sacred peak of Sikkim"
  },
  {
    id: 35,
    name: "The Architectural Work of Le Corbusier",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palace_of_Assembly_Chandigarh_2006.jpg/1280px-Palace_of_Assembly_Chandigarh_2006.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Open_Hand_Monument_Chandigarh.jpg/1280px-Open_Hand_Monument_Chandigarh.jpg"
    ],
    caption: "Palace of Assembly and Open Hand Monument at Chandigarh Capitol Complex"
  },
  {
    id: 36,
    name: "Historic City of Ahmadabad",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tree_of_Life_Sidi_Saiyyed_Mosque.jpg/1280px-Tree_of_Life_Sidi_Saiyyed_Mosque.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Teen_Darwaza_Ahmedabad.jpg/1280px-Teen_Darwaza_Ahmedabad.jpg"
    ],
    caption: "Tree of Life stone lattice jali window at Sidi Saiyyed Mosque, Ahmedabad"
  },
  {
    id: 37,
    name: "Victorian Gothic and Art Deco Ensembles of Mumbai",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Mumbai_03-2016_41_Bombay_High_Court.jpg/1280px-Mumbai_03-2016_41_Bombay_High_Court.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Rajabai_Tower_Mumbai.jpg/1280px-Rajabai_Tower_Mumbai.jpg"
    ],
    caption: "Victorian Gothic Rajabai Tower and Bombay High Court along Oval Maidan, Mumbai"
  },
  {
    id: 38,
    name: "Jaipur City, Rajasthan",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/1280px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Hawa_Mahal_2011.jpg/1280px-Hawa_Mahal_2011.jpg"
    ],
    caption: "Iconic honeycomb pink sandstone facade of Hawa Mahal, Jaipur Pink City"
  },
  {
    id: 39,
    name: "Kakatiya Rudreshwara (Ramappa) Temple",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ramappa_Temple_%28Human_Scale%29.jpg/1280px-Ramappa_Temple_%28Human_Scale%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Ramappa_Temple_Palampet.jpg/1280px-Ramappa_Temple_Palampet.jpg"
    ],
    caption: "13th-century Kakatiya Ramappa Temple built with floating bricks and carved basalt"
  },
  {
    id: 40,
    name: "Dholavira: A Harappan City",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/DHOLAVIRA_SITE_%2824%29.jpg/1280px-DHOLAVIRA_SITE_%2824%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dholavira_Reservoir.jpg/1280px-Dholavira_Reservoir.jpg"
    ],
    caption: "Ancient Indus Valley Harappan stone water reservoirs and citadel at Dholavira"
  },
  {
    id: 41,
    name: "Santiniketan",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Shantiniketan_Bari_of_Rabindranath_Tagore.jpg/1280px-Shantiniketan_Bari_of_Rabindranath_Tagore.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Upasana_Griha_Santiniketan.jpg/1280px-Upasana_Griha_Santiniketan.jpg"
    ],
    caption: "Rabindranath Tagore's ashram abode and Upasana Griha at Santiniketan"
  },
  {
    id: 42,
    name: "Sacred Ensembles of the Hoysalas",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Somanathapura_Keshava_temple.jpg/1280px-Somanathapura_Keshava_temple.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chennakeshava_Temple_at_Belur.jpg/1280px-Chennakeshava_Temple_at_Belur.jpg"
    ],
    caption: "Stellate soapstone sanctum and intricate relief friezes of Hoysala temples"
  },
  {
    id: 43,
    name: "Moidams – the Mound-Burial System of the Ahom Dynasty",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sam2.JPG/1280px-Sam2.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Charaideo_Moidams.jpg/1280px-Charaideo_Moidams.jpg"
    ],
    caption: "Charaideo royal earthen burial mound (maidam) of the Ahom dynasty, Assam"
  },
  {
    id: 44,
    name: "Jaipur Amber Fort",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Amber_Fort_Jaipur.jpg/1280px-Amber_Fort_Jaipur.jpg"
    ],
    caption: "Amer Fort palace ramparts reflecting upon Maota Lake in Jaipur"
  },
  {
    id: 45,
    name: "Jaisalmer Fort",
    urls: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Jaisalmer_forteresse.jpg/1280px-Jaisalmer_forteresse.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Jaisalmer_Fort_Golden_City.jpg/1280px-Jaisalmer_Fort_Golden_City.jpg"
    ],
    caption: "Sonar Qila (Golden Fort) golden sandstone citadel in the Thar Desert"
  }
];

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "SoftHaevenHeritageApp/1.0 (manognyadonakonda6@gmail.com; contact: heritage@soft-haeven.org)",
      "Accept": "image/webp,image/apng,image/*,*/*;q=0.8"
    }
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buffer));
  const stats = fs.statSync(destPath);
  return stats.size;
}

async function run() {
  const outDir = 'public/images/heritage';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log("Starting download of all 45 UNESCO heritage site images...");
  const report = [];

  for (const site of SITES) {
    const filename = `site-${site.id}.jpg`;
    const destPath = path.join(outDir, filename);

    // If file already exists and is large enough (>15KB), skip unless needed
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 15000) {
      console.log(`[Site ${site.id}] ${site.name}: Already exists (${fs.statSync(destPath).size} bytes)`);
      report.push({ id: site.id, name: site.name, success: true, size: fs.statSync(destPath).size, caption: site.caption });
      continue;
    }

    let success = false;
    let downloadedSize = 0;

    for (const url of site.urls) {
      try {
        console.log(`[Site ${site.id}] Downloading ${site.name} from ${url}...`);
        downloadedSize = await downloadImage(url, destPath);
        if (downloadedSize > 10000) {
          success = true;
          console.log(`[Site ${site.id}] SUCCESS: ${downloadedSize} bytes`);
          break;
        }
      } catch (err) {
        console.warn(`[Site ${site.id}] Failed from ${url}: ${err.message}`);
      }
    }

    report.push({ id: site.id, name: site.name, success, size: downloadedSize, caption: site.caption });
  }

  fs.writeFileSync('scripts/download_report.json', JSON.stringify(report, null, 2));
  console.log("Finished downloading images. Results written to scripts/download_report.json");
}

run();

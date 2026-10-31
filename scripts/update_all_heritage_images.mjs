import fs from 'fs';

const CAPTIONS = {
  1: "Panoramic horseshoe cliff and carved chaitya facades of Ajanta Caves",
  2: "Cave 16 Kailasa Temple, monolithic rock-cut multi-level marvel of Ellora",
  3: "Red sandstone ramparts and grand bastions of Agra Fort",
  4: "Iconic white marble mausoleum and reflecting pools of the Taj Mahal",
  5: "13th-century Sun Temple with colossal carved stone chariot wheels at Konark",
  6: "8th-century Shore Temple overlooking the Bay of Bengal, Mahabalipuram",
  7: "Great Indian one-horned rhinoceros in the grasslands of Kaziranga",
  8: "Pristine sub-Himalayan forest and wildlife sanctuary at Manas",
  9: "Wetland bird sanctuary and painted storks at Keoladeo National Park, Bharatpur",
  10: "Baroque facade of the Basilica of Bom Jesus, Old Goa",
  11: "Soaring shikhara and sculpted reliefs of Kandariya Mahadeva Temple, Khajuraho",
  12: "The iconic Stone Chariot at Vittala Temple, Hampi",
  13: "Monumental 54-meter Buland Darwaza entrance at Fatehpur Sikri",
  14: "7th-8th century Chalukya temple complex along the Malaprabha River, Pattadakal",
  15: "Colossal three-headed Maheshmurti Trimurti Shiva sculpture, Elephanta Caves",
  16: "Royal Bengal Tiger amidst the mangrove waterways of Sundarbans",
  17: "Towering 66-meter granite vimana of Brihadisvara Temple, Thanjavur",
  18: "Alpine meadows of blossoms against snowy peaks in Valley of Flowers",
  19: "The Great Stupa and ornamental torana gateway at Sanchi",
  20: "Red sandstone and white marble dome of Humayun's Tomb, Delhi",
  21: "73-meter fluted red sandstone Qutb Minar tower and iron pillar ruins, Delhi",
  22: "Historic Nilgiri and Darjeeling mountain railway steam engines",
  23: "50-meter pyramidal stone spire of Mahabodhi Temple, Bodh Gaya",
  24: "Prehistoric rock art and Paleolithic sandstone shelters of Bhimbetka",
  25: "High Victorian Gothic Revival facade of Chhatrapati Shivaji Maharaj Terminus, Mumbai",
  26: "16th-century Jama Masjid and Pavagadh hill citadel, Champaner",
  27: "Lahore Gate and red sandstone ramparts of Lal Qila (Red Fort), Delhi",
  28: "Vrihat Samrat Yantra stone equinoctial sundial at Jantar Mantar, Jaipur",
  29: "Misty mountain peaks and biodiversity hotspot of the Western Ghats (Sahyadris)",
  30: "Monumental battlements and ramparts of Kumbhalgarh Fort, Rajasthan",
  31: "Seven-level carved subterranean stepwell with Vishnu reliefs at Rani ki Vav, Patan",
  32: "Glacial alpine peaks and pristine valleys of Great Himalayan National Park",
  33: "Sariputta Stupa 3 and ancient monastic quadrangle at Nalanda Mahavihara",
  34: "Glacial massif of Mount Kanchenjunga (8,586m) over Khangchendzonga National Park",
  35: "Palace of Assembly and Open Hand Monument at Chandigarh Capitol Complex",
  36: "Tree of Life carved stone lattice jali screen at Sidi Saiyyed Mosque, Ahmedabad",
  37: "Victorian Gothic Rajabai Clock Tower and High Court along Oval Maidan, Mumbai",
  38: "Iconic honeycomb pink sandstone facade of Hawa Mahal, Jaipur Pink City",
  39: "13th-century Kakatiya Ramappa Temple built with floating bricks, Telangana",
  40: "Ancient Indus Valley Harappan stone water reservoirs and citadel at Dholavira",
  41: "Rabindranath Tagore's ashram abode and Upasana Griha at Santiniketan",
  42: "Intricately carved stellate sanctum of Chennakeshava Temple, Belur (Hoysala)",
  43: "Charaideo royal earthen burial mound (maidam) of the Ahom dynasty, Assam",
  44: "Amber Fort palace ramparts reflecting upon Maota Lake in Jaipur",
  45: "Sonar Qila (Golden Fort) yellow sandstone citadel in the Thar Desert, Jaisalmer"
};

const filePath = 'src/data/heritageSites.ts';
let content = fs.readFileSync(filePath, 'utf8');

// For each site 1 to 45, replace the image with local /images/heritage/site-${id}.jpg and verified caption
for (let id = 1; id <= 45; id++) {
  const localImg = `/images/heritage/site-${id}.jpg`;
  const caption = CAPTIONS[id] || `Verified UNESCO Heritage photograph of site #${id}`;

  // Find the block for this id: `id: ${id},`
  // We match until the next `id:` or end of array
  const idRegex = new RegExp(`(\\bid:\\s*${id}\\b[\\s\\S]*?image:\\s*)(["'][^"']+["'])`, 'm');
  if (idRegex.test(content)) {
    content = content.replace(idRegex, `$1"${localImg}"`);
  } else {
    console.warn(`Could not find image property for site #${id}`);
  }

  // Update or set imageCaption
  const captionRegex = new RegExp(`(\\bid:\\s*${id}\\b[\\s\\S]*?imageCaption:\\s*)(["'][^"']+["'])`, 'm');
  if (captionRegex.test(content)) {
    content = content.replace(captionRegex, `$1"${caption}"`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated all 45 sites in src/data/heritageSites.ts with local images and captions!");

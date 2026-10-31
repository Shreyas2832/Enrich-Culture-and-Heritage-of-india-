// Script to find and verify the most authentic, high-quality images for all 45 UNESCO Heritage Sites of India
import fs from 'fs';

const SITE_SEARCH_TERMS = [
  { id: 1, name: "Ajanta Caves", query: "Ajanta Caves Cave 26 chaitya interior OR Ajanta panorama" },
  { id: 2, name: "Ellora Caves", query: "Kailasa temple Ellora cave 16 monolithic" },
  { id: 3, name: "Agra Fort", query: "Agra Fort Jahangiri Mahal red sandstone" },
  { id: 4, name: "Taj Mahal", query: "Taj Mahal Agra iconic front reflection pool" },
  { id: 5, name: "Sun Temple, Konark", query: "Konark Sun temple stone chariot wheel" },
  { id: 6, name: "Group of Monuments at Mahabalipuram", query: "Shore Temple Mahabalipuram Mamallapuram" },
  { id: 7, name: "Kaziranga National Park", query: "Rhinoceros unicornis Kaziranga National Park" },
  { id: 8, name: "Manas Wildlife Sanctuary", query: "Manas National Park river Assam" },
  { id: 9, name: "Keoladeo National Park", query: "Keoladeo National Park Bharatpur birds" },
  { id: 10, name: "Churches and Convents of Goa", query: "Basilica of Bom Jesus Goa facade" },
  { id: 11, name: "Khajuraho Group of Monuments", query: "Kandariya Mahadeva Temple Khajuraho" },
  { id: 12, name: "Group of Monuments at Hampi", query: "Hampi stone chariot Vittala temple" },
  { id: 13, name: "Fatehpur Sikri", query: "Buland Darwaza Fatehpur Sikri Agra" },
  { id: 14, name: "Group of Monuments at Pattadakal", query: "Pattadakal Virupaksha temple complex" },
  { id: 15, name: "Elephanta Caves", query: "Elephanta Caves Trimurti Sadashiva" },
  { id: 16, name: "Sundarbans National Park", query: "Sundarbans mangrove Bengal tiger OR Sundarbans delta" },
  { id: 17, name: "Great Living Chola Temples", query: "Brihadisvara Temple Thanjavur vimana" },
  { id: 18, name: "Nanda Devi and Valley of Flowers National Parks", query: "Valley of Flowers National Park Uttarakhand" },
  { id: 19, name: "Buddhist Monuments at Sanchi", query: "Great Stupa Sanchi torana gateway" },
  { id: 20, name: "Humayun's Tomb, Delhi", query: "Humayun tomb Delhi facade garden" },
  { id: 21, name: "Qutb Minar and its Monuments, Delhi", query: "Qutb Minar Delhi monument tower" },
  { id: 22, name: "Mountain Railways of India", query: "Darjeeling Himalayan Railway steam locomotive toy train" },
  { id: 23, name: "Mahabodhi Temple Complex at Bodh Gaya", query: "Mahabodhi Temple Bodh Gaya spire" },
  { id: 24, name: "Rock Shelters of Bhimbetka", query: "Bhimbetka rock painting prehistoric" },
  { id: 25, name: "Chhatrapati Shivaji Maharaj Terminus", query: "Chhatrapati Shivaji Terminus Mumbai exterior CST" },
  { id: 26, name: "Champaner-Pavagadh Archaeological Park", query: "Champaner Jama Masjid Pavagadh" },
  { id: 27, name: "Red Fort Complex, Delhi", query: "Red Fort Delhi Lal Qila Lahore Gate" },
  { id: 28, name: "The Jantar Mantar, Jaipur", query: "Jantar Mantar Jaipur Samrat Yantra sundial" },
  { id: 29, name: "Western Ghats", query: "Western Ghats Munnar Sahyadri mountain" },
  { id: 30, name: "Hill Forts of Rajasthan", query: "Kumbhalgarh Fort wall Rajasthan" },
  { id: 31, name: "Rani-ki-Vav (The Queen’s Stepwell)", query: "Rani ki vav Patan stepwell sculpture" },
  { id: 32, name: "Great Himalayan National Park Conservation Area", query: "Great Himalayan National Park Kullu Himachal" },
  { id: 33, name: "Archaeological Site of Nalanda Mahavihara", query: "Nalanda ruins stupa Bihar" },
  { id: 34, name: "Khangchendzonga National Park", query: "Kangchenjunga peak Sikkim mountain" },
  { id: 35, name: "The Architectural Work of Le Corbusier", query: "Open Hand Monument Chandigarh Capitol Complex" },
  { id: 36, name: "Historic City of Ahmadabad", query: "Sidi Saiyyed Mosque jali Ahmedabad" },
  { id: 37, name: "Victorian Gothic and Art Deco Ensembles of Mumbai", query: "Rajabai Clock Tower Mumbai University" },
  { id: 38, name: "Jaipur City, Rajasthan", query: "Hawa Mahal Jaipur facade pink city" },
  { id: 39, name: "Kakatiya Rudreshwara (Ramappa) Temple", query: "Ramappa Temple Palampet Kakatiya" },
  { id: 40, name: "Dholavira: A Harappan City", query: "Dholavira Harappan reservoir Indus Valley" },
  { id: 41, name: "Santiniketan", query: "Upasana Griha Santiniketan Visva Bharati" },
  { id: 42, name: "Sacred Ensembles of the Hoysalas", query: "Chennakeshava Temple Belur Hoysala" },
  { id: 43, name: "Moidams – the Mound-Burial System of the Ahom Dynasty", query: "Charaideo maidam Ahom burial mound Assam" },
  { id: 44, name: "Jaipur Amber Fort (Part of Hill Forts of Rajasthan)", query: "Amber Fort Jaipur Amer Maota lake" },
  { id: 45, name: "Jaisalmer Fort (Part of Hill Forts of Rajasthan)", query: "Jaisalmer Fort Sonar Qila desert golden" }
];

async function fetchWikiImage(query) {
  try {
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=5`;
    const sRes = await fetch(searchUrl, { headers: { "User-Agent": "SoftHaevenApp/1.0" } });
    const sData = await sRes.json();
    const results = sData.query?.search || [];
    
    for (const r of results) {
      const title = r.title;
      // Skip SVGs, PDFs, audio, non-images
      if (title.endsWith('.svg') || title.endsWith('.pdf') || title.endsWith('.ogg') || title.endsWith('.tif')) continue;
      
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1200&format=json`;
      const iRes = await fetch(infoUrl, { headers: { "User-Agent": "SoftHaevenApp/1.0" } });
      const iData = await iRes.json();
      const pages = iData.query?.pages;
      const page = Object.values(pages)[0];
      const imgInfo = page?.imageinfo?.[0];
      if (imgInfo && imgInfo.thumburl) {
        return {
          title,
          url: imgInfo.thumburl,
          caption: imgInfo.extmetadata?.ObjectName?.value || r.title.replace('File:', '').replace(/\.[^/.]+$/, ''),
          author: imgInfo.extmetadata?.Artist?.value || 'Wikimedia Commons'
        };
      }
    }
  } catch (err) {
    console.error("Error fetching for", query, err.message);
  }
  return null;
}

async function run() {
  console.log("Starting image resolution for 45 sites...");
  const resolved = [];
  for (const site of SITE_SEARCH_TERMS) {
    console.log(`Searching site #${site.id}: ${site.name}...`);
    const img = await fetchWikiImage(site.query);
    resolved.push({
      id: site.id,
      name: site.name,
      ...img
    });
    // small delay
    await new Promise(r => setTimeout(r, 100));
  }
  fs.writeFileSync('scripts/resolved_images.json', JSON.stringify(resolved, null, 2));
  console.log("Completed! Saved to scripts/resolved_images.json");
}

run();

import fs from 'fs';
import path from 'path';

const REMAINING_TARGETS = [
  {
    id: 17,
    name: "Great Living Chola Temples",
    page: "Brihadisvara_Temple,_Thanjavur",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg/1280px-Brihadisvara_Temple_during_Maha_Shivaratri-WUS03611_%28edit%29.jpg"
  },
  {
    id: 20,
    name: "Humayun's Tomb, Delhi",
    page: "Humayun%27s_Tomb",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Tomb_of_Humayun%2C_Delhi.jpg/1280px-Tomb_of_Humayun%2C_Delhi.jpg"
  },
  {
    id: 21,
    name: "Qutb Minar and its Monuments, Delhi",
    page: "Qutb_Minar",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/1280px-Qutb_Minar_2022.jpg"
  },
  {
    id: 22,
    name: "Mountain Railways of India",
    page: "Nilgiri_Mountain_Railway",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/NMR_train_at_Ketti_05-02-26_75.jpeg/1280px-NMR_train_at_Ketti_05-02-26_75.jpeg"
  },
  {
    id: 26,
    name: "Champaner-Pavagadh Archaeological Park",
    page: "Champaner-Pavagadh_Archaeological_Park",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Jain_Temple%2C_Pavagadh_%28cropped%29.jpg/1280px-Jain_Temple%2C_Pavagadh_%28cropped%29.jpg"
  },
  {
    id: 30,
    name: "Hill Forts of Rajasthan",
    page: "Kumbhalgarh_Fort",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kumbhalgarh_055.jpg/1280px-Kumbhalgarh_055.jpg"
  },
  {
    id: 32,
    name: "Great Himalayan National Park Conservation Area",
    page: "Great_Himalayan_National_Park",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Himalayn_National_Park_01.jpg/1280px-Himalayn_National_Park_01.jpg"
  },
  {
    id: 33,
    name: "Archaeological Site of Nalanda Mahavihara",
    page: "Nalanda_mahavihara",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg/1280px-Temple_No.-_3%2C_Nalanda_Archaeological_Site.jpg"
  },
  {
    id: 35,
    name: "The Architectural Work of Le Corbusier",
    page: "Chandigarh_Capitol_Complex",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Palace_of_Assembly_Chandigarh_2006.jpg/1280px-Palace_of_Assembly_Chandigarh_2006.jpg"
  },
  {
    id: 36,
    name: "Historic City of Ahmadabad",
    page: "Sidi_Saiyyed_Mosque",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg/1280px-Sidi_Saiyyed_Mosque%2C_Ahmedabad.jpg"
  },
  {
    id: 39,
    name: "Kakatiya Rudreshwara (Ramappa) Temple",
    page: "Ramappa_Temple",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ramappa_Temple_%28Human_Scale%29.jpg/1280px-Ramappa_Temple_%28Human_Scale%29.jpg"
  },
  {
    id: 41,
    name: "Santiniketan",
    page: "Santiniketan",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Shantiniketan_Bari_of_Rabindranath_Tagore.jpg/1280px-Shantiniketan_Bari_of_Rabindranath_Tagore.jpg"
  },
  {
    id: 42,
    name: "Sacred Ensembles of the Hoysalas",
    page: "Chennakeshava_Temple,_Belur",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Courtyard_of_Chennakesava_Temple_-_Belur.jpg/1280px-The_Courtyard_of_Chennakesava_Temple_-_Belur.jpg"
  },
  {
    id: 43,
    name: "Moidams – the Mound-Burial System of the Ahom Dynasty",
    page: "Charaideo",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Charadeo_Maidam_mausoleum.jpg/1280px-Charadeo_Maidam_mausoleum.jpg"
  },
  {
    id: 44,
    name: "Jaipur Amber Fort",
    page: "Amer_Fort",
    directUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/1280px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg"
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSummaryImage(pageTitle) {
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`, {
      headers: { "User-Agent": "SoftHaevenApp/1.0 (contact: info@soft-haeven.org)" }
    });
    if (res.ok) {
      const d = await res.json();
      return d.thumbnail?.source || d.originalimage?.source;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept": "image/*"
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  return fs.statSync(dest).size;
}

async function run() {
  const outDir = 'public/images/heritage';
  for (const item of REMAINING_TARGETS) {
    const dest = path.join(outDir, `site-${item.id}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 15000) {
      console.log(`[Site ${item.id}] Already exists (${fs.statSync(dest).size} bytes)`);
      continue;
    }

    console.log(`[Site ${item.id}] Fetching ${item.name}...`);
    let size = 0;
    
    // First try direct URL
    try {
      size = await downloadFile(item.directUrl, dest);
      console.log(`[Site ${item.id}] Downloaded direct URL: ${size} bytes`);
    } catch (err1) {
      console.log(`[Site ${item.id}] Direct URL failed (${err1.message}), checking summary API...`);
      await sleep(1500);
      const summaryUrl = await fetchSummaryImage(item.page);
      if (summaryUrl) {
        try {
          size = await downloadFile(summaryUrl, dest);
          console.log(`[Site ${item.id}] Downloaded from summary API: ${size} bytes`);
        } catch (err2) {
          console.error(`[Site ${item.id}] Summary download failed:`, err2.message);
        }
      }
    }

    // Polite delay to avoid rate-limiting
    await sleep(2000);
  }

  console.log("Completed downloading remaining images.");
}

run();

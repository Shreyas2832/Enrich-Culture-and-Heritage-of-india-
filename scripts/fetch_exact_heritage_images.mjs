import fs from 'fs';
import path from 'path';

const SITE_MAPPINGS = [
  { id: 1, name: "Ajanta Caves", title: "Ajanta_Caves" },
  { id: 2, name: "Ellora Caves", title: "Kailasa_temple,_Ellora", altTitle: "Ellora_Caves" },
  { id: 3, name: "Agra Fort", title: "Agra_Fort" },
  { id: 4, name: "Taj Mahal", title: "Taj_Mahal" },
  { id: 5, name: "Sun Temple, Konark", title: "Konark_Sun_Temple" },
  { id: 6, name: "Group of Monuments at Mahabalipuram", title: "Group_of_Monuments_at_Mahabalipuram" },
  { id: 7, name: "Kaziranga National Park", title: "Kaziranga_National_Park" },
  { id: 8, name: "Manas Wildlife Sanctuary", title: "Manas_National_Park" },
  { id: 9, name: "Keoladeo National Park", title: "Keoladeo_National_Park" },
  { id: 10, name: "Churches and Convents of Goa", title: "Churches_and_convents_of_Goa", altTitle: "Basilica_of_Bom_Jesus" },
  { id: 11, name: "Khajuraho Group of Monuments", title: "Khajuraho_Group_of_Monuments", altTitle: "Kandariya_Mahadeva_Temple" },
  { id: 12, name: "Group of Monuments at Hampi", title: "Hampi", altTitle: "Vittala_Temple,_Hampi" },
  { id: 13, name: "Fatehpur Sikri", title: "Fatehpur_Sikri" },
  { id: 14, name: "Group of Monuments at Pattadakal", title: "Pattadakal" },
  { id: 15, name: "Elephanta Caves", title: "Elephanta_Caves" },
  { id: 16, name: "Sundarbans National Park", title: "Sundarbans_National_Park" },
  { id: 17, name: "Great Living Chola Temples", title: "Great_Living_Chola_Temples", altTitle: "Brihadisvara_Temple,_Thanjavur" },
  { id: 18, name: "Nanda Devi and Valley of Flowers National Parks", title: "Valley_of_Flowers_National_Park", altTitle: "Nanda_Devi_National_Park" },
  { id: 19, name: "Buddhist Monuments at Sanchi", title: "Sanchi" },
  { id: 20, name: "Humayun's Tomb, Delhi", title: "Humayun%27s_Tomb" },
  { id: 21, name: "Qutb Minar and its Monuments, Delhi", title: "Qutb_Minar_complex", altTitle: "Qutb_Minar" },
  { id: 22, name: "Mountain Railways of India", title: "Mountain_railways_of_India", altTitle: "Darjeeling_Himalayan_Railway" },
  { id: 23, name: "Mahabodhi Temple Complex at Bodh Gaya", title: "Mahabodhi_Temple" },
  { id: 24, name: "Rock Shelters of Bhimbetka", title: "Bhimbetka_rock_shelters" },
  { id: 25, name: "Chhatrapati Shivaji Maharaj Terminus", title: "Chhatrapati_Shivaji_Terminus" },
  { id: 26, name: "Champaner-Pavagadh Archaeological Park", title: "Champaner-Pavagadh_Archaeological_Park", altTitle: "Jama_Mosque,_Champaner" },
  { id: 27, name: "Red Fort Complex, Delhi", title: "Red_Fort" },
  { id: 28, name: "The Jantar Mantar, Jaipur", title: "Jantar_Mantar,_Jaipur" },
  { id: 29, name: "Western Ghats", title: "Western_Ghats" },
  { id: 30, name: "Hill Forts of Rajasthan", title: "Hill_Forts_of_Rajasthan", altTitle: "Kumbhalgarh" },
  { id: 31, name: "Rani-ki-Vav (The Queen’s Stepwell)", title: "Rani_ki_Vav" },
  { id: 32, name: "Great Himalayan National Park Conservation Area", title: "Great_Himalayan_National_Park" },
  { id: 33, name: "Archaeological Site of Nalanda Mahavihara", title: "Nalanda_mahavihara" },
  { id: 34, name: "Khangchendzonga National Park", title: "Khangchendzonga_National_Park", altTitle: "Kangchenjunga" },
  { id: 35, name: "The Architectural Work of Le Corbusier", title: "Chandigarh_Capitol_Complex", altTitle: "Open_Hand_Monument" },
  { id: 36, name: "Historic City of Ahmadabad", title: "Historic_City_of_Ahmadabad", altTitle: "Sidi_Saiyyed_Mosque" },
  { id: 37, name: "Victorian Gothic and Art Deco Ensembles of Mumbai", title: "Victorian_Gothic_and_Art_Deco_Ensembles_of_Mumbai", altTitle: "Rajabai_Clock_Tower" },
  { id: 38, name: "Jaipur City, Rajasthan", title: "Hawa_Mahal", altTitle: "Jaipur" },
  { id: 39, name: "Kakatiya Rudreshwara (Ramappa) Temple", title: "Ramappa_Temple" },
  { id: 40, name: "Dholavira: A Harappan City", title: "Dholavira" },
  { id: 41, name: "Santiniketan", title: "Santiniketan" },
  { id: 42, name: "Sacred Ensembles of the Hoysalas", title: "Sacred_Ensembles_of_the_Hoysalas", altTitle: "Chennakeshava_Temple,_Belur" },
  { id: 43, name: "Moidams – the Mound-Burial System of the Ahom Dynasty", title: "Charaideo_maidams", altTitle: "Moidam" },
  { id: 44, name: "Jaipur Amber Fort (Part of Hill Forts of Rajasthan)", title: "Amer_Fort" },
  { id: 45, name: "Jaisalmer Fort (Part of Hill Forts of Rajasthan)", title: "Jaisalmer_Fort" }
];

async function getImageForTitle(title) {
  try {
    // 1. Try Wikipedia summary API first
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const res = await fetch(summaryUrl, {
      headers: { "User-Agent": "SoftHaevenApp/1.0 (manognyadonakonda6@gmail.com)" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.originalimage?.source) return data.originalimage.source;
      if (data.thumbnail?.source) return data.thumbnail.source;
    }
  } catch (e) {
    // ignore
  }

  try {
    // 2. Try Wikipedia action=query&prop=pageimages
    const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&redirects=1&prop=pageimages&pithumbsize=1200&format=json`;
    const res = await fetch(queryUrl, {
      headers: { "User-Agent": "SoftHaevenApp/1.0 (manognyadonakonda6@gmail.com)" }
    });
    if (res.ok) {
      const data = await res.json();
      const pages = data.query?.pages || {};
      const page = Object.values(pages)[0];
      if (page?.thumbnail?.source) return page.thumbnail.source;
    }
  } catch (e) {
    // ignore
  }

  return null;
}

async function testFetch() {
  console.log("Testing image URLs for all 45 sites...");
  const results = [];
  for (const item of SITE_MAPPINGS) {
    let imgUrl = await getImageForTitle(item.title);
    if (!imgUrl && item.altTitle) {
      imgUrl = await getImageForTitle(item.altTitle);
    }
    console.log(`[#${item.id}] ${item.name} => ${imgUrl ? 'FOUND' : 'NOT FOUND'} (${imgUrl || 'NONE'})`);
    results.push({ id: item.id, name: item.name, url: imgUrl });
  }
  fs.writeFileSync('scripts/test_results.json', JSON.stringify(results, null, 2));
}

testFetch();

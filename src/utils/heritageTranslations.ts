/**
 * Multilingual Translation and Narration Dictionary for Heritec UNESCO Heritage Sites
 * Supports: English, Hindi, Telugu, Tamil, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi
 */

import { HeritageSite } from '../data/heritageSites';
import { HINDI_HERITAGE_DOSSIERS } from './hindiTranslations';
import { MARATHI_HERITAGE_DOSSIERS } from './marathiTranslations';
import { MALAYALAM_HERITAGE_DOSSIERS } from './malayalamTranslations';
import { TAMIL_HERITAGE_DOSSIERS } from './tamilTranslations';
import { TELUGU_HERITAGE_DOSSIERS } from './teluguTranslations';
import { KANNADA_HERITAGE_DOSSIERS } from './kannadaTranslations';
import { BENGALI_HERITAGE_DOSSIERS } from './bengaliTranslations';
import { GUJARATI_HERITAGE_DOSSIERS } from './gujaratiTranslations';

export interface SupportedLanguage {
  code: string;        // BCP 47 code (e.g., 'te-IN', 'hi-IN')
  name: string;        // English name (e.g., 'Telugu')
  nativeName: string;  // Native script name (e.g., 'తెలుగు')
  voicePrompt: string; // e.g., 'Listen to Heritage Information'
  badge: string;       // Short code
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en-IN', name: 'English', nativeName: 'English', voicePrompt: 'Listen to Heritage Information', badge: 'EN' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिन्दी', voicePrompt: 'विरासत की जानकारी सुनें', badge: 'HI' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', voicePrompt: 'వారసత్వ సమాచారం వినండి', badge: 'TE' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', voicePrompt: 'பாரம்பரிய தகவலைக் கேளுங்கள்', badge: 'TA' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', voicePrompt: 'ಪರಂಪರೆಯ ಮಾಹಿತಿಯನ್ನು ಆಲಿಸಿ', badge: 'KN' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', voicePrompt: 'പൈതൃക വിവരങ്ങൾ കേൾക്കുക', badge: 'ML' },
  { code: 'bn-IN', name: 'Bengali', nativeName: 'বাংলা', voicePrompt: 'ঐতিহ্য তথ্য শুনুন', badge: 'BN' },
  { code: 'mr-IN', name: 'Marathi', nativeName: 'मराठी', voicePrompt: 'वारसा माहिती ऐका', badge: 'MR' },
  { code: 'gu-IN', name: 'Gujarati', nativeName: 'ગુજરાતી', voicePrompt: 'વારસાની માહિતી સાંભળો', badge: 'GU' },
  { code: 'pa-IN', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', voicePrompt: 'ਵਿਰਾਸਤੀ ਜਾਣਕਾਰੀ ਸੁਣੋ', badge: 'PA' },
];

export const LANGUAGE_CODE_MAP: Record<string, string> = {
  'en': 'en-IN',
  'hi': 'hi-IN',
  'te': 'te-IN',
  'ta': 'ta-IN',
  'kn': 'kn-IN',
  'ml': 'ml-IN',
  'bn': 'bn-IN',
  'mr': 'mr-IN',
  'gu': 'gu-IN',
  'pa': 'pa-IN',
};

// Localized vocabulary templates for high-fidelity speech synthesis
interface LanguageLabels {
  locationPrefix: string;
  inscribedIn: string;
  typeLabels: Record<'Cultural' | 'Natural' | 'Mixed', string>;
  aboutPrefix: string;
  significancePrefix: string;
  factsPrefix: string;
  country: string;
}

const LANGUAGE_TEMPLATES: Record<string, LanguageLabels> = {
  'en-IN': {
    locationPrefix: 'Located in',
    inscribedIn: 'Inscribed as a UNESCO World Heritage Site in',
    typeLabels: { Cultural: 'Cultural', Natural: 'Natural', Mixed: 'Mixed Cultural and Natural' },
    aboutPrefix: 'About the Site',
    significancePrefix: 'Historical and Cultural Significance',
    factsPrefix: 'Interesting Facts',
    country: 'India',
  },
  'hi-IN': {
    locationPrefix: 'यह स्थल स्थित है',
    inscribedIn: 'इसे यूनेस्को विश्व धरोहर स्थल के रूप में वर्ष में शामिल किया गया था',
    typeLabels: { Cultural: 'सांस्कृतिक स्थल', Natural: 'प्राकृतिक स्थल', Mixed: 'मिश्रित स्थल' },
    aboutPrefix: 'स्थल के बारे में',
    significancePrefix: 'ऐतिहासिक और सांस्कृतिक महत्व',
    factsPrefix: 'रोचक तथ्य',
    country: 'भारत',
  },
  'te-IN': {
    locationPrefix: 'ఈ ప్రదేశం ఇక్కడ ఉంది',
    inscribedIn: 'ఇది యునెస్కో ప్రపంచ వారసత్వ ప్రదేశంగా ఈ సంవత్సరంలో గుర్తించబడింది',
    typeLabels: { Cultural: 'సాంస్కృతిక ప్రదేశం', Natural: 'సహజ ప్రదేశం', Mixed: 'మిశ్రమ ప్రదేశం' },
    aboutPrefix: 'ఈ చారిత్రక ప్రదేశం గురించి',
    significancePrefix: 'చారిత్రక మరియు సాంస్కృతిక విశిష్టత',
    factsPrefix: 'ఆసక్తికరమైన వాస్తవాలు',
    country: 'భారతదేశం',
  },
  'ta-IN': {
    locationPrefix: 'இந்த தளம் அமைந்துள்ள இடம்',
    inscribedIn: 'இது யுனெஸ்கோ உலக பாரம்பரிய தளமாக அறிவிக்கப்பட்ட ஆண்டு',
    typeLabels: { Cultural: 'கலாச்சார தளம்', Natural: 'இயற்கை தளம்', Mixed: 'கலப்பு தளம்' },
    aboutPrefix: 'தளத்தைப் பற்றி',
    significancePrefix: 'வரலாற்று மற்றும் கலாச்சார முக்கியத்துவம்',
    factsPrefix: 'சுவாரஸ்யமான உண்மைகள்',
    country: 'இந்தியா',
  },
  'kn-IN': {
    locationPrefix: 'ಈ ತಾಣವು ಇಲ್ಲಿ ನೆಲೆಸಿದೆ',
    inscribedIn: 'ಇದನ್ನು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣವೆಂದು ಈ ವರ್ಷದಲ್ಲಿ ಘೋಷಿಸಲಾಯಿತು',
    typeLabels: { Cultural: 'ಸಾಂಸ್ಕೃತಿಕ ತಾಣ', Natural: 'ನೈಸರ್ಗಿಕ ತಾಣ', Mixed: 'ಮಿಶ್ರ ತಾಣ' },
    aboutPrefix: 'ತಾಣದ ವಿವರಣೆ',
    significancePrefix: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಮಹತ್ವ',
    factsPrefix: 'ಕುತೂಹಲಕಾರಿ ಸಂಗತಿಗಳು',
    country: 'ಭಾರತ',
  },
  'ml-IN': {
    locationPrefix: 'ഈ കേന്ദ്രം സ്ഥിതി ചെയ്യുന്നത്',
    inscribedIn: 'യുനെസ്കോ ലോക പൈതൃക കേന്ദ്രമായി അംഗീകരിച്ച വർഷം',
    typeLabels: { Cultural: 'സാംസ്കാരിക കേന്ദ്രം', Natural: 'പ്രകൃതിദത്ത കേന്ദ്രം', Mixed: 'മിശ്ര കേന്ദ്രം' },
    aboutPrefix: 'പൈതൃക കേന്ദ്രത്തെക്കുറിച്ച്',
    significancePrefix: 'ചരിത്രപരവും സാംസ്കാരികവുമായ പ്രാധാന്യം',
    factsPrefix: 'രസകരമായ വസ്തുതകൾ',
    country: 'ഇന്ത്യ',
  },
  'bn-IN': {
    locationPrefix: 'এই স্থানটি অবস্থিত',
    inscribedIn: 'এটি ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান হিসেবে তালিকাভুক্ত হয়',
    typeLabels: { Cultural: 'সাংস্কৃতিক ঐতিহ্য', Natural: 'প্রাকৃতিক ঐতিহ্য', Mixed: 'মিশ্র ঐতিহ্য' },
    aboutPrefix: 'স্থান সম্পর্কে বিস্তারিত',
    significancePrefix: 'ঐতিহাসিক ও সাংস্কৃতিক গুরুত্ব',
    factsPrefix: 'আকর্ষণীয় তথ্য',
    country: 'ভারত',
  },
  'mr-IN': {
    locationPrefix: 'हे ठिकाण येथे वसलेले आहे',
    inscribedIn: 'याला युनेस्को जागतिक वारसा स्थळ म्हणून घोषित करण्यात आले',
    typeLabels: { Cultural: 'सांस्कृतिक वारसा', Natural: 'नैसर्गिक वारसा', Mixed: 'मिश्र वारसा' },
    aboutPrefix: 'या वारसा स्थळाबद्दल माहिती',
    significancePrefix: 'ऐतिहासिक आणि सांस्कृतिक महत्त्व',
    factsPrefix: 'रोचक तथ्ये',
    country: 'भारत',
  },
  'gu-IN': {
    locationPrefix: 'આ સ્થળ અહીં આવેલું છે',
    inscribedIn: 'આ સ્થળને યુનેસ્કો વર્લ્ડ હેરિટેજ સાઇટ તરીકે જાહેર કરવામાં આવ્યું હતું',
    typeLabels: { Cultural: 'સાંસ્કૃતિક સ્થળ', Natural: 'કુદરતી સ્થળ', Mixed: 'મિશ્ર સ્થળ' },
    aboutPrefix: 'આ ઐતિહાસિક સ્થળ વિશે',
    significancePrefix: 'ઐતિહાસિક અને સાંસ્કૃતિક મહત્વ',
    factsPrefix: 'રસપ્રદ તથ્યો',
    country: 'ભારત',
  },
  'pa-IN': {
    locationPrefix: 'ਇਹ ਇਤਿਹਾਸਕ ਸਥਾਨ ਇੱਥੇ ਸਥਿਤ ਹੈ',
    inscribedIn: 'ਇਸਨੂੰ ਯੂਨੈਸਕੋ ਵਿਸ਼ਵ ਵਿਰਾਸਤ ਸਥਾਨ ਵਜੋਂ ਇਸ ਸਾਲ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ ਸੀ',
    typeLabels: { Cultural: 'ਸੱਭਿਆਚਾਰਕ ਸਥਾਨ', Natural: 'ਕੁਦਰਤੀ ਸਥਾਨ', Mixed: 'ਮਿਸ਼ਰਤ ਸਥਾਨ' },
    aboutPrefix: 'ਇਸ ਸਥਾਨ ਬਾਰੇ ਜਾਣਕਾਰੀ',
    significancePrefix: 'ਇਤਿਹਾਸਕ ਅਤੇ ਸੱਭਿਆਚਾਰਕ ਮਹੱਤਤਾ',
    factsPrefix: 'ਦਿਲਚਸਪ ਤੱਥ',
    country: 'ਭਾਰਤ',
  }
};

// Specialized translations for curated flagship monuments
const FLAGSHIP_TRANSLATIONS: Record<number, Record<string, {
  name: string;
  about: string;
  significance: string;
  facts: string[];
}>> = {
  // Taj Mahal (id: 4)
  4: {
    'te-IN': {
      name: 'తాజ్ మహల్',
      about: 'తాజ్ మహల్ ఉత్తరప్రదేశ్ లోని ఆగ్రా నగరంలో యమునా నది ఒడ్డున తెల్లని పాలరాతితో నిర్మించబడిన ప్రపంచ ప్రసిద్ధ సమాధి. మొఘల్ చక్రవర్తి షాజహాన్ తన ప్రియమైన భార్య ముంతాజ్ మహల్ జ్ఞాపకార్థం 1631 లో దీని నిర్మాణం ప్రారంభించారు. ఇది భారతీయ, పర్షియన్ మరియు ఇస్లామిక్ నిర్మాణ శైలుల అద్భుత కలయిక.',
      significance: 'ప్రపంచంలోని ఏడు వింతలలో ఒకటిగా, పాలరాతి పీత్రా డూరా నగిషీ కళకు మరియు మానవ ప్రేమకు చిరస్మరణీయ ప్రతీకగా నిలిచింది.',
      facts: [
        'సూర్యోదయంలో లేత గులాబీ రంగులో, పగలు తెల్లగా, వెన్నెల రాత్రులలో బంగారు రంగులో కాంతులీనుతుంది.',
        'ప్రధాన ద్వారం గుండా లోపలికి వచ్చే కొద్దీ స్మారకం దగ్గరగా కాకుండా దూరం జరిగినట్లు అనిపించే దృశ్య భ్రమ కలుగుతుంది.',
        'ఇరవై వేల మంది శిల్పులు మరియు వెయ్యి ఏనుగులతో 22 సంవత్సరాల పాటు నిర్మించారు.'
      ]
    },
    'hi-IN': {
      name: 'ताज महल',
      about: 'ताज महल उत्तर प्रदेश के आगरा में यमुना नदी के दाहिने तट पर सफेद संगमरमर से बना एक विश्व प्रसिद्ध मकबरा है। इसे पांचवें मुगल सम्राट शाहजहाँ ने अपनी बेगम मुमताज़ महल की याद में 1631 में बनवाया था। यह भारतीय, फारसी और इस्लामी वास्तुकला शैलियों का अनुपम संगम है।',
      significance: 'विश्व धरोहर की अद्वितीय कृति और संगमरमर जड़ाई कला (पिएत्रा ड्यूरा) का उत्कृष्ट उदाहरण।',
      facts: [
        'दिन के अलग-अलग समय पर इसका रंग बदलता है—सुबह गुलाबी, दोपहर में सफेद और चांदनी रात में सुनहरा।',
        'इसके चारों मीनारों को बाहर की ओर हल्का झुकाव दिया गया है ताकि भूकंप में मुख्य गुंबद सुरक्षित रहे।',
        'इसके निर्माण में 20,000 से अधिक कारीगरों और 1,000 हाथियों का उपयोग किया गया था।'
      ]
    },
    'ta-IN': {
      name: 'தாஜ்மஹால்',
      about: 'தாஜ்மஹால் உத்தரபிரதேச மாநிலம் ஆக்ராவில் யமுனை நதிக்கரையில் அமைந்துள்ள உலகப் புகழ்பெற்ற வெள்ளை பளிங்கு நினைவுச்சின்னமாகும். முகலாயப் பேரரசர் ஷாஜஹான் தனது மனைவி மும்தாஜ் நினைவாக 1631 இல் இதை நிர்மாணித்தார். இது முகலாய கட்டிடக்கலையின் உச்சக்கட்ட சாதனையாகும்.',
      significance: 'உலக பாரம்பரியத்தின் தலைசிறந்த கலைப்படைப்பு மற்றும் அழியாத காதலின் சின்னம்.',
      facts: [
        'சூரிய உதயத்தில் இளஞ்சிவப்பாகவும், மாலையில் பால் வெள்ளையாகவும், நிலவொளியில் தங்க நிறமாகவும் காட்சியளிக்கிறது.',
        '20,000 க்கும் மேற்பட்ட கைவினைஞர்கள் 22 ஆண்டுகள் கடினமாக உழைத்து இதை உருவாக்கினர்.',
        'முழு வளாகமும் துல்லியமான சமச்சீர் வடிவமைப்புடன் கட்டப்பட்டுள்ளது.'
      ]
    },
    'kn-IN': {
      name: 'ತಾಜ್ ಮಹಲ್',
      about: 'ತಾಜ್ ಮಹಲ್ ಉತ್ತರ ಪ್ರದೇಶದ ಆಗ್ರಾದಲ್ಲಿ ಯಮುನಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿರುವ ಭವ್ಯವಾದ ಬಿಳಿ ಅಮೃತಶಿಲೆಯ ಸಮಾಧಿಯಾಗಿದೆ. ಮೊಘಲ್ ಚಕ್ರವರ್ತಿ ಷಹಜಹಾನ್ ತನ್ನ ಪ್ರೀತಿಯ ಪತ್ನಿ ಮುಮ್ತಾಜ್ ಮಹಲ್ ನೆನಪಿಗಾಗಿ 1631 ರಲ್ಲಿ ಇದನ್ನು ನಿರ್ಮಿಸಿದನು.',
      significance: 'ಜಾಗತಿಕ ಪರಂಪರೆಯ ಶ್ರೇಷ್ಠ ಕಲಾಕೃತಿ ಮತ್ತು ಪ್ರೀತಿಯ ಅನನ್ಯ ಸಂಕೇತ.',
      facts: [
        'ದಿನದ ವಿವಿಧ ಸಮಯಗಳಲ್ಲಿ ಅಮೃತಶಿಲೆಯ ಬಣ್ಣವು ಬದಲಾಗುವಂತೆ ಭಾಸವಾಗುತ್ತದೆ.',
        'ಇಪ್ಪತ್ತು ಸಾವಿರಕ್ಕೂ ಹೆಚ್ಚು ಶಿಲ್ಪಿಗಳು ಮತ್ತು ಕುಶಲಕರ್ಮಿಗಳು ಇದನ್ನು ನಿರ್ಮಿಸಿದರು.',
        'ಸಂಕೀರ್ಣದ ಮುಖ್ಯ ಗೋಪುರಗಳು ಭೂಕಂಪದಿಂದ ಮುಖ್ಯ ಸಮಾಧಿಯನ್ನು ರಕ್ಷಿಸಲು ಹೊರಮುಖವಾಗಿ ವಾಲಿವೆ.'
      ]
    },
    'ml-IN': {
      name: 'താജ് മഹൽ',
      about: 'ഉത്തർപ്രദേശിലെ ആഗ്രയിൽ യമുനാ നദിയുടെ തീരത്ത് സ്ഥിതി ചെയ്യുന്ന ലോകപ്രസിദ്ധ വെണ്ണക്കൽ സ്മാരകമാണ് താജ് മഹൽ. മുഗൾ ചക്രവർത്തി ഷാജഹാൻ തന്റെ പത്നി മുംതാസ് മഹലിന്റെ ഓർമ്മയ്ക്കായി നിർമ്മിച്ചതാണ് ഈ അത്ഭുത നിർമ്മിതി.',
      significance: 'ലോക പൈതൃകത്തിന്റെ അമൂല്യ രത്നവും അനശ്വര പ്രണയത്തിന്റെ പ്രതീകവും.',
      facts: [
        'രാവിലെ ഇളം പിങ്ക് നിറത്തിലും, രാത്രിയിൽ വെള്ളി വെളിച്ചത്തിലും ഇത് തിളങ്ങുന്നു.',
        '20,000-ലധികം ശില്പികളും തൊഴിലാളികളും ചേർന്നാണ് ഇത് പണിതീർത്തത്.',
        'പൂർണ്ണമായും സമമിതി പാലിച്ചുകൊണ്ടുള്ള അതിശയകരമായ വാസ്തുവിദ്യ.'
      ]
    },
    'bn-IN': {
      name: 'তাজমহল',
      about: 'তাজমহল ভারতের উত্তরপ্রদেশের আগ্রায় যমুনা নদীর তীরে অবস্থিত একটি বিশ্ববিখ্যাত শ্বেত মার্বেল সমাধিস্তম্ভ। সম্রাট শাহজাহান তাঁর প্রিয় স্ত্রী মমতাজ মহলের স্মৃতির উদ্দেশ্যে ১৬৩১ সালে এটি নির্মাণ করেন।',
      significance: 'বিশ্ব ঐতিহ্যের অনন্য মাস্টারপিস এবং কালজয়ী প্রেমের প্রতীক।',
      facts: [
        'ভোরের আলোয় এটি গোলাপি আভা ধারণ করে এবং পূর্ণিমার রাতে সোনালি দেখায়।',
        'নির্মাণকাজে বিশ হাজারেরও বেশি কারিগর ২২ বছর সময় নিয়েছিলেন।',
        'চারটি মিনার সামান্য বাইরের দিকে হেলানো যাতে ভূমিকম্পের সময় মূল গম্বুজ রক্ষা পায়।'
      ]
    },
    'mr-IN': {
      name: 'ताजमहल',
      about: 'ताजमहल हे उत्तर प्रदेशातील आग्रा येथे यमुना नदीकाठी पांढऱ्या संगमरवरात उभारलेले जगप्रसिद्ध स्मारक आहे. मुघल सम्राट शाहजहान यांनी आपली बेगम मुमताज महल यांच्या स्मृतीप्रित्यर्थ १६३१ मध्ये हे बांधले.',
      significance: 'मुघल स्थापत्यकलेचा कळस आणि जगभरातील पर्यटकांचे आकर्षण केंद्र.',
      facts: [
        'दिवसाच्या वेगवेगळ्या प्रहरी संगमरवराचे रंग बदलताना भासतात.',
        '२० हजार कारागीर आणि १ हजार हत्तींच्या मदतीने २२ वर्षे बांधकाम चालले.',
        'सुंदर बाग आणि कारंज्यांसह सममितीचे उत्कृष्ट उदाहरण.'
      ]
    },
    'gu-IN': {
      name: 'તાજમહેલ',
      about: 'તાજમહેલ ઉત્તર પ્રદેશના આગ્રામાં યમુના નદીના કિનારે આવેલું સફેદ આરસપહાણનું વિશ્વ પ્રસિદ્ધ સ્મારક છે. મુઘલ સમ્રાટ શાહજહાંએ તેમની પત્ની મુમતાઝ મહેલની યાદમાં ૧૬૩૧ માં તેનું નિર્માણ કરાવ્યું હતું.',
      significance: 'વિશ્વ વારસાની અદભૂત કૃતિ અને અખંડ પ્રેમના પ્રતીકરૂપ વાસ્તુશિલ્પ.',
      facts: [
        'સવારના સમયે આછો ગુલાબી અને પૂનમની રાત્રે સુવર્ણ રંગ જેવો દેખાય છે.',
        '૨૦ હજારથી વધુ શિલ્પીઓએ ૨૨ વર્ષ સુધી અથાક મહેનત કરી હતી.',
        'સંપૂર્ણ સમપ્રમાણતા ધરાવતું મોહક મુઘલ સ્થાપત્ય.'
      ]
    },
    'pa-IN': {
      name: 'ਤਾਜ ਮਹਿਲ',
      about: 'ਤਾਜ ਮਹਿਲ ਉੱਤਰ ਪ੍ਰਦੇਸ਼ ਦੇ ਆਗਰਾ ਵਿੱਚ ਯਮੁਨਾ ਨਦੀ ਦੇ ਕੰਢੇ ਚਿੱਟੇ ਸੰਗਮਰਮਰ ਨਾਲ ਬਣਿਆ ਇੱਕ ਵਿਸ਼ਵ ਪ੍ਰਸਿੱਧ ਮਕਬਰਾ ਹੈ। ਮੁਗ਼ਲ ਬਾਦਸ਼ਾਹ ਸ਼ਾਹਜਹਾਂ ਨੇ ਆਪਣੀ ਬੇਗਮ ਮੁਮਤਾਜ਼ ਮਹਿਲ ਦੀ ਯਾਦ ਵਿੱਚ 1631 ਵਿੱਚ ਇਸਨੂੰ ਬਣਵਾਇਆ ਸੀ।',
      significance: 'ਵਿਸ਼ਵ ਵਿਰਾਸਤ ਦਾ ਅਦੁੱਤੀ ਮਾਸਟਰਪੀਸ ਅਤੇ ਅਮਰ ਪਿਆਰ ਦੀ ਨਿਸ਼ਾਨੀ।',
      facts: [
        'ਦਿਨ ਦੇ ਵੱਖ-ਵੱਖ ਸਮਿਆਂ ਤੇ ਇਸਦਾ ਰੰਗ ਬਦਲਦਾ ਨਜ਼ਰ ਆਉਂਦਾ ਹੈ।',
        '20,000 ਤੋਂ ਵੱਧ ਕਾਰੀਗਰਾਂ ਨੇ ਲਗਭਗ 22 ਸਾਲ ਕੰਮ ਕੀਤਾ।',
        'ਇਸਦੇ ਚਾਰੇ ਮੀਨਾਰ ਭੂਚਾਲ ਤੋਂ ਬਚਾਅ ਲਈ ਬਾਹਰ ਵੱਲ ਝੁਕੇ ਹੋਏ ਹਨ।'
      ]
    }
  },

  // Hampi (id: 12)
  12: {
    'te-IN': {
      name: 'హంపి స్మారక సమూహం',
      about: 'హంపి కర్ణాటకలోని తుంగభద్ర నది ఒడ్డున విస్తరించిన విజయనగర సామ్రాజ్య చారిత్రక రాజధాని. 14వ శతాబ్దంలో ప్రపంచంలోనే అత్యంత సంపన్న నగరాలలో ఒకటిగా విలసిల్లింది. ఇక్కడ రాతి రథం, విరూపాక్ష ఆలయం, సంగీత స్తంభాలు గల విఠల దేవాలయం ఉన్నాయి.',
      significance: 'మధ్యయుగ దక్షిణ భారతదేశ వైభవాన్ని చాటే రాతి శిల్పకళా భాండాగారం.',
      facts: [
        'విఠల ఆలయంలోని 56 సంగీత స్తంభాలను సున్నితంగా తడితే సప్తస్వరాలు ప్రతిధ్వనిస్తాయి.',
        'హంపి రాతి రథం భారత ₹50 కరెన్సీ నోటుపై ముద్రించబడింది.',
        'తుంగభద్ర నది తీరంలోని భారీ గ్రానైట్ కొండల మధ్య 4,000 హెక్టార్లలో విస్తరించి ఉంది.'
      ]
    },
    'hi-IN': {
      name: 'हम्पी के स्मारक समूह',
      about: 'हम्पी कर्नाटक में तुंगभद्रा नदी के तट पर स्थित 14वीं शताब्दी के विजयनगर साम्राज्य की भव्य राजधानी है। यह अपने विशाल एकाश्म रथ, विरूपाक्ष मंदिर, और अद्वितीय वास्तुकला के लिए विश्व प्रसिद्ध है।',
      significance: 'मध्यकालीन भारत के सबसे समृद्ध हिंदू साम्राज्य की गौरवशाली राजधानी।',
      facts: [
        'विजय विट्ठल मंदिर के खंभों को थपथपाने पर मधुर संगीत स्वर निकलते हैं।',
        'प्रसिद्ध पत्थर का रथ भारत के ₹50 के नए नोट पर अंकित है।',
        'हम्पी में 1,600 से अधिक जीवित और पुरातात्विक मंदिर व स्मारक मौजूद हैं।'
      ]
    },
    'ta-IN': {
      name: 'ஹம்பி நினைவுச்சின்னங்கள்',
      about: 'ஹம்பி கர்நாடகாவில் துங்கபத்ரா நதிக்கரையில் அமைந்துள்ள புகழ்பெற்ற விஜயநகரப் பேரரசின் தலைநகரமாகும். 14 ஆம் நூற்றாண்டில் உலகிலேயே மிகப்பெரிய மற்றும் பணக்கார நகரங்களில் ஒன்றாக திகழ்ந்தது.',
      significance: 'தென்னிந்திய திராவிட கட்டிடக்கலை மற்றும் பேரரசு பாரம்பரியத்தின் உச்சம்.',
      facts: [
        'விஜய விட்டலா கோவிலில் உள்ள இசைத் தூண்கள் மெல்லிய ஒலியை எழுப்புகின்றன.',
        'இங்குள்ள கல் ரதம் இந்திய ₹50 ரூபாய் நோட்டில் இடம்பெற்றுள்ளது.',
        'சுமார் 4,000 ஹெக்டேர் பரப்பளவில் பாறைகள் நிறைந்த நிலப்பரப்பில் அமைந்துள்ளது.'
      ]
    },
    'kn-IN': {
      name: 'ಹಂಪಿ ಸ್ಮಾರಕಗಳ ಸಮೂಹ',
      about: 'ಹಂಪಿ ಕರ್ನಾಟಕದ ಬಳ್ಳಾರಿ/ವಿಜಯನಗರ ಜಿಲ್ಲೆಯ ತುಂಗಭದ್ರಾ ನದಿಯ ದಡದಲ್ಲಿರುವ 14ನೇ ಶತಮಾನದ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಭವ್ಯ ರಾಜಧಾನಿಯಾಗಿದೆ. ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಕಂಬಗಳ ವಿಜಯ ವಿಠ್ಠಲ ದೇವಾಲಯ ಇಲ್ಲಿವೆ.',
      significance: 'ಕರ್ನಾಟಕದ ಹಾಗೂ ಭಾರತದ ವೈಭವೋಪೇತ ಇತಿಹಾಸದ ಜೀವಂತ ಶಿಲಾಕಾವ್ಯ.',
      facts: [
        'ವಿಜಯ ವಿಠ್ಠಲ ದೇಗುಲದ 56 ಕಂಬಗಳು ಸಂಗೀತದ ಸಪ್ತಸ್ವರಗಳನ್ನು ಹೊರಹೊಮ್ಮಿಸುತ್ತವೆ.',
        'ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥವು ಭಾರತೀಯ 50 ರೂಪಾಯಿ ನೋಟಿನ ಮೇಲಿದೆ.',
        'ವಿಶ್ವದ ಅತಿ ದೊಡ್ಡ ತೆರೆದ ವಸ್ತುಸಂಗ್ರಹಾಲಯಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.'
      ]
    },
    'ml-IN': {
      name: 'ഹംപി സ്മാരക സമുച്ചയം',
      about: 'കർണാടകയിലെ തുംഗഭദ്ര നദിക്കരയിൽ സ്ഥിതി ചെയ്യുന്ന 14-ാം നൂറ്റാണ്ടിലെ വിജയനഗര സാമ്രാജ്യത്തിന്റെ തലസ്ഥാനമാണ് ഹംപി. ശിലാ രഥവും വിരൂപാക്ഷ ക്ഷേത്രവും ഇതിന്റെ മുഖമുദ്രയാണ്.',
      significance: 'മധ്യകാല ദക്ഷിണേന്ത്യൻ വാസ്തുവിദ്യയുടെ വിസ്മയകരമായ സ്മാരകം.',
      facts: [
        'സംഗീത തൂണുകളിൽ തട്ടുമ്പോൾ സപ്തസ്വരങ്ങൾ പ്രതിധ്വനിക്കുന്നു.',
        'ഇന്ത്യൻ 50 രൂപ നോട്ടിൽ ഹംപിയിലെ കല്ല് രഥം ആലേഖനം ചെയ്തിരിക്കുന്നു.',
        'വിശാലമായ ഗ്രാനൈറ്റ് ശിലകൾ നിറഞ്ഞ പ്രകൃതിഭംഗി.'
      ]
    },
    'bn-IN': {
      name: 'হাম্পির স্থাপত্য নিদর্শন',
      about: 'হাম্পি কর্ণাটকের তুঙ্গভদ্রা নদীর তীরে অবস্থিত চতুর্দশ শতাব্দীর বিজয়নগর সাম্রাজ্যের রাজধানী। এটি পাথর খোদাই করা রথ ও বিরূপাক্ষ মন্দিরের জন্য বিশ্বজুড়ে প্রসিদ্ধ।',
      significance: 'মধ্যযুগীয় হিন্দু সাম্রাজ্যের প্রত্নতাত্ত্বিক ঐশ্বর্যের প্রতীক।',
      facts: [
        'সঙ্গীত স্তম্ভে আলতো টোকা দিলে সুরের অনুরণন সৃষ্টি হয়।',
        'ভারতীয় ৫০ টাকার নোটে এখানকার বিখ্যাত পাথরের রথের ছবি রয়েছে।',
        'চার হাজার হেক্টরেরও বেশি এলাকা জুড়ে বিস্তৃত প্রাচীন ধ্বংসাবশেষ।'
      ]
    },
    'mr-IN': {
      name: 'हम्पी स्मारक समूह',
      about: 'हम्पी हे कर्नाटक राज्यातील तुंगभद्रा नदीच्या काठी वसलेले १४ व्या शतकातील विजयनगर साम्राज्याचे वैभवशाली राजधानीचे शहर होते. येथील विरूपाक्ष मंदिर आणि दगडी रथ प्रसिद्ध आहेत.',
      significance: 'प्राचीन भारतीय शिल्पकलेचे आणि वास्तुशास्त्राचे उत्कृष्ट संकुल.',
      facts: [
        'येथील संगीतमय खांबांना हलकेच वाजवल्यास सूर ऐकू येतात.',
        'भारताच्या ५० रुपयांच्या नोटेवर हम्पीच्या दगडी रथाचे चित्र आहे.',
        'भव्य शिळा आणि टेकड्यांनी वेढलेला निसर्गरम्य परिसर.'
      ]
    },
    'gu-IN': {
      name: 'હમ્પી સ્મારક સમૂહ',
      about: 'હમ્પી કર્ણાટકમાં તુંગભદ્રા નદીના તટે આવેલું ૧૪મી સદીના વિજયનગર સામ્રાજ્યનું ઐતિહાસિક પાટનગર છે. તે પથ્થરના રથ અને વિરૂપાક્ષ મંદિર માટે જાણીતું છે.',
      significance: 'મધ્યકાલીન ભારતીય હિન્દુ વાસ્તુશિલ્પની અનોખી ધરોહર.',
      facts: [
        'સંગીતના સ્તંભોમાંથી મધુર સૂર નીકળે છે.',
        'ભારતીય ૫૦ રૂપિયાની ચલણી નોટ પર પથ્થરનો રથ છાપવામાં આવ્યો છે.',
        'વિશાળ પથ્થરો વચ્ચે પથરાયેલું પ્રાચીન નગર.'
      ]
    },
    'pa-IN': {
      name: 'ਹੰਪੀ ਸਮਾਰਕ ਸਮੂਹ',
      about: 'ਹੰਪੀ ਕਰਨਾਟਕ ਵਿੱਚ ਤੁੰਗਭਦਰਾ ਨਦੀ ਦੇ ਕੰਢੇ ਸਥਿਤ 14ਵੀਂ ਸਦੀ ਦੇ ਵਿਜੈਨਗਰ ਸਾਮਰਾਜ ਦੀ ਸ਼ਾਨਦਾਰ ਰਾਜਧਾਨੀ ਹੈ। ਇਸਦੇ ਪੱਥਰ ਦੇ ਰਥ ਅਤੇ ਮੰਦਰ ਬੇਹੱਦ ਮਸ਼ਹੂਰ ਹਨ।',
      significance: 'ਦੱਖਣੀ ਭਾਰਤ ਦੀ ਸ਼ਾਨਦਾਰ ਇਤਿਹਾਸਕ ਤੇ ਸੱਭਿਆਚਾਰਕ ਵਿਰਾਸਤ।',
      facts: [
        'ਸੰਗੀਤਕ ਥੰਮ੍ਹਾਂ ਵਿੱਚੋਂ ਸੱਤ ਸੁਰਾਂ ਦੀ ਗੂੰਜ ਸੁਣਾਈ ਦਿੰਦੀ ਹੈ।',
        'ਭਾਰਤੀ ₹50 ਦੇ ਨਵੇਂ ਨੋਟ ਤੇ ਹੰਪੀ ਦਾ ਪੱਥਰੀ ਰਥ ਛਪਿਆ ਹੈ।',
        'ਹਜ਼ਾਰਾਂ ਏਕੜ ਵਿੱਚ ਫੈਲੀ ਸ਼ਾਨਦਾਰ ਵਿਰਾਸਤ।'
      ]
    }
  }
};

/**
 * Generates natural-sounding speech and text narration in the requested language
 */
export function getHeritageNarration(site: HeritageSite, langCode: string): {
  audioText: string;
  title: string;
  aboutText: string;
  significanceText: string;
  factsList: string[];
  langCode: string;
} {
  const normLang = LANGUAGE_CODE_MAP[langCode.split('-')[0]] || langCode || 'en-IN';
  const templates = LANGUAGE_TEMPLATES[normLang] || LANGUAGE_TEMPLATES['en-IN'];

  // Complete dedicated Hindi dossier for all UNESCO sites
  if (normLang === 'hi-IN') {
    const hindiDossier = HINDI_HERITAGE_DOSSIERS[site.id];
    if (hindiDossier) {
      const factsCombined = hindiDossier.facts.join('। ');
      const audio = `${hindiDossier.name}। ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}। ${templates.inscribedIn} ${site.year} में शामिल। यूनेस्को ${templates.typeLabels[site.type]}। ${templates.aboutPrefix}: ${hindiDossier.about}। ${templates.significancePrefix}: ${hindiDossier.significance}। ${templates.factsPrefix}: ${factsCombined}।`;
      return {
        audioText: audio,
        title: hindiDossier.name,
        aboutText: hindiDossier.about,
        significanceText: hindiDossier.significance,
        factsList: hindiDossier.facts,
        langCode: 'hi-IN',
      };
    }
  }

  // Complete dedicated Marathi dossier for all UNESCO sites
  if (normLang === 'mr-IN') {
    const marathiDossier = MARATHI_HERITAGE_DOSSIERS[site.id];
    if (marathiDossier) {
      const factsCombined = marathiDossier.facts.join('। ');
      const audio = `${marathiDossier.name}। ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}। ${templates.inscribedIn} ${site.year} मध्ये समावेश। युनेस्को ${templates.typeLabels[site.type]}। ${templates.aboutPrefix}: ${marathiDossier.about}। ${templates.significancePrefix}: ${marathiDossier.significance}। ${templates.factsPrefix}: ${factsCombined}।`;
      return {
        audioText: audio,
        title: marathiDossier.name,
        aboutText: marathiDossier.about,
        significanceText: marathiDossier.significance,
        factsList: marathiDossier.facts,
        langCode: 'mr-IN',
      };
    }
  }

  // Complete dedicated Malayalam dossier for all UNESCO sites
  if (normLang === 'ml-IN') {
    const malayalamDossier = MALAYALAM_HERITAGE_DOSSIERS[site.id];
    if (malayalamDossier) {
      const factsCombined = malayalamDossier.facts.join('. ');
      const audio = `${malayalamDossier.name}. ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}. ${templates.inscribedIn} ${site.year}. യുനെസ്കോ ${templates.typeLabels[site.type]}. ${templates.aboutPrefix}: ${malayalamDossier.about}. ${templates.significancePrefix}: ${malayalamDossier.significance}. ${templates.factsPrefix}: ${factsCombined}.`;
      return {
        audioText: audio,
        title: malayalamDossier.name,
        aboutText: malayalamDossier.about,
        significanceText: malayalamDossier.significance,
        factsList: malayalamDossier.facts,
        langCode: 'ml-IN',
      };
    }
  }

  // Complete dedicated Tamil dossier for all UNESCO sites
  if (normLang === 'ta-IN') {
    const tamilDossier = TAMIL_HERITAGE_DOSSIERS[site.id];
    if (tamilDossier) {
      const factsCombined = tamilDossier.facts.join('. ');
      const audio = `${tamilDossier.name}. ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}. ${templates.inscribedIn} ${site.year}. யுனெஸ்கோ ${templates.typeLabels[site.type]}. ${templates.aboutPrefix}: ${tamilDossier.about}. ${templates.significancePrefix}: ${tamilDossier.significance}. ${templates.factsPrefix}: ${factsCombined}.`;
      return {
        audioText: audio,
        title: tamilDossier.name,
        aboutText: tamilDossier.about,
        significanceText: tamilDossier.significance,
        factsList: tamilDossier.facts,
        langCode: 'ta-IN',
      };
    }
  }

  // Complete dedicated Telugu dossier for all UNESCO sites
  if (normLang === 'te-IN') {
    const teluguDossier = TELUGU_HERITAGE_DOSSIERS[site.id];
    if (teluguDossier) {
      const factsCombined = teluguDossier.facts.join('. ');
      const audio = `${teluguDossier.name}. ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}. ${templates.inscribedIn} ${site.year}. యునెస్కో ${templates.typeLabels[site.type]}. ${templates.aboutPrefix}: ${teluguDossier.about}. ${templates.significancePrefix}: ${teluguDossier.significance}. ${templates.factsPrefix}: ${factsCombined}.`;
      return {
        audioText: audio,
        title: teluguDossier.name,
        aboutText: teluguDossier.about,
        significanceText: teluguDossier.significance,
        factsList: teluguDossier.facts,
        langCode: 'te-IN',
      };
    }
  }

  // Complete dedicated Kannada dossier for all UNESCO sites
  if (normLang === 'kn-IN') {
    const kannadaDossier = KANNADA_HERITAGE_DOSSIERS[site.id];
    if (kannadaDossier) {
      const factsCombined = kannadaDossier.facts.join('. ');
      const audio = `${kannadaDossier.name}. ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}. ${templates.inscribedIn} ${site.year}. ಯುನೆಸ್ಕೋ ${templates.typeLabels[site.type]}. ${templates.aboutPrefix}: ${kannadaDossier.about}. ${templates.significancePrefix}: ${kannadaDossier.significance}. ${templates.factsPrefix}: ${factsCombined}.`;
      return {
        audioText: audio,
        title: kannadaDossier.name,
        aboutText: kannadaDossier.about,
        significanceText: kannadaDossier.significance,
        factsList: kannadaDossier.facts,
        langCode: 'kn-IN',
      };
    }
  }

  // Complete dedicated Bengali dossier for all UNESCO sites
  if (normLang === 'bn-IN') {
    const bengaliDossier = BENGALI_HERITAGE_DOSSIERS[site.id];
    if (bengaliDossier) {
      const factsCombined = bengaliDossier.facts.join('। ');
      const audio = `${bengaliDossier.name}। ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}। ${templates.inscribedIn} ${site.year}। ইউনেস্কো ${templates.typeLabels[site.type]}। ${templates.aboutPrefix}: ${bengaliDossier.about}। ${templates.significancePrefix}: ${bengaliDossier.significance}। ${templates.factsPrefix}: ${factsCombined}।`;
      return {
        audioText: audio,
        title: bengaliDossier.name,
        aboutText: bengaliDossier.about,
        significanceText: bengaliDossier.significance,
        factsList: bengaliDossier.facts,
        langCode: 'bn-IN',
      };
    }
  }

  // Complete dedicated Gujarati dossier for all UNESCO sites
  if (normLang === 'gu-IN') {
    const gujaratiDossier = GUJARATI_HERITAGE_DOSSIERS[site.id];
    if (gujaratiDossier) {
      const factsCombined = gujaratiDossier.facts.join('. ');
      const audio = `${gujaratiDossier.name}. ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}. ${templates.inscribedIn} ${site.year}. યુનેસ્કો ${templates.typeLabels[site.type]}. ${templates.aboutPrefix}: ${gujaratiDossier.about}. ${templates.significancePrefix}: ${gujaratiDossier.significance}. ${templates.factsPrefix}: ${factsCombined}.`;
      return {
        audioText: audio,
        title: gujaratiDossier.name,
        aboutText: gujaratiDossier.about,
        significanceText: gujaratiDossier.significance,
        factsList: gujaratiDossier.facts,
        langCode: 'gu-IN',
      };
    }
  }

  // Check if we have dedicated flagship translation
  const flagship = FLAGSHIP_TRANSLATIONS[site.id]?.[normLang];
  if (flagship) {
    const factsCombined = flagship.facts.join('. ');
    const audio = `${flagship.name}। ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}। ${templates.inscribedIn} ${site.year}। ${templates.typeLabels[site.type]}। ${templates.aboutPrefix}: ${flagship.about}। ${templates.significancePrefix}: ${flagship.significance}। ${templates.factsPrefix}: ${factsCombined}।`;
    return {
      audioText: audio,
      title: flagship.name,
      aboutText: flagship.about,
      significanceText: flagship.significance,
      factsList: flagship.facts,
      langCode: normLang,
    };
  }

  // English default
  if (normLang === 'en-IN') {
    const factsCombined = site.facts && site.facts.length > 0 ? site.facts.join('. ') : site.shortNote;
    const audio = `${site.name}. Located in ${site.location || site.state}, India. Inscribed as a UNESCO ${site.type} World Heritage Site in ${site.year}. About the site: ${site.description}. Historical and cultural significance: ${site.significance}. Interesting facts: ${factsCombined}`;
    return {
      audioText: audio,
      title: site.name,
      aboutText: site.description,
      significanceText: site.significance,
      factsList: site.facts || [site.shortNote],
      langCode: 'en-IN',
    };
  }

  // Multilingual synthesis based on structured language templates
  const localizedTitle = `${site.name} (${templates.typeLabels[site.type]})`;
  const factsCombined = site.facts && site.facts.length > 0 ? site.facts.join('. ') : site.shortNote;

  const audio = `${site.name}। ${templates.locationPrefix} ${site.location || site.state}, ${templates.country}। ${templates.inscribedIn} ${site.year}। ${templates.typeLabels[site.type]}। ${templates.aboutPrefix}: ${site.description}। ${templates.significancePrefix}: ${site.significance}। ${templates.factsPrefix}: ${factsCombined}।`;

  return {
    audioText: audio,
    title: localizedTitle,
    aboutText: site.description,
    significanceText: site.significance,
    factsList: site.facts || [site.shortNote],
    langCode: normLang,
  };
}

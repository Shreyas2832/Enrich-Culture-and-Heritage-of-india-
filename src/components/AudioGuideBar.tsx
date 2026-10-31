import { useEffect, useState, useMemo } from 'react';
import { Volume2, Play, Pause, RotateCcw, Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { speechManager, SpeechState } from '../utils/speech';
import { SUPPORTED_LANGUAGES, getHeritageNarration } from '../utils/heritageTranslations';
import { HeritageSite } from '../data/heritageSites';

interface AudioGuideBarProps {
  textToSpeak?: string;
  site?: HeritageSite;
  label?: string;
  className?: string;
  compact?: boolean;
  defaultLanguage?: string;
  onLanguageChange?: (langCode: string) => void;
}

export function AudioGuideBar({
  textToSpeak,
  site,
  label = "Audio Narration Guide",
  className = "",
  compact = false,
  defaultLanguage = "en-IN",
  onLanguageChange,
}: AudioGuideBarProps) {
  const [speechState, setSpeechState] = useState<SpeechState>(speechManager.getState());
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [showScriptPreview, setShowScriptPreview] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = speechManager.subscribe((state) => {
      setSpeechState(state);
    });
    return () => unsubscribe();
  }, []);

  // Compute translated narration if a site object is supplied, or fallback to text
  const currentNarration = useMemo(() => {
    if (site) {
      return getHeritageNarration(site, selectedLanguage);
    }
    // If standalone overview narration and Hindi is selected, provide authentic Hindi audio text
    if (selectedLanguage === 'hi-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('भारत'));
      if (isOverview) {
        return {
          audioText: "भारत केवल एक भौगोलिक सीमा नहीं है; यह निरंतरता, बहुलवाद और स्थापत्य कला का पांच सहस्राब्दियों का गहरा दर्शन है। उत्तर के वैदिक मंत्रों और वाराणसी के पावन गंगा घाटों से लेकर दक्षिण के उत्तुंग द्रविड़ मंदिरों तक, भारतीय सांस्कृतिक विरासत कला, शिल्प और आध्यात्मिकता का एक जीवंत अभयारण्य है। 45 यूनेस्को विश्व धरोहर स्थलों का घर, भारत प्राचीन आध्यात्मिक चेतना को विश्व इतिहास के स्मारकों से जोड़ता है।",
          title: "आधिकारिक ध्वनि विवरण: भारतीय सभ्यता और विरासत का अवलोकन",
          aboutText: "भारत की पांच हजार वर्ष पुरानी सांस्कृतिक और ऐतिहासिक धरोहर का प्रामाणिक विवरण।",
          significanceText: "सांस्कृतिक निरंतरता और 45 यूनेस्को विश्व धरोहर स्थलों का वैश्विक महत्व।",
          factsList: ["भारत में 34 सांस्कृतिक, 10 प्राकृतिक और 1 मिश्रित विश्व धरोहर स्थल हैं।"],
          langCode: 'hi-IN',
        };
      }
    }
    // If standalone overview narration and Marathi is selected, provide authentic Marathi audio text
    if (selectedLanguage === 'mr-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('भारत'));
      if (isOverview) {
        return {
          audioText: "भारत ही केवळ एक भौगोलिक सीमा नाही; हे सातत्य, बहुलवाद आणि स्थापत्यकलेचे पाच हजार वर्षांचे सखोल दर्शन आहे. उत्तरेकडील वैदिक ऋचा आणि वाराणसीच्या पवित्र गंगा घाटांपासून ते दक्षिणेकडील उत्तुंग द्रविड मंदिरांपर्यंत, भारतीय सांस्कृतिक वारसा कला, शिल्प आणि अध्यात्माचे एक जिवंत केंद्र आहे. 45 युनेस्को जागतिक वारसा स्थळांचे माहेरघर असलेला भारत प्राचीन आध्यात्मिक जाणिवांना जागतिक इतिहासाशी जोडतो.",
          title: "अधिकृत ध्वनी विवरण: भारतीय सभ्यता आणि वारशाचा आढावा",
          aboutText: "भारताच्या पाच हजार वर्षांच्या सांस्कृतिक आणि ऐतिहासिक वारशाचे प्रामाणिक विवरण.",
          significanceText: "सांस्कृतिक सातत्य आणि 45 युनेस्को जागतिक वारसा स्थळांचे जागतिक महत्त्व.",
          factsList: ["भारतात 34 सांस्कृतिक, 10 नैसर्गिक आणि 1 मिश्र जागतिक वारसा स्थळे आहेत."],
          langCode: 'mr-IN',
        };
      }
    }
    // If standalone overview narration and Malayalam is selected, provide authentic Malayalam audio text
    if (selectedLanguage === 'ml-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('ഭാരതം') || textToSpeak.includes('ഇന്ത്യ'));
      if (isOverview) {
        return {
          audioText: "ഭാരതം കേവലം ഒരു ഭൂമിശാസ്ത്രപരമായ അതിർത്തിയല്ല; അത് അയ്യായിരം വർഷത്തെ പൈതൃകത്തിന്റെയും സാംസ്കാരിക വൈവിധ്യത്തിന്റെയും വാസ്തുവിദ്യാ വിസ്മയങ്ങളുടെയും ജീവസ്സുറ്റ സംഗമഭൂമിയാണ്. ഉത്തരേന്ത്യയിലെ വേദമന്ത്രങ്ങളും വാരാണസിയിലെ പുണ്യ ഗംഗാ തീരങ്ങളും മുതൽ ദക്ഷിണേന്ത്യയിലെ മഹാക്ഷേത്രങ്ങളും പശ്ചിമഘട്ട വനങ്ങളും വരെ, ഭാരതീയ സംസ്കാരം ആത്മീയതയുടെയും കലയുടെയും സങ്കേതമാണ്. 45 യുനെസ്കോ ലോക പൈതൃക കേന്ദ്രങ്ങളുടെ മാതൃരാജ്യമായ ഭാരതം പുരാതന ആത്മീയ ചൈതന്യത്തെ ലോക ചരിത്രവുമായി ബന്ധിപ്പിക്കുന്നു.",
          title: "ഔദ്യോഗിക ശബ്ദ വിവരണം: ഭാരതീയ നാഗരികതയുടെയും പൈതൃകത്തിന്റെയും അവലോകനം",
          aboutText: "ഭാരതത്തിന്റെ അയ്യായിരം വർഷം പഴക്കമുള്ള സാംസ്കാരികവും ചരിത്രപരവുമായ പൈതൃകത്തിന്റെ ആധികാരിക വിവരണം.",
          significanceText: "സാംസ്കാരിക തുടർച്ചയും 45 യുനെസ്കോ ലോക പൈതൃക കേന്ദ്രങ്ങളുടെ ആഗോള പ്രാധാന്യവും.",
          factsList: ["ഭാരതത്തിൽ 34 സാംസ്കാരിക, 10 പ്രകൃതിദത്ത, 1 മിശ്ര ലോക പൈതൃക കേന്ദ്രങ്ങളുണ്ട്."],
          langCode: 'ml-IN',
        };
      }
    }
    // If standalone overview narration and Tamil is selected, provide authentic Tamil audio text
    if (selectedLanguage === 'ta-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('இந்தியா') || textToSpeak.includes('பாரதம்'));
      if (isOverview) {
        return {
          audioText: "இந்தியா என்பது வெறும் புவியியல் எல்லை மட்டுமல்ல; அது ஐயாயிரம் ஆண்டுகாலப் பாரம்பரியம், பன்முகத்தன்மை மற்றும் கட்டிடக்கலை சாதனைகளின் வாழும் சங்கமமாகும். வடக்கின் வேத முழக்கங்கள் மற்றும் வாரணாசியின் புனித கங்கை படித்துறைகள் முதல் தெற்கின் கம்பீரமான திராவிடக் கோயில்கள் மற்றும் மேற்குத் தொடர்ச்சி மலைகள் வரை, இந்திய கலாச்சாரம் ஆன்மீகம் மற்றும் கலையின் உறைவிடமாகும். 45 யுனெஸ்கோ உலக பாரம்பரியத் தளங்களின் தாயகமான இந்தியா, பண்டைய ஆன்மீக ஞானத்தை உலக வரலாற்றுச் சின்னங்களுடன் இணைக்கிறது.",
          title: "அதிகாரப்பூர்வ ஒலி விவரணம்: இந்திய நாகரிகம் மற்றும் பாரம்பரியத்தின் மேலோட்டம்",
          aboutText: "இந்தியாவின் ஐயாயிரம் ஆண்டு வரலாற்று மற்றும் கலாச்சாரப் பெருமையின் உண்மை விவரணம்.",
          significanceText: "கலாச்சாரத் தொடர்ச்சியும் 45 யுனெஸ்கோ உலக பாரம்பரியத் தளங்களின் சர்வதேச முக்கியத்துவமும்.",
          factsList: ["இந்தியாவில் 34 கலாச்சார, 10 இயற்கை மற்றும் 1 கலப்பு உலக பாரம்பரியத் தளங்கள் உள்ளன."],
          langCode: 'ta-IN',
        };
      }
    }
    // If standalone overview narration and Telugu is selected, provide authentic Telugu audio text
    if (selectedLanguage === 'te-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('భారతదేశం') || textToSpeak.includes('భారతం'));
      if (isOverview) {
        return {
          audioText: "భారతదేశం కేవలం ఒక భౌగోళిక సరిహద్దు మాత్రమే కాదు; ఇది ఐదు వేల సంవత్సరాల నిరంతర సాంస్కృతిక ప్రవాహం, వైవిధ్యం మరియు అద్భుతమైన వాస్తుకళా నైపుణ్యాల సజీవ సంగమం. ఉత్తరాన పవిత్ర గంగా తీరాలు మరియు హిమాలయాల నుండి దక్షిణాన సమున్నత ద్రవిడ దేవాలయాలు, పశ్చిమ కనుమల వరకు, భారతీయ సంస్కృతి ఆధ్యాత్మికత మరియు కళల నిలయం. 45 యునెస్కో ప్రపంచ వారసత్వ ప్రదేశాలకు నిలయమైన భారతదేశం ప్రాచీన ఆధ్యాత్మిక జ్ఞానాన్ని ప్రపంచ చారిత్రక కట్టడాలతో అనుసంధానిస్తుంది.",
          title: "అధికారిక ఆడియో గైడ్: భారతీయ నాగరికత మరియు వారసత్వ సమగ్ర వివరణ",
          aboutText: "భారతదేశపు ఐదు వేల సంవత్సరాల చారిత్రక మరియు సాంస్కృతిక వైభవ సమగ్ర వివరణ.",
          significanceText: "సాంస్కృతిక కొనసాగింపు మరియు 45 యునెస్కో ప్రపంచ వారసత్వ ప్రదేశాల అంతర్జాతీయ ప్రాధాన్యత.",
          factsList: ["భారతదేశంలో 34 సాంస్కృతిక, 10 సహజ మరియు 1 మిశ్రమ ప్రపంచ వారసత్వ ప్రదేశాలు ఉన్నాయి."],
          langCode: 'te-IN',
        };
      }
    }
    // If standalone overview narration and Kannada is selected, provide authentic Kannada audio text
    if (selectedLanguage === 'kn-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('ಭಾರತ'));
      if (isOverview) {
        return {
          audioText: "ಭಾರತವು ಕೇವಲ ಒಂದು ಭೌಗೋಳಿಕ ಗಡಿಯಲ್ಲ; ಇದು ಐದು ಸಹಸ್ರಮಾನಗಳ ನಿರಂತರ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರವಾಹ, ವೈವಿಧ್ಯತೆ ಮತ್ತು ಅದ್ಭುತ ವಾಸ್ತುಶಿಲ್ಪದ ಜೀವಂತ ಸಂಗಮವಾಗಿದೆ. ಉತ್ತರದ ವೈದಿಕ ಮಂತ್ರಗಳು ಮತ್ತು ವಾರಣಾಸಿಯ ಪವಿತ್ರ ಗಂಗಾ ತೀರಗಳಿಂದ ಹಿಡಿದು ದಕ್ಷಿಣದ ಭವ್ಯ ದ್ರಾವಿಡ ದೇವಾಲಯಗಳು, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳವರೆಗೆ ಭಾರತೀಯ ಸಂಸ್ಕೃತಿಯು ಆಧ್ಯಾತ್ಮಿಕತೆ ಮತ್ತು ಕಲೆಗಳ ನೆಲೆವೀಡಾಗಿದೆ. 45 ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣಗಳ ತವರೂರಾದ ಭಾರತವು ಪ್ರಾಚೀನ ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನವನ್ನು ಜಾಗತಿಕ ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
          title: "ಅಧಿಕೃತ ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ: ಭಾರತೀಯ ನಾಗರಿಕತೆ ಮತ್ತು ಪರಂಪರೆಯ ಸಮಗ್ರ ವಿವರಣೆ",
          aboutText: "ಭಾರತದ ಐದು ಸಹಸ್ರಮಾನಗಳ ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ವೈಭವದ ಸಮಗ್ರ ವಿವರಣೆ.",
          significanceText: "ಸಾಂಸ್ಕೃತಿಕ ನಿರಂತರತೆ ಮತ್ತು 45 ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣಗಳ ಅಂತರರಾಷ್ಟ್ರೀಯ ಪ್ರಾಮುಖ್ಯತೆ.",
          factsList: ["ಭಾರತದಲ್ಲಿ 34 ಸಾಂಸ್ಕೃತಿಕ, 10 ನೈಸರ್ಗಿಕ ಮತ್ತು 1 ಮಿಶ್ರ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣಗಳಿವೆ."],
          langCode: 'kn-IN',
        };
      }
    }
    // If standalone overview narration and Bengali is selected, provide authentic Bengali audio text
    if (selectedLanguage === 'bn-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('ভারত'));
      if (isOverview) {
        return {
          audioText: "ভারত কেবল একটি ভৌগোলিক সীমানা নয়; এটি পাঁচ সহস্রাব্দের নিরবচ্ছিন্ন সাংস্কৃতিক প্রবাহ, বহুত্ববাদ এবং স্থাপত্যকলার এক জীবন্ত রূপ। উত্তরের বৈদিক মন্ত্র ও বারাণসীর পবিত্র গঙ্গার ঘাট থেকে শুরু করে দক্ষিণের সুবিশাল দ্রাবিড় মন্দির ও পশ্চিমঘাট পর্বতমালা পর্যন্ত, ভারতীয় সংস্কৃতি আধ্যাত্মিকতা ও শিল্পের এক পবিত্র আশ্রয়স্থল। ৪৫টি ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থানের আবাসভূমি ভারত প্রাচীন আধ্যাত্মিক চেতনাকে বিশ্ব ইতিহাসের স্মারকগুলোর সাথে সংযুক্ত করে।",
          title: "অফিসিয়াল অডিও গাইড: ভারতীয় সভ্যতা ও ঐতিহ্যের বিশদ বিবরণ",
          aboutText: "ভারতের পাঁচ সহস্রাব্দের ঐতিহাসিক ও সাংস্কৃতিক ঐতিহ্যের বিশদ বিবরণ।",
          significanceText: "সাংস্কৃতিক ধারাবাহিকতা এবং ৪৫টি ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থানের আন্তর্জাতিক গুরুত্ব।",
          factsList: ["ভারতে ৩৪টি সাংস্কৃতিক, ১০টি প্রাকৃতিক এবং ১টি মিশ্র বিশ্ব ঐতিহ্যবাহী স্থান রয়েছে।"],
          langCode: 'bn-IN',
        };
      }
    }
    // If standalone overview narration and Gujarati is selected, provide authentic Gujarati audio text
    if (selectedLanguage === 'gu-IN') {
      const isOverview = textToSpeak && (textToSpeak.includes('geographic') || textToSpeak.includes('Civilizational') || textToSpeak.includes('Vedic') || textToSpeak.includes('India is') || textToSpeak.includes('ભારત') || textToSpeak.includes('ભારતીય'));
      if (isOverview) {
        return {
          audioText: "ભારત માત્ર એક ભૌગોલિક સીમા નથી; તે પાંચ હજાર વર્ષનો સતત સાંસ્કૃતિક પ્રવાહ, વિવિધતા અને ભવ્ય સ્થાપત્ય કલાનો જીવંત સંગમ છે. ઉત્તરના વૈદિક મંત્રો અને વારાણસીના પવિત્ર ગંગા ઘાટોથી લઈને દક્ષિણના ઉત્તુંગ દ્રવિડ મંદિરો અને પશ્ચિમ ઘાટ સુધી, ભારતીય સંસ્કૃતિ આધ્યાત્મિકતા અને કલાનું પવિત્ર ધામ છે. ૪૫ યુનેસ્કો વર્લ્ડ હેરિટેજ સ્થળો ધરાવતો ભારત દેશ પ્રાચીન આધ્યાત્મિક જ્ઞાનને વૈશ્વિક ઐતિહાસિક સ્મારકો સાથે જોડે છે.",
          title: "સત્તાવાર ઑડિયો માર્ગદર્શિકા: ભારતીય સંસ્કૃતિ અને વારસાનું સમગ્ર દર્શન",
          aboutText: "ભારતના પાંચ સહસ્રાબ્દીના ઐતિહાસિક અને સાંસ્કૃતિક વૈભવનું સમગ્ર વર્ણન.",
          significanceText: "સાંસ્કૃતિક સાતત્ય અને ૪૫ યુનેસ્કો વર્લ્ડ હેરિટેજ સ્થળોનું આંતરરાષ્ટ્રીય મહત્વ.",
          factsList: ["ભારતમાં ૩૪ સાંસ્કૃતિક, ૧૦ કુદરતી અને ૧ મિશ્ર વર્લ્ડ હેરિટેજ સાઇટ્સ આવેલી છે."],
          langCode: 'gu-IN',
        };
      }
    }
    return {
      audioText: textToSpeak || '',
      title: label,
      aboutText: textToSpeak || '',
      significanceText: '',
      factsList: [],
      langCode: selectedLanguage,
    };
  }, [site, textToSpeak, selectedLanguage, label]);

  const activeAudioText = currentNarration.audioText;

  const currentLangObj = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  }, [selectedLanguage]);

  const isCurrentText = speechState.currentText === activeAudioText && speechState.currentLanguage === selectedLanguage;
  const isPlaying = isCurrentText && speechState.isPlaying && !speechState.isPaused;
  const isPaused = isCurrentText && speechState.isPaused;

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setIsLangDropdownOpen(false);
    speechManager.setLanguage(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }

    // If already playing, immediately re-speak in newly selected language
    if (isPlaying || isPaused) {
      if (site) {
        const nextNarration = getHeritageNarration(site, langCode);
        speechManager.speak(nextNarration.audioText, langCode, true);
      } else {
        let spokenText = textToSpeak || '';
        if (langCode === 'hi-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('भारत'))) {
          spokenText = "भारत केवल एक भौगोलिक सीमा नहीं है; यह निरंतरता, बहुलवाद और स्थापत्य कला का पांच सहस्राब्दियों का गहरा दर्शन है। उत्तर के वैदिक मंत्रों और वाराणसी के पावन गंगा घाटों से लेकर दक्षिण के उत्तुंग द्रविड़ मंदिरों तक, भारतीय सांस्कृतिक विरासत कला, शिल्प और आध्यात्मिकता का एक जीवंत अभयारण्य है। 45 यूनेस्को विश्व धरोहर स्थलों का घर, भारत प्राचीन आध्यात्मिक चेतना को विश्व इतिहास के स्मारकों से जोड़ता है।";
        } else if (langCode === 'mr-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('भारत'))) {
          spokenText = "भारत ही केवळ एक भौगोलिक सीमा नाही; हे सातत्य, बहुलवाद आणि स्थापत्यकलेचे पाच हजार वर्षांचे सखोल दर्शन आहे. उत्तरेकडील वैदिक ऋचा आणि वाराणसीच्या पवित्र गंगा घाटांपासून ते दक्षिणेकडील उत्तुंग द्रविड मंदिरांपर्यंत, भारतीय सांस्कृतिक वारसा कला, शिल्प आणि अध्यात्माचे एक जिवंत केंद्र आहे. 45 युनेस्को जागतिक वारसा स्थळांचे माहेरघर असलेला भारत प्राचीन आध्यात्मिक जाणिवांना जागतिक इतिहासाशी जोडतो.";
        } else if (langCode === 'ml-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('ഭാരതം') || spokenText.includes('ഇന്ത്യ'))) {
          spokenText = "ഭാരതം കേവലം ഒരു ഭൂമിശാസ്ത്രപരമായ അതിർത്തിയല്ല; അത് അയ്യായിരം വർഷത്തെ പൈതൃകത്തിന്റെയും സാംസ്കാരിക വൈവിധ്യത്തിന്റെയും വാസ്തുവിദ്യാ വിസ്മയങ്ങളുടെയും ജീവസ്സുറ്റ സംഗമഭൂമിയാണ്. ഉത്തരേന്ത്യയിലെ വേദമന്ത്രങ്ങളും വാരാണസിയിലെ പുണ്യ ഗംഗാ തീരങ്ങളും മുതൽ ദക്ഷിണേന്ത്യയിലെ മഹാക്ഷേത്രങ്ങളും പശ്ചിമഘട്ട വനങ്ങളും വരെ, ഭാരതീയ സംസ്കാരം ആത്മീയതയുടെയും കലയുടെയും സങ്കേതമാണ്. 45 യുനെസ്കോ ലോക പൈതൃക കേന്ദ്രങ്ങളുടെ മാതൃരാജ്യമായ ഭാരതം പുരാതന ആത്മീയ ചൈതന്യത്തെ ലോക ചരിത്രവുമായി ബന്ധിപ്പിക്കുന്നു.";
        } else if (langCode === 'ta-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('இந்தியா') || spokenText.includes('பாரதம்'))) {
          spokenText = "இந்தியா என்பது வெறும் புவியியல் எல்லை மட்டுமல்ல; அது ஐயாயிரம் ஆண்டுகாலப் பாரம்பரியம், பன்முகத்தன்மை மற்றும் கட்டிடக்கலை சாதனைகளின் வாழும் சங்கமமாகும். வடக்கின் வேத முழக்கங்கள் மற்றும் வாரணாசியின் புனித கங்கை படித்துறைகள் முதல் தெற்கின் கம்பீரமான திராவிடக் கோயில்கள் மற்றும் மேற்குத் தொடர்ச்சி மலைகள் வரை, இந்திய கலாச்சாரம் ஆன்மீகம் மற்றும் கலையின் உறைவிடமாகும். 45 யுனெஸ்கோ உலக பாரம்பரியத் தளங்களின் தாயகமான இந்தியா, பண்டைய ஆன்மீக ஞானத்தை உலக வரலாற்றுச் சின்னங்களுடன் இணைக்கிறது.";
        } else if (langCode === 'te-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('భారతదేశం') || spokenText.includes('భారతం'))) {
          spokenText = "భారతదేశం కేవలం ఒక భౌగోళిక సరిహద్దు మాత్రమే కాదు; ఇది ఐదు వేల సంవత్సరాల నిరంతర సాంస్కృతిక ప్రవాహం, వైవిధ్యం మరియు అద్భుతమైన వాస్తుకళా నైపుణ్యాల సజీవ సంగమం. ఉత్తరాన పవిత్ర గంగా తీరాలు మరియు హిమాలయాల నుండి దక్షిణాన సమున్నత ద్రవిడ దేవాలయాలు, పశ్చిమ కనుమల వరకు, భారతీయ సంస్కృతి ఆధ్యాత్మికత మరియు కళల నిలయం. 45 యునెస్కో ప్రపంచ వారసత్వ ప్రదేశాలకు నిలయమైన భారతదేశం ప్రాచీన ఆధ్యాత్మిక జ్ఞానాన్ని ప్రపంచ చారిత్రక కట్టడాలతో అనుసంధానిస్తుంది.";
        } else if (langCode === 'kn-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('ಭಾರತ'))) {
          spokenText = "ಭಾರತವು ಕೇವಲ ಒಂದು ಭೌಗೋಳಿಕ ಗಡಿಯಲ್ಲ; ಇದು ಐದು ಸಹಸ್ರಮಾನಗಳ ನಿರಂತರ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರವಾಹ, ವೈವಿಧ್ಯತೆ ಮತ್ತು ಅದ್ಭುತ ವಾಸ್ತುಶಿಲ್ಪದ ಜೀವಂತ ಸಂಗಮವಾಗಿದೆ. ಉತ್ತರದ ವೈದಿಕ ಮಂತ್ರಗಳು ಮತ್ತು ವಾರಣಾಸಿಯ ಪವಿತ್ರ ಗಂಗಾ ತೀರಗಳಿಂದ ಹಿಡಿದು ದಕ್ಷಿಣದ ಭವ್ಯ ದ್ರಾವಿಡ ದೇವಾಲಯಗಳು, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳವರೆಗೆ ಭಾರತೀಯ ಸಂಸ್ಕೃತಿಯು ಆಧ್ಯಾತ್ಮಿಕತೆ ಮತ್ತು ಕಲೆಗಳ ನೆಲೆವೀಡಾಗಿದೆ. 45 ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ತಾಣಗಳ ತವರೂರಾದ ಭಾರತವು ಪ್ರಾಚೀನ ಆಧ್ಯಾತ್ಮಿಕ ಜ್ಞಾನವನ್ನು ಜಾಗತಿಕ ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.";
        } else if (langCode === 'bn-IN' && (spokenText.includes('geographic') || spokenText.includes('Civilizational') || spokenText.includes('Vedic') || spokenText.includes('India is') || spokenText.includes('ভারত'))) {
          spokenText = "ভারত কেবল একটি ভৌগোলিক সীমানা নয়; এটি পাঁচ সহস্রাব্দের নিরবচ্ছিন্ন সাংস্কৃতিক প্রবাহ, বহুত্ববাদ এবং স্থাপত্যকলার এক জীবন্ত রূপ। উত্তরের বৈদিক মন্ত্র ও বারাণসীর পবিত্র গঙ্গার ঘাট থেকে শুরু করে দক্ষিণের সুবিশাল দ্রাবিড় মন্দির ও পশ্চিমঘাট পর্বতমালা পর্যন্ত, ভারতীয় সংস্কৃতি আধ্যাত্মিকতা ও শিল্পের এক পবিত্র আশ্রয়স্থল। ৪৫টি ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থানের আবাসভূমি ভারত প্রাচীন আধ্যাত্মিক চেতনাকে বিশ্ব ইতিহাসের স্মারকগুলোর সাথে সংযুক্ত করে।";
        }
        speechManager.speak(spokenText, langCode, true);
      }
    }
  };

  const handleTogglePlay = () => {
    speechManager.togglePlay(activeAudioText, selectedLanguage);
  };

  const handleStop = () => {
    speechManager.stop();
  };

  const handleRateChange = (rate: number) => {
    speechManager.setRate(rate);
  };

  // Compact badge mode (used in inline lists)
  if (compact) {
    return (
      <div className={`inline-flex items-center space-x-2 bg-[#B05B3B]/10 hover:bg-[#B05B3B]/15 border border-[#B05B3B]/30 rounded-full px-3 py-1 text-xs text-[#2D2A26] transition-colors ${className}`}>
        <button
          onClick={handleTogglePlay}
          type="button"
          aria-label={isPlaying ? "Pause audio narration" : "Play audio narration"}
          className="flex items-center space-x-1.5 font-sans font-medium text-[#B05B3B] hover:text-[#2D2A26] transition-colors cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>{currentLangObj.voicePrompt}</span>
            </>
          )}
        </button>

        {/* Compact Language Selector */}
        <div className="relative inline-block border-l border-[#B05B3B]/30 pl-2">
          <button
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            type="button"
            className="flex items-center space-x-1 text-[10px] font-sans font-semibold text-[#5A5A5A] hover:text-[#B05B3B] cursor-pointer"
          >
            <span>{currentLangObj.name}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {isLangDropdownOpen && (
            <div className="absolute left-0 mt-1.5 z-40 bg-white border border-[#2D2A26]/20 shadow-lg py-1 min-w-[140px] text-[11px]">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  type="button"
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#FAF8F5] cursor-pointer ${
                    selectedLanguage === lang.code ? 'font-bold text-[#B05B3B] bg-[#B05B3B]/5' : 'text-[#2D2A26]'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-[10px] text-[#5A5A5A]">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full Rich Narration Bar with Clearly Visible Language Selector
  return (
    <div
      className={`p-4 sm:p-5 bg-[#FAF8F5] border border-[#2D2A26]/15 rounded-xl transition-all shadow-xs ${
        isPlaying ? 'ring-2 ring-[#B05B3B]/30 bg-[#FFFDF9]' : ''
      } ${className}`}
    >
      <div className="flex flex-col gap-4">
        {/* Top Control Strip: Language Selector & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#2D2A26]/10">
          {/* THE CLEARLY VISIBLE LANGUAGE SELECTOR */}
          <div className="relative flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-sans font-bold text-[#2D2A26] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#B05B3B]" />
              <span>Language:</span>
            </span>

            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                type="button"
                className="inline-flex items-center space-x-2 bg-white hover:bg-[#FDFBF7] text-[#2D2A26] text-xs font-sans font-semibold border border-[#2D2A26]/25 rounded-md px-3 py-1.5 shadow-2xs hover:border-[#B05B3B] transition-all cursor-pointer"
                title="Select preferred narration language"
              >
                <span className="font-bold text-[#B05B3B]">{currentLangObj.name}</span>
                <span className="text-[11px] text-[#5A5A5A]">({currentLangObj.nativeName})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5A5A5A] transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <div 
                  className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-[#2D2A26]/20 shadow-xl rounded-md py-1.5 min-w-[220px] max-h-72 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-[#5A5A5A] border-b border-[#2D2A26]/10 bg-[#FAF8F5]">
                    Select Speech Audio Language (10 Available)
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      type="button"
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#B05B3B]/5 cursor-pointer text-xs font-sans transition-colors ${
                        selectedLanguage === lang.code
                          ? 'font-bold text-[#B05B3B] bg-[#B05B3B]/10'
                          : 'text-[#2D2A26]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono px-1 bg-[#2D2A26]/5 rounded border border-[#2D2A26]/10">
                          {lang.badge}
                        </span>
                        <span>{lang.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-[#5A5A5A] font-medium">{lang.nativeName}</span>
                        {selectedLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[#B05B3B]" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Header Status / Transcription Toggle */}
          <div className="flex items-center space-x-3 text-xs font-sans">
            <span className="inline-flex items-center space-x-1.5 text-[11px] text-[#5A5A5A]">
              <Sparkles className="w-3 h-3 text-[#B05B3B]" />
              <span>Multi-Language Audio TTS</span>
            </span>

            <button
              onClick={() => setShowScriptPreview(!showScriptPreview)}
              type="button"
              className="text-[11px] text-[#B05B3B] hover:underline cursor-pointer font-medium"
            >
              {showScriptPreview ? 'Hide Text' : 'View Text'}
            </button>
          </div>
        </div>

        {/* Main Audio Action Row: Big Play Button + Label + Prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            {/* Play / Pause Primary Button */}
            <button
              onClick={handleTogglePlay}
              type="button"
              className="w-12 h-12 rounded-full bg-[#B05B3B] hover:bg-[#92472c] active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer shrink-0"
              title={isPlaying ? "Pause Narration" : isPaused ? "Resume Narration" : currentLangObj.voicePrompt}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Audio Title & Spoken Prompt */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#B05B3B]">
                  {label}
                </span>
                {isPlaying && (
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-sans uppercase tracking-widest bg-[#1B6B47] text-white">
                    Playing {currentLangObj.name}
                  </span>
                )}
              </div>

              {/* Spoken Action Callout */}
              <h4 
                onClick={handleTogglePlay}
                className="text-base sm:text-lg font-serif font-bold text-[#2D2A26] hover:text-[#B05B3B] cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <span>🔊</span>
                <span>{currentLangObj.voicePrompt}</span>
                <span className="text-xs font-normal text-[#5A5A5A] font-sans">({currentLangObj.name})</span>
              </h4>

              <p className="text-xs font-serif italic text-[#5A5A5A] line-clamp-1 max-w-sm sm:max-w-md">
                {isPlaying
                  ? `Speaking in natural ${currentLangObj.name} voice narration...`
                  : isPaused
                  ? "Audio paused. Click to resume."
                  : `Select any of the 10 languages and click to hear authentic spoken guide.`}
              </p>
            </div>
          </div>

          {/* Right Side: Soundwave, Speed Controls, Stop */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            {/* Animated Soundwave */}
            {isPlaying && (
              <div className="flex items-end space-x-1 h-6 px-2.5 py-1 bg-white rounded-md border border-[#2D2A26]/15">
                <span className="w-1 bg-[#B05B3B] h-2 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1 bg-[#B05B3B] h-5 animate-[bounce_0.5s_ease-in-out_infinite]"></span>
                <span className="w-1 bg-[#B05B3B] h-3 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                <span className="w-1 bg-[#B05B3B] h-6 animate-[bounce_0.7s_ease-in-out_infinite]"></span>
                <span className="w-1 bg-[#B05B3B] h-2.5 animate-[pulse_0.5s_ease-in-out_infinite]"></span>
              </div>
            )}

            {/* Speed Selector */}
            <div className="flex items-center space-x-1 text-[11px] font-sans">
              <span className="text-[#5A5A5A] uppercase tracking-wider mr-1 text-[10px] font-bold">Speed:</span>
              {[0.8, 1.0, 1.2].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleRateChange(rate)}
                  type="button"
                  className={`px-2 py-0.5 rounded text-xs transition-all cursor-pointer ${
                    speechState.rate === rate
                      ? 'bg-[#2D2A26] text-white font-bold'
                      : 'bg-white text-[#5A5A5A] border border-[#2D2A26]/20 hover:border-[#2D2A26]'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>

            {/* Stop / Reset Button */}
            {(isPlaying || isPaused) && (
              <button
                onClick={handleStop}
                type="button"
                className="p-2 text-[#5A5A5A] hover:text-[#B05B3B] hover:bg-white transition-colors rounded-md border border-[#2D2A26]/10 cursor-pointer"
                title="Stop Narration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Text / Script Preview in Selected Language */}
        {showScriptPreview && (
          <div className="mt-2 p-3.5 bg-white border border-[#2D2A26]/15 rounded-md text-xs font-serif text-[#2D2A26] leading-relaxed animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[#2D2A26]/10">
              <span className="text-[10px] uppercase font-sans tracking-widest font-bold text-[#B05B3B]">
                Speech Audio Text Script ({currentLangObj.name})
              </span>
              <span className="text-[10px] text-[#5A5A5A] font-sans font-mono">
                {selectedLanguage}
              </span>
            </div>
            <p className="text-[#4A453F]">
              {activeAudioText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

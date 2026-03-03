import { useState, useEffect, useCallback } from "react";

const SURAH_LIST = [
  { number: 1, name: "الفاتحة", bangla: "আল-ফাতিহা", meaning: "সূচনা", ayahs: 7 },
  { number: 2, name: "البقرة", bangla: "আল-বাকারা", meaning: "গাভী", ayahs: 286 },
  { number: 3, name: "آل عمران", bangla: "আল-ইমরান", meaning: "ইমরানের পরিবার", ayahs: 200 },
  { number: 4, name: "النساء", bangla: "আন-নিসা", meaning: "নারী", ayahs: 176 },
  { number: 5, name: "المائدة", bangla: "আল-মায়েদা", meaning: "খাদ্য পরিবেশিত টেবিল", ayahs: 120 },
  { number: 6, name: "الأنعام", bangla: "আল-আনআম", meaning: "গবাদিপশু", ayahs: 165 },
  { number: 7, name: "الأعراف", bangla: "আল-আরাফ", meaning: "উচ্চভূমি", ayahs: 206 },
  { number: 8, name: "الأنفال", bangla: "আল-আনফাল", meaning: "যুদ্ধলব্ধ সম্পদ", ayahs: 75 },
  { number: 9, name: "التوبة", bangla: "আত-তাওবা", meaning: "অনুতাপ", ayahs: 129 },
  { number: 10, name: "يونس", bangla: "ইউনুস", meaning: "ইউনুস (আ.)", ayahs: 109 },
  { number: 11, name: "هود", bangla: "হুদ", meaning: "হুদ (আ.)", ayahs: 123 },
  { number: 12, name: "يوسف", bangla: "ইউসুফ", meaning: "ইউসুফ (আ.)", ayahs: 111 },
  { number: 13, name: "الرعد", bangla: "আর-রাদ", meaning: "বজ্রপাত", ayahs: 43 },
  { number: 14, name: "إبراهيم", bangla: "ইবরাহিম", meaning: "ইবরাহিম (আ.)", ayahs: 52 },
  { number: 15, name: "الحجر", bangla: "আল-হিজর", meaning: "পাথুরে ভূমি", ayahs: 99 },
  { number: 16, name: "النحل", bangla: "আন-নাহল", meaning: "মৌমাছি", ayahs: 128 },
  { number: 17, name: "الإسراء", bangla: "আল-ইসরা", meaning: "রাত্রিকালীন ভ্রমণ", ayahs: 111 },
  { number: 18, name: "الكهف", bangla: "আল-কাহফ", meaning: "গুহা", ayahs: 110 },
  { number: 19, name: "مريم", bangla: "মারইয়াম", meaning: "মারইয়াম (আ.)", ayahs: 98 },
  { number: 20, name: "طه", bangla: "ত্বা-হা", meaning: "ত্বা-হা", ayahs: 135 },
  { number: 21, name: "الأنبياء", bangla: "আল-আম্বিয়া", meaning: "নবীগণ", ayahs: 112 },
  { number: 22, name: "الحج", bangla: "আল-হাজ্জ", meaning: "হজ্জ", ayahs: 78 },
  { number: 23, name: "المؤمنون", bangla: "আল-মুমিনুন", meaning: "বিশ্বাসীগণ", ayahs: 118 },
  { number: 24, name: "النور", bangla: "আন-নূর", meaning: "আলো", ayahs: 64 },
  { number: 25, name: "الفرقان", bangla: "আল-ফুরকান", meaning: "পার্থক্যকারী", ayahs: 77 },
  { number: 26, name: "الشعراء", bangla: "আশ-শুআরা", meaning: "কবিগণ", ayahs: 227 },
  { number: 27, name: "النمل", bangla: "আন-নামল", meaning: "পিপড়া", ayahs: 93 },
  { number: 28, name: "القصص", bangla: "আল-কাসাস", meaning: "কাহিনী", ayahs: 88 },
  { number: 29, name: "العنكبوت", bangla: "আল-আনকাবুত", meaning: "মাকড়সা", ayahs: 69 },
  { number: 30, name: "الروم", bangla: "আর-রুম", meaning: "রোমান", ayahs: 60 },
  { number: 31, name: "لقمان", bangla: "লুকমান", meaning: "লুকমান", ayahs: 34 },
  { number: 32, name: "السجدة", bangla: "আস-সাজদা", meaning: "সেজদা", ayahs: 30 },
  { number: 33, name: "الأحزاب", bangla: "আল-আহজাব", meaning: "দলসমূহ", ayahs: 73 },
  { number: 34, name: "سبإ", bangla: "সাবা", meaning: "শেবা", ayahs: 54 },
  { number: 35, name: "فاطر", bangla: "ফাতির", meaning: "সৃষ্টিকর্তা", ayahs: 45 },
  { number: 36, name: "يس", bangla: "ইয়া-সীন", meaning: "ইয়া-সীন", ayahs: 83 },
  { number: 37, name: "الصافات", bangla: "আস-সাফফাত", meaning: "সারিবদ্ধগণ", ayahs: 182 },
  { number: 38, name: "ص", bangla: "সোয়াদ", meaning: "সোয়াদ", ayahs: 88 },
  { number: 39, name: "الزمر", bangla: "আজ-জুমার", meaning: "দলবদ্ধ", ayahs: 75 },
  { number: 40, name: "غافر", bangla: "গাফির", meaning: "ক্ষমাকারী", ayahs: 85 },
  { number: 41, name: "فصلت", bangla: "ফুসসিলাত", meaning: "বিশদ বর্ণনা", ayahs: 54 },
  { number: 42, name: "الشورى", bangla: "আশ-শুরা", meaning: "পরামর্শ", ayahs: 53 },
  { number: 43, name: "الزخرف", bangla: "আজ-জুখরুফ", meaning: "সোনার অলংকার", ayahs: 89 },
  { number: 44, name: "الدخان", bangla: "আদ-দুখান", meaning: "ধোঁয়া", ayahs: 59 },
  { number: 45, name: "الجاثية", bangla: "আল-জাসিয়া", meaning: "নতজানু", ayahs: 37 },
  { number: 46, name: "الأحقاف", bangla: "আল-আহকাফ", meaning: "বালিয়াড়ি", ayahs: 35 },
  { number: 47, name: "محمد", bangla: "মুহাম্মাদ", meaning: "মুহাম্মাদ (সা.)", ayahs: 38 },
  { number: 48, name: "الفتح", bangla: "আল-ফাতহ", meaning: "বিজয়", ayahs: 29 },
  { number: 49, name: "الحجرات", bangla: "আল-হুজুরাত", meaning: "কক্ষসমূহ", ayahs: 18 },
  { number: 50, name: "ق", bangla: "কাফ", meaning: "কাফ", ayahs: 45 },
  { number: 51, name: "الذاريات", bangla: "আজ-জারিয়াত", meaning: "বায়ু-বিক্ষিপ্তকারী", ayahs: 60 },
  { number: 52, name: "الطور", bangla: "আত-তুর", meaning: "পর্বত", ayahs: 49 },
  { number: 53, name: "النجم", bangla: "আন-নাজম", meaning: "তারা", ayahs: 62 },
  { number: 54, name: "القمر", bangla: "আল-কামার", meaning: "চাঁদ", ayahs: 55 },
  { number: 55, name: "الرحمن", bangla: "আর-রহমান", meaning: "পরম দয়ালু", ayahs: 78 },
  { number: 56, name: "الواقعة", bangla: "আল-ওয়াকিআ", meaning: "অনিবার্য ঘটনা", ayahs: 96 },
  { number: 57, name: "الحديد", bangla: "আল-হাদিদ", meaning: "লোহা", ayahs: 29 },
  { number: 58, name: "المجادلة", bangla: "আল-মুজাদালা", meaning: "বিতর্ককারিণী", ayahs: 22 },
  { number: 59, name: "الحشر", bangla: "আল-হাশর", meaning: "সমাবেশ", ayahs: 24 },
  { number: 60, name: "الممتحنة", bangla: "আল-মুমতাহানা", meaning: "পরীক্ষিতা", ayahs: 13 },
  { number: 61, name: "الصف", bangla: "আস-সাফ", meaning: "সারি", ayahs: 14 },
  { number: 62, name: "الجمعة", bangla: "আল-জুমুআ", meaning: "শুক্রবার", ayahs: 11 },
  { number: 63, name: "المنافقون", bangla: "আল-মুনাফিকুন", meaning: "মুনাফিকগণ", ayahs: 11 },
  { number: 64, name: "التغابن", bangla: "আত-তাগাবুন", meaning: "পারস্পরিক প্রতারণা", ayahs: 18 },
  { number: 65, name: "الطلاق", bangla: "আত-তালাক", meaning: "তালাক", ayahs: 12 },
  { number: 66, name: "التحريم", bangla: "আত-তাহরিম", meaning: "নিষিদ্ধকরণ", ayahs: 12 },
  { number: 67, name: "الملك", bangla: "আল-মুলক", meaning: "কর্তৃত্ব", ayahs: 30 },
  { number: 68, name: "القلم", bangla: "আল-কালাম", meaning: "কলম", ayahs: 52 },
  { number: 69, name: "الحاقة", bangla: "আল-হাক্কা", meaning: "নিশ্চিত বাস্তবতা", ayahs: 52 },
  { number: 70, name: "المعارج", bangla: "আল-মাআরিজ", meaning: "আরোহণের সিঁড়ি", ayahs: 44 },
  { number: 71, name: "نوح", bangla: "নূহ", meaning: "নূহ (আ.)", ayahs: 28 },
  { number: 72, name: "الجن", bangla: "আল-জিন", meaning: "জিন", ayahs: 28 },
  { number: 73, name: "المزمل", bangla: "আল-মুজ্জাম্মিল", meaning: "আবৃতকারী", ayahs: 20 },
  { number: 74, name: "المدثر", bangla: "আল-মুদ্দাস্সির", meaning: "চাদরাবৃত", ayahs: 56 },
  { number: 75, name: "القيامة", bangla: "আল-কিয়ামা", meaning: "পুনরুত্থান", ayahs: 40 },
  { number: 76, name: "الإنسان", bangla: "আল-ইনসান", meaning: "মানুষ", ayahs: 31 },
  { number: 77, name: "المرسلات", bangla: "আল-মুরসালাত", meaning: "প্রেরিতগণ", ayahs: 50 },
  { number: 78, name: "النبإ", bangla: "আন-নাবা", meaning: "মহাসংবাদ", ayahs: 40 },
  { number: 79, name: "النازعات", bangla: "আন-নাজিআত", meaning: "উৎপাটনকারীগণ", ayahs: 46 },
  { number: 80, name: "عبس", bangla: "আবাসা", meaning: "ভ্রুকুটি করলেন", ayahs: 42 },
  { number: 81, name: "التكوير", bangla: "আত-তাকভির", meaning: "অন্ধকারাচ্ছন্ন", ayahs: 29 },
  { number: 82, name: "الانفطار", bangla: "আল-ইনফিতার", meaning: "বিদীর্ণ হওয়া", ayahs: 19 },
  { number: 83, name: "المطففين", bangla: "আল-মুতাফফিফিন", meaning: "প্রতারকগণ", ayahs: 36 },
  { number: 84, name: "الانشقاق", bangla: "আল-ইনশিকাক", meaning: "বিভক্ত হওয়া", ayahs: 25 },
  { number: 85, name: "البروج", bangla: "আল-বুরুজ", meaning: "রাশিচক্র", ayahs: 22 },
  { number: 86, name: "الطارق", bangla: "আত-তারিক", meaning: "রাত্রির আগন্তুক", ayahs: 17 },
  { number: 87, name: "الأعلى", bangla: "আল-আলা", meaning: "সর্বোচ্চ", ayahs: 19 },
  { number: 88, name: "الغاشية", bangla: "আল-গাশিয়া", meaning: "আচ্ছাদনকারী", ayahs: 26 },
  { number: 89, name: "الفجر", bangla: "আল-ফাজর", meaning: "ভোর", ayahs: 30 },
  { number: 90, name: "البلد", bangla: "আল-বালাদ", meaning: "শহর", ayahs: 20 },
  { number: 91, name: "الشمس", bangla: "আশ-শামস", meaning: "সূর্য", ayahs: 15 },
  { number: 92, name: "الليل", bangla: "আল-লাইল", meaning: "রাত্রি", ayahs: 21 },
  { number: 93, name: "الضحى", bangla: "আদ-দুহা", meaning: "পূর্বাহ্ন", ayahs: 11 },
  { number: 94, name: "الشرح", bangla: "আশ-শারহ", meaning: "প্রশস্ততা", ayahs: 8 },
  { number: 95, name: "التين", bangla: "আত-তীন", meaning: "ডুমুর", ayahs: 8 },
  { number: 96, name: "العلق", bangla: "আল-আলাক", meaning: "রক্তপিণ্ড", ayahs: 19 },
  { number: 97, name: "القدر", bangla: "আল-কাদর", meaning: "মহিমান্বিত রাত", ayahs: 5 },
  { number: 98, name: "البينة", bangla: "আল-বাইয়িনা", meaning: "সুস্পষ্ট প্রমাণ", ayahs: 8 },
  { number: 99, name: "الزلزلة", bangla: "আজ-জিলজাল", meaning: "ভূমিকম্প", ayahs: 8 },
  { number: 100, name: "العاديات", bangla: "আল-আদিয়াত", meaning: "দৌড়বিদ", ayahs: 11 },
  { number: 101, name: "القارعة", bangla: "আল-কারিআ", meaning: "মহাপ্রলয়", ayahs: 11 },
  { number: 102, name: "التكاثر", bangla: "আত-তাকাসুর", meaning: "প্রাচুর্যের প্রতিযোগিতা", ayahs: 8 },
  { number: 103, name: "العصر", bangla: "আল-আসর", meaning: "যুগ", ayahs: 3 },
  { number: 104, name: "الهمزة", bangla: "আল-হুমাযা", meaning: "পরনিন্দাকারী", ayahs: 9 },
  { number: 105, name: "الفيل", bangla: "আল-ফিল", meaning: "হাতি", ayahs: 5 },
  { number: 106, name: "قريش", bangla: "কুরাইশ", meaning: "কুরাইশ", ayahs: 4 },
  { number: 107, name: "الماعون", bangla: "আল-মাউন", meaning: "ছোট দয়া", ayahs: 7 },
  { number: 108, name: "الكوثر", bangla: "আল-কাওসার", meaning: "প্রাচুর্য", ayahs: 3 },
  { number: 109, name: "الكافرون", bangla: "আল-কাফিরুন", meaning: "অবিশ্বাসীগণ", ayahs: 6 },
  { number: 110, name: "النصر", bangla: "আন-নাসর", meaning: "সাহায্য", ayahs: 3 },
  { number: 111, name: "المسد", bangla: "আল-মাসাদ", meaning: "খেজুরের আঁশ", ayahs: 5 },
  { number: 112, name: "الإخلاص", bangla: "আল-ইখলাস", meaning: "একনিষ্ঠতা", ayahs: 4 },
  { number: 113, name: "الفلق", bangla: "আল-ফালাক", meaning: "ভোরের আলো", ayahs: 5 },
  { number: 114, name: "الناس", bangla: "আন-নাস", meaning: "মানবজাতি", ayahs: 6 },
];

const GeometricPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="islamic-geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <polygon points="40,5 75,20 75,60 40,75 5,60 5,20" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
        <polygon points="40,15 65,27 65,53 40,65 15,53 15,27" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="40" y1="5" x2="40" y2="75" stroke="#c9a84c" strokeWidth="0.3"/>
        <line x1="5" y1="20" x2="75" y2="60" stroke="#c9a84c" strokeWidth="0.3"/>
        <line x1="75" y1="20" x2="5" y2="60" stroke="#c9a84c" strokeWidth="0.3"/>
        <circle cx="40" cy="40" r="8" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#islamic-geo)"/>
  </svg>
);

const StarDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-600 opacity-40"/>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#c9a84c" opacity="0.7">
      <polygon points="12,2 14.5,9 22,9 16,13.5 18,21 12,17 6,21 8,13.5 2,9 9.5,9"/>
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-600 opacity-40"/>
  </div>
);

export default function QuranApp() {
  const [view, setView] = useState("list");
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [banglaAyahs, setBanglaAyahs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const fetchSurah = useCallback(async (surah) => {
    setLoading(true);
    setError(null);
    setAyahs([]);
    setBanglaAyahs([]);
    try {
      const [arabicRes, banglaRes] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`),
        fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/bn.bengali`)
      ]);
      const arabicData = await arabicRes.json();
      const banglaData = await banglaRes.json();
      if (arabicData.code === 200) setAyahs(arabicData.data.ayahs);
      if (banglaData.code === 200) setBanglaAyahs(banglaData.data.ayahs);
    } catch (e) {
      setError("ডেটা লোড করতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।");
    }
    setLoading(false);
  }, []);

  const openSurah = (surah) => {
    setSelectedSurah(surah);
    setView("surah");
    fetchSurah(surah);
  };

  const filtered = SURAH_LIST.filter(s =>
    s.bangla.includes(search) ||
    s.name.includes(search) ||
    s.meaning.includes(search) ||
    String(s.number).includes(search)
  );

  return (
    <div
      style={{
        fontFamily: "'Hind Siliguri', 'Noto Serif Bengali', sans-serif",
        background: "linear-gradient(135deg, #0d2318 0%, #1a3a2a 40%, #0f2a1e 100%)",
        minHeight: "100vh",
        color: "#f5f0e8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Hind+Siliguri:wght@300;400;500;600&family=Scheherazade+New:wght@400;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .fade-in { animation: fadeIn 0.8s ease forwards; }
        .slide-up { animation: slideUp 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        
        .surah-card {
          background: rgba(201,168,76,0.06);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 12px;
          padding: 14px 18px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .surah-card:hover {
          background: rgba(201,168,76,0.14);
          border-color: rgba(201,168,76,0.45);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        
        .number-badge {
          width: 42px; height: 42px;
          border: 1.5px solid rgba(201,168,76,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          color: #c9a84c;
          font-weight: 600;
          flex-shrink: 0;
          background: rgba(201,168,76,0.08);
        }
        
        .ayah-block {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 20px;
          animation: slideUp 0.5s ease forwards;
        }
        
        .arabic-text {
          font-family: 'Scheherazade New', 'Amiri', serif;
          font-size: 30px;
          line-height: 2.2;
          text-align: right;
          direction: rtl;
          color: #f5f0e8;
          letter-spacing: 0.5px;
        }
        
        .bangla-text {
          font-family: 'Hind Siliguri', sans-serif;
          font-size: 16px;
          line-height: 1.9;
          color: rgba(245,240,232,0.75);
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(201,168,76,0.12);
        }
        
        .search-input {
          background: rgba(201,168,76,0.07);
          border: 1.5px solid rgba(201,168,76,0.25);
          border-radius: 50px;
          padding: 12px 22px;
          color: #f5f0e8;
          font-size: 15px;
          font-family: 'Hind Siliguri', sans-serif;
          outline: none;
          transition: all 0.3s;
          width: 100%;
        }
        .search-input:focus {
          border-color: rgba(201,168,76,0.6);
          background: rgba(201,168,76,0.1);
          box-shadow: 0 0 20px rgba(201,168,76,0.1);
        }
        .search-input::placeholder { color: rgba(245,240,232,0.35); }
        
        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.3);
          color: #c9a84c;
          padding: 10px 20px;
          border-radius: 50px;
          cursor: pointer;
          font-size: 14px;
          font-family: 'Hind Siliguri', sans-serif;
          transition: all 0.3s;
        }
        .back-btn:hover { background: rgba(201,168,76,0.2); }
        
        .bismillah {
          font-family: 'Scheherazade New', 'Amiri', serif;
          font-size: 38px;
          text-align: center;
          color: #c9a84c;
          margin: 24px 0;
          letter-spacing: 2px;
          text-shadow: 0 0 40px rgba(201,168,76,0.3);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 4px; }
      `}</style>

      <GeometricPattern />

      {/* Glow effects */}
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>
      <div style={{ position: "fixed", bottom: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(26,90,55,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 60px", position: "relative" }}>

        {/* Header */}
        <header className={loaded ? "fade-in" : ""} style={{ textAlign: "center", padding: "48px 0 32px" }}>
          <div style={{ fontSize: "13px", letterSpacing: "4px", color: "rgba(201,168,76,0.6)", marginBottom: "12px", textTransform: "uppercase" }}>
            banglacalligraphy.com
          </div>
          <div style={{ fontFamily: "'Scheherazade New', 'Amiri', serif", fontSize: "52px", color: "#c9a84c", lineHeight: 1.3, textShadow: "0 0 60px rgba(201,168,76,0.25)" }}>
            القرآن الكريم
          </div>
          <div style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: "18px", color: "rgba(245,240,232,0.6)", marginTop: "8px", letterSpacing: "2px" }}>
            আল-কুরআন আল-কারিম
          </div>
          <StarDivider />
        </header>

        {/* SURAH LIST VIEW */}
        {view === "list" && (
          <div className={loaded ? "slide-up" : ""}>
            {/* Search */}
            <div style={{ marginBottom: "28px" }}>
              <input
                className="search-input"
                placeholder="🔍  সূরা খুঁজুন — নাম বা নম্বর লিখুন..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div style={{ fontSize: "13px", color: "rgba(201,168,76,0.5)", marginBottom: "16px", letterSpacing: "1px" }}>
              মোট {filtered.length}টি সূরা
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {filtered.map((surah, i) => (
                <div
                  key={surah.number}
                  className="surah-card"
                  onClick={() => openSurah(surah)}
                  style={{ animationDelay: `${i * 0.02}s` }}
                >
                  <div className="number-badge">{surah.number}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "17px", fontWeight: "600", color: "#f5f0e8" }}>{surah.bangla}</div>
                        <div style={{ fontSize: "13px", color: "rgba(245,240,232,0.5)", marginTop: "2px" }}>{surah.meaning} • {surah.ayahs} আয়াত</div>
                      </div>
                      <div style={{ fontFamily: "'Scheherazade New', 'Amiri', serif", fontSize: "26px", color: "#c9a84c", marginLeft: "12px" }}>
                        {surah.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SURAH DETAIL VIEW */}
        {view === "surah" && selectedSurah && (
          <div>
            <button className="back-btn" onClick={() => setView("list")}>
              ← সূরার তালিকায় ফিরুন
            </button>

            <div style={{ textAlign: "center", margin: "32px 0 24px" }}>
              <div style={{ fontFamily: "'Scheherazade New', serif", fontSize: "46px", color: "#c9a84c" }}>
                {selectedSurah.name}
              </div>
              <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "8px" }}>{selectedSurah.bangla}</div>
              <div style={{ fontSize: "14px", color: "rgba(245,240,232,0.5)", marginTop: "4px" }}>
                {selectedSurah.meaning} • {selectedSurah.ayahs} আয়াত
              </div>
              <StarDivider />
              {selectedSurah.number !== 9 && (
                <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
              )}
            </div>

            {loading && (
              <div style={{ textAlign: "center", padding: "60px", color: "rgba(201,168,76,0.6)" }}>
                <div style={{ fontFamily: "'Scheherazade New', serif", fontSize: "32px", marginBottom: "16px" }}>
                  ٭ ٭ ٭
                </div>
                <div>লোড হচ্ছে...</div>
              </div>
            )}

            {error && (
              <div style={{ textAlign: "center", padding: "40px", color: "#e57373" }}>
                {error}
              </div>
            )}

            {!loading && ayahs.length > 0 && (
              <div>
                {ayahs.map((ayah, i) => (
                  <div key={ayah.numberInSurah} className="ayah-block" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <div style={{ fontSize: "12px", color: "rgba(201,168,76,0.5)", letterSpacing: "1px" }}>
                        আয়াত {ayah.numberInSurah}
                      </div>
                      <div style={{
                        width: "36px", height: "36px",
                        border: "1.5px solid rgba(201,168,76,0.35)",
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "13px", color: "#c9a84c", fontWeight: "600"
                      }}>
                        {ayah.numberInSurah}
                      </div>
                    </div>
                    <div className="arabic-text">{ayah.text}</div>
                    {banglaAyahs[i] && (
                      <div className="bangla-text">{banglaAyahs[i].text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(201,168,76,0.1)", color: "rgba(245,240,232,0.3)", fontSize: "13px" }}>
          <a href="https://www.banglacalligraphy.com" target="_blank" rel="noreferrer" style={{ color: "rgba(201,168,76,0.5)", textDecoration: "none" }}>
            banglacalligraphy.com
          </a>
          {" "} • আল-কুরআন অ্যাপ
        </div>
      </div>
    </div>
  );
}

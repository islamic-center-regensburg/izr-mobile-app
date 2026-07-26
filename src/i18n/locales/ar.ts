// locales/ar.ts
export default {
  common: {
    izr: "المركز الإسلامي بريغنسبورغ",
    loading: "جارٍ تحضير مواقيت الصلاة…",

    copyright: "© {{year}} المركز الإسلامي بريغنسبورغ. جميع الحقوق محفوظة.",
    welcome: "أهلاً وسهلاً",
    "prayer-names": {
      fajr: "الفجــر",
      sunrise: "الشروق",
      dhuhr: "الظهــر",
      asr: "العصــر",
      maghrib: "المغرب",
      isha: "الـعشــاء",
      jumah: "الجمعة",
    },
    "next-prayer": "الصلاة التالية",
  },
  settings: {
    title: "الإعدادات",
    fontSize: "حجم الخط",
    language: "اللغة",
    notifications: "الإشعارات",
  },
  tabbar: {
    home: "الرئيسية",
    settings: "الإعدادات",
  },
  "font-size-screen": {
    "test-heading": "مرحباً بكم في المركز الإسلامي",
    "test-text":
      "المسجد هو قلب المجتمع المسلم، وهو مكان يجتمع فيه المسلمون للصلاة وطلب العلم والتعاون فيما بينهم. يسعى المركز الإسلامي بريغنسبورغ إلى خدمة مجتمعه بإخلاص وتفانٍ، مستلهماً قيم الإسلام من سلام وعدل ورحمة.",
  },
  "notifications-screen": {
    title: "إعدادات الإشعارات",
    "exact-alarm-warning":
      "التطبيق لا يملك الوصول إلى التنبيهات والأذان في إعدادات الجهاز.",
    "exact-alarm-button": "منح الوصول",
  },
  notifications: {
    adhanTitle: "موعد أذان {{prayer}}",
    adhanBody: "حان الآن وقت صلاة {{prayer}}.",
    exactAlarm: {
      title: "الوصول إلى المنبهات الدقيقة مطلوب",
      body: "لضمان تسليم إشعارات الصلاة في الوقت المناسب، يرجى منح التطبيق الوصول إلى التنبيهات والأذان في إعدادات الجهاز.",
      openSettings: "فتح الإعدادات",
      dismiss: "تجاهل",
    },
  },
  "home-screen": {
    "error-loading-prayer-times": "حدث خطأ أثناء تحميل أوقات الصلاة",
    khutbah: "خطبة",
    iqama: "الإقامة",
    adhan: "الأذان",
    today: "الـيوم",
    tomorrow: "الــغد",
    "remaining-time": "الوقت المتبقي",
    "hijri-date": "التاريخ الهجري",
    "gregorian-date": "التاريخ الميلادي",
    hours: "س",
    min: "د",
    sec: "ث",
  },
} as const;

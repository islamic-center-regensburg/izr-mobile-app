// locales/de.ts
export default {
  common: {
    izr: "Islamisches Zentrum Regensburg",
    loading: "Alles wird vorbereitet…",

    copyright:
      "© {{year}} Islamisches Zentrum Regensburg. Alle Rechte vorbehalten.",

    welcome: "Willkommen",
    "prayer-names": {
      fajr: "Fajr",
      sunrise: "Sonnenaufgang",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Ischa",
      jumah: "Jumah",
    },
    "next-prayer": "Nächstes Gebet",
  },
  settings: {
    title: "Einstellungen",
    fontSize: "Schriftgröße",
    language: "Sprache",
    notifications: "Benachrichtigungen",
  },
  tabbar: {
    home: "Startseite",
    settings: "Einstellungen",
  },
  "font-size-screen": {
    "test-heading": "Willkommen im Islamischen Zentrum",
    "test-text":
      "Die Moschee ist das Herz der muslimischen Gemeinschaft. Sie ist ein Ort, an dem Gläubige zusammenkommen, um zu beten, Wissen zu suchen und sich gegenseitig zu unterstützen. Das Islamische Zentrum Regensburg bemüht sich, seiner Gemeinschaft mit Aufrichtigkeit und Hingabe zu dienen – geleitet von den Werten des Islam: Frieden, Gerechtigkeit und Barmherzigkeit.",
  },
  "notifications-screen": {
    title: "Benachrichtigungseinstellungen",
    "exact-alarm-warning":
      "Das IZR-App hat keinen Zugriff auf Alarme & Erinnerungen in Ihren Geräteeinstellungen.",
    "exact-alarm-button": "Zugriff erteilen",
  },
  notifications: {
    adhanTitle: "Adhan-Zeit für {{prayer}}",
    adhanBody: "Es ist Zeit für das {{prayer}}-Gebet.",
    exactAlarm: {
      title: "Zugriff auf exakte Alarme erforderlich",
      body: "Um sicherzustellen, dass Gebetsbenachrichtigungen pünktlich zugestellt werden, erteilen Sie bitte der App Zugriff auf Alarme & Erinnerungen in den Geräteeinstellungen.",
      openSettings: "Einstellungen öffnen",
      dismiss: "Verwerfen",
    },
  },
  "home-screen": {
    "error-loading-prayer-times": "Fehler beim Laden der Gebetszeiten",
    khutbah: "Predigt",
    iqama: "Iqama",
    adhan: "Adhan",
    today: "Heute",
    tomorrow: "Morgen",
    "remaining-time": "Verbleibende Zeit",
    "hijri-date": "Hijri-Datum",
    "gregorian-date": "Greg. Datum",
    hours: "h",
    min: "min",
    sec: "sek",
  },
} as const;

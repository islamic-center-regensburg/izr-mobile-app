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
      shuruq: "Sonnenaufgang",
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
      openSettings: "Einstellungen",
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
    "about-section": {
      title: "Über das IZR",
      description: {
        section1:
          "Das Islamische Zentrum Regensburg (IZR) – die Ar-Rahman-Moschee – ist seit vielen Jahren ein lebendiger Treffpunkt für Muslime und alle, die uns kennenlernen möchten. Mitten in Regensburg, in der Alten Straubinger Straße 33, 93055 Regensburg, haben wir ein Zuhause für Gebet, Begegnung und Gemeinschaft geschaffen.",
        section2:
          "Bei uns wird jeden Tag gemeinsam gebetet – Fajr, Dhuhr, Asr, Maghrib und Isha – und das Freitagsgebet bringt unsere Gemeinschaft regelmäßig zusammen. Neben den Gebeten organisieren wir Veranstaltungen, Bildungsangebote und Aktivitäten für Jung und Alt. Aktuelle Gebetszeiten, Neuigkeiten und Erinnerungen findest du jederzeit bequem in unserer App.",
        section3:
          "Uns ist Offenheit wichtig – nicht nur als Wort, sondern gelebt. Beim 'Tag der offenen Moschee' heißen wir alle Neugierigen herzlich willkommen: Schau rein, stell Fragen, komm ins Gespräch. Unsere Imame und das Team sind immer für dich da.",
      },
    },
    "contact-section": {
      title: "Kontakt",
      description: {
        "first-chairman": {
          name: "Erster Vorstand",
          personName: "Harethe El Ouadhane",
          email: "h.elouadhane@iz-regensburg.de",
          tel: "+49 176 60800940",
        },
        board: {
          name: "Vorstand",
          email: "vorstand@iz-regensburg.de",
        },
        it: {
          name: "App / Website / IT",
          personName: "Mohamed Amine Bellil",
          email: "mohamed.bellil@iz-regensburg.de",
        },
        "room-reservation": {
          name: "Raumreservierung",
          personName: "Najeh Bouzgarrou",
          email: "n.bouzgarrou@iz-regensburg.de",
        },
      },
    },
    "follow-us-section": {
      title: "Folge uns",
      description:
        "Bleibe über soziale Medien und unsere Website mit uns in Verbindung, um die neuesten Updates, Veranstaltungen und Neuigkeiten aus der Gemeinschaft zu erhalten.",
    },
    "donation-section": {
      title: "Spenden",
      description:
        "Mit Ihrer Spende helfen Sie uns, den Moscheebetrieb, Bildungsangebote und soziale Projekte aufrechtzuerhalten. Jeder Beitrag zählt.",
      iban: {
        description: "IBAN",
        value: "DE30 7505 0000 0026 7651 56",
      },
      bic: {
        description: "BIC",
        value: "BYLADEM1RBG",
      },
      "account-holder": {
        description: "Kontoinhaber",
        value: "Islamisches Zentrum Regensburg",
      },
    },
    "latest-posts-section": {
      title: "Aktuelle Beiträge",
      "read-more": "Weiterlesen",
    },
  },
} as const;

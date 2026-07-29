export default {
  common: {
    izr: "Islamic Center of Regensburg",
    copyright: "© {{year}} Islamic Center of Regensburg. All rights reserved.",
    loading: "Getting everything ready for you…",
    welcome: "Welcome",
    "prayer-names": {
      fajr: "Fajr",
      shuruq: "Sunrise",
      dhuhr: "Dhuhr",
      asr: "Asr",
      maghrib: "Maghrib",
      isha: "Isha",
      jumah: "Jumah",
    },
    "next-prayer": "Next Prayer",
  },
  settings: {
    title: "Settings",
    fontSize: "Font Size",
    language: "Language",
    notifications: "Notifications",
  },
  tabbar: {
    home: "Home",
    settings: "Settings",
  },
  "font-size-screen": {
    "test-heading": "Welcome to IZ Regensburg",
    "test-text":
      "The mosque is the heart of the Muslim community. It is a place where believers gather for prayer, seek knowledge, and support one another. At the Islamic Center of Regensburg, we strive to serve our community with sincerity, compassion, and dedication to the values of Islam — peace, justice, and mercy.",
  },
  "notifications-screen": {
    title: "Notifications Settings",
    "exact-alarm-warning":
      "The IZR app does not have access to Alarms & Reminders in your device settings.",
    "exact-alarm-button": "Grant Access",
  },
  notifications: {
    adhanTitle: "Adhan Time for {{prayer}}",
    adhanBody: "It's time for {{prayer}} prayer.",
    exactAlarm: {
      title: "Exact Alarm Access Needed",
      body: "To ensure that prayer notifications are delivered on time, please grant the app access to Alarms & Reminders in your device settings.",
      openSettings: "Open Settings",
      dismiss: "Dismiss",
    },
  },
  "home-screen": {
    "error-loading-prayer-times": "Got an Error While loading Prayer Times",
    khutbah: "Khutbah",
    iqama: "Iqama",
    adhan: "Adhan",
    today: "Today",
    tomorrow: "Tomorrow",
    "remaining-time": "Remaining Time",
    "hijri-date": "Hijri Date",
    "gregorian-date": "Gregorian Date",
    hours: "h",
    min: "min",
    sec: "sec",
    "about-section": {
      title: "About the IZR",
      description: {
        section1:
          "The Islamic Center Regensburg (IZR) – the Ar-Rahman Mosque – has long been a living, breathing home for Muslims and anyone curious to connect. Right in the heart of Regensburg, at Alte Straubinger Straße 33, 93055 Regensburg, we've built a place of prayer, warmth, and genuine community.",
        section2:
          "Every day we pray together — Fajr, Dhuhr, Asr, Maghrib, and Isha — and Jumu'ah brings our community together every Friday. Beyond prayers, we organize events, learning circles, and activities for all ages. Prayer times, news, and reminders are always just a tap away in our app.",
        section3:
          "Openness isn't just a value for us — it's something we live. On Open Mosque Day and beyond, we welcome everyone who's curious: come in, ask questions, have a conversation. Our imams and team are always happy to meet you where you are.",
      },
    },
    "contact-section": {
      title: "Contact Us",
      description: {
        "first-chairman": {
          name: "First Chairman",
          personName: "Harethe El Ouadhane",
          email: "h.elouadhane@iz-regensburg.de",
          tel: "+49 176 60800940",
        },
        board: {
          name: "Board",
          email: "vorstand@iz-regensburg.de",
        },
        it: {
          name: "App / Website / IT",
          personName: "Mohamed Amine Bellil",
          email: "mohamed.bellil@iz-regensburg.de",
        },
        "room-reservation": {
          name: "Room Reservation",
          personName: "Najeh Bouzgarrou",
          email: "n.bouzgarrou@iz-regensburg.de",
        },
      },
    },
    "follow-us-section": {
      title: "Follow Us",
      description:
        "Stay connected with us on social media and our website for the latest updates, events, and community news.",
    },
    "donation-section": {
      title: "Donations",
      description:
        "Your donation helps us maintain the mosque, provide educational activities, and support community initiatives. Every contribution matters.",
      iban: {
        description: "IBAN",
        value : "DE30 7505 0000 0026 7651 56"
      },
      bic: {
        description: "BIC",
        value: "BYLADEM1RBG"
      },
      "account-holder": {
        description: "Account Holder",
        value: "Islamisches Zentrum Regensburg"
      },
    },
  },
} as const;
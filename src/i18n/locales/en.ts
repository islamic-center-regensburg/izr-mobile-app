export default {
  common: {
    izr: "Islamic Center of Regensburg",
    copyright: "© {{year}} Islamic Center of Regensburg. All rights reserved.",
    loading: "Getting everything ready for you…",
    welcome: "Welcome",
    "prayer-names": {
      fajr: "Fajr",
      sunrise: "Sunrise",
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
  },
} as const;

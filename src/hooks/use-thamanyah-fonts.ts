import { useFonts } from "expo-font";

export function useThmanyahFonts() {
  const [loaded, error] = useFonts({
    "ThmanyahSans-Black": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/ss01/thmanyahsans-BlackSS01.otf"),
    "ThmanyahSans-Bold": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/ss01/thmanyahsans-BoldSS01.otf"),
    "ThmanyahSans-Light": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/ss01/thmanyahsans-LightSS01.otf"),
    "ThmanyahSans-Medium": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/ss01/thmanyahsans-MediumSS01.otf"),
    "ThmanyahSans-Regular": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/ss01/thmanyahsans-RegularSS01.otf"),
    "ThmanyahSerifDisplay-Black": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/ss01/thmanyahserifdisplay-BlackSS01.otf"),
    "ThmanyahSerifDisplay-Bold": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/ss01/thmanyahserifdisplay-BoldSS01.otf"),
    "ThmanyahSerifDisplay-Light": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/ss01/thmanyahserifdisplay-LightSS01.otf"),
    "ThmanyahSerifDisplay-Medium": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/ss01/thmanyahserifdisplay-MediumSS01.otf"),
    "ThmanyahSerifDisplay-Regular": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/ss01/thmanyahserifdisplay-RegularSS01.otf"),
  });

  return { loaded, error };
}

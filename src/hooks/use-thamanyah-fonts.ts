import { useFonts } from "expo-font";

export function useThmanyahFonts() {
  const [loaded, error] = useFonts({
    "ThmanyahSans-Black": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/thmanyahsans-Black.otf"),
    "ThmanyahSans-Bold": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/thmanyahsans-Bold.otf"),
    "ThmanyahSans-Light": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/thmanyahsans-Light.otf"),
    "ThmanyahSans-Medium": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/thmanyahsans-Medium.otf"),
    "ThmanyahSans-Regular": require("../../assets/fonts/Thmanyah/thmanyahsans/otf/thmanyahsans-Regular.otf"),
    "ThmanyahSerifDisplay-Black": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/thmanyahserifdisplay-Black.otf"),
    "ThmanyahSerifDisplay-Bold": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/thmanyahserifdisplay-Bold.otf"),
    "ThmanyahSerifDisplay-Light": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/thmanyahserifdisplay-Light.otf"),
    "ThmanyahSerifDisplay-Medium": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/thmanyahserifdisplay-Medium.otf"),
    "ThmanyahSerifDisplay-Regular": require("../../assets/fonts/Thmanyah/thmanyahserifdisplay/otf/thmanyahserifdisplay-Regular.otf"),
  });

  return { loaded, error };
}

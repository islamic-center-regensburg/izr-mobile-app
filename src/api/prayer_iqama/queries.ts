import { getPrayerIqamasForMosque } from "../gen";
import { PRAYER_IQAMA_QUERY_KEYS } from "./constants";

export const getPrayerIqamaQueryOptions = (mosqueId: string) => {
  return {
    queryKey: PRAYER_IQAMA_QUERY_KEYS.byMosqueId(mosqueId),
    queryFn: async () => {
      const response = await getPrayerIqamasForMosque({
        path: { mosque_id: mosqueId },
      });
      if (response.error) {
        console.log(response.error.detail);
      }
      return response.data;
    },
    enabled: !!mosqueId,
  };
};

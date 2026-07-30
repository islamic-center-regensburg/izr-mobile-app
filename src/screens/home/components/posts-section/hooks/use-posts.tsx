import { getMosquesQueryOptions } from "@/src/api/mosque/queries";
import { getAllPostsQueryOptions } from "@/src/api/post/queries";
import { useLangStore } from "@/src/store/lang";
import { useMosqueStore } from "@/src/store/mosque";
import { useSuspenseQuery } from "@tanstack/react-query";

export const usePosts = () => {
  const { lang } = useLangStore();
  const { mosque: izrMosqueName } = useMosqueStore();
  const { data: mosques } = useSuspenseQuery(
    getMosquesQueryOptions({ query: { name: izrMosqueName } }),
  );
  const izrMosque = mosques?.data[0];
  const { data: posts } = useSuspenseQuery(
    getAllPostsQueryOptions({
      mosque_id: izrMosque?.id ?? "",
      query: { language: lang },
    }),
  );
  const validPosts = posts?.data.filter((post) => post.translations.length > 0);
  return {
    posts: validPosts ?? [],
  };
};

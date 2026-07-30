import { Heading } from "@/src/components/heading";
import SwipeableCarousel from "@/src/components/swipeable-carousel";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Post from "./components/post";
import { usePosts } from "./hooks/use-posts";

const LatestPosts = () => {
  const { t } = useTranslation();
  const { posts } = usePosts();
  const postsComponents = posts.map((post) => (
    <Post
      key={post.id}
      postId={post.id}
      title={post.translations[0].title}
      content={post.translations[0].description}
    />
  ));

  return (
    <View>
      <Heading className="mb-2 mt-4">
        {t("home-screen.latest-posts-section.title")}
      </Heading>
      <SwipeableCarousel items={postsComponents} />
    </View>
  );
};

export default LatestPosts;

const styles = StyleSheet.create({});

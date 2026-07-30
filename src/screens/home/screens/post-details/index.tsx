import { Image } from "react-native";

import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import SwipeableCarousel from "@/src/components/swipeable-carousel";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { ModalScreen } from "@/src/screens/common/modal-screen";
import { useLocalSearchParams } from "expo-router";
import { usePosts } from "../../components/posts-section/hooks/use-posts";

export const PostDetailsScreen = () => {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const { posts } = usePosts();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return null;
  }

  const translation = post.translations[0];

  if (!translation) {
    return null;
  }

  const imagesComponents = translation?.media?.map((image) => (
    <Glassy key={image.url} className="p-4 rounded-lg mb-2">
      <Image
        className="mx-auto"
        key={image.url}
        source={{ uri: image.url.replace("http://", "https://") }}
        style={{ width: 300, height: 400, borderRadius: 8 }}
      />
    </Glassy>
  ));

  console.log("translation", translation);

  return (
    <ModalScreen>
      <VStack className="gap-4 p-4 justify-center">
        <Heading size="2xl" className="mb-2 text-black">
          {translation.title}
        </Heading>
        <Text>{translation.description}</Text>
        <SwipeableCarousel items={imagesComponents ?? []} />
      </VStack>
    </ModalScreen>
  );
};

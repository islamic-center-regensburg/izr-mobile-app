import { Button, ButtonText } from "@/src/components/button";
import Glassy from "@/src/components/glassy";
import { Text } from "@/src/components/text";
import { useLangStore } from "@/src/store/lang";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
interface PostProps {
  postId: string | undefined | null;
  title: string | undefined | null;
  content: string | undefined | null;
}

const Post = ({ postId, title, content }: PostProps) => {
  const { t } = useTranslation();
  const { lang } = useLangStore();
  return (
    <Glassy className="p-4 rounded-lg mb-2">
      <Text size="lg" className="font-sans-bold">
        {title}
      </Text>
      <Text className="line-clamp-3">{content}</Text>
      <Button
        size="xs"
        variant="link"
        className={cn("w-auto my-2", lang !== "ar" ? "ml-auto" : "mr-auto")}
        onPress={() => {}}
      >
        <ButtonText
          onPress={() =>
            router.navigate({
              pathname: "/(modals)/post-details",
              params: { postId: postId },
            })
          }
        >
          {t("home-screen.latest-posts-section.read-more")}
        </ButtonText>
      </Button>
    </Glassy>
  );
};

export default Post;

const styles = StyleSheet.create({});

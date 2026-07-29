import React, { ReactNode, useRef, useState } from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { VStack } from "./vstack";

interface SwipeableCarouselProps {
  items: ReactNode[];
  showDots?: boolean;
  onIndexChange?: (index: number) => void;
}

const SwipeableCarousel: React.FC<SwipeableCarouselProps> = ({
  items,
  showDots = true,
  onIndexChange,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  const [width, setWidth] = useState(0);

  const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!width) return;
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <VStack space="md" onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      <Animated.View style={{ overflow: "hidden" }}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          onMomentumScrollEnd={handleMomentumEnd}
          contentContainerStyle={{ alignItems: "flex-start" }}
        >
          {items.map((item, index) => (
            <View
              className="my-auto"
              key={index}
              style={{ width: width || undefined }}
            >
              {item}
            </View>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      {showDots && items.length > 1 && (
        <View className="flex flex-row gap-2 items-center justify-center">
          {items.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => goToSlide(index)}
              hitSlop={10}
            >
              <View
                className={`h-2 rounded-full ${
                  activeIndex === index ? "bg-green-900 w-3" : "bg-gray-300 w-2"
                }`}
              />
            </Pressable>
          ))}
        </View>
      )}
    </VStack>
  );
};

export default SwipeableCarousel;

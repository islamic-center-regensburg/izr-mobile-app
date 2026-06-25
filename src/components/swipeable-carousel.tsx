import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";
import PagerView from "react-native-pager-view";
import { HStack } from "./hstack";
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
  const pagerRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const [measureWidth, setMeasureWidth] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const hasSetInitialHeight = useRef(false);

  const handleItemLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (height <= 0) return; // ignore bogus collapsed measurements
    setHeights((prev) => {
      if (prev[index] === height) return prev;
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  useEffect(() => {
    const target = heights[activeIndex] ?? 0;
    if (target <= 0) return;

    if (!hasSetInitialHeight.current) {
      // snap immediately on first measurement — no grow-animation on mount
      animatedHeight.setValue(target);
      hasSetInitialHeight.current = true;
      return;
    }

    Animated.timing(animatedHeight, {
      toValue: target,
      duration: 200,
      useNativeDriver: false, // height can't use native driver
    }).start();
  }, [activeIndex, heights]);

  const goToSlide = (index: number) => {
    pagerRef.current?.setPage(index);
  };

  return (
    <VStack
      space="md"
      onLayout={(e) => setMeasureWidth(e.nativeEvent.layout.width)}
    >
      {/* Hidden measuring layer: same width as the visible carousel, but
          unconstrained height, so it reports real content height instead
          of inheriting the 0px the animated PagerView wrapper starts at. */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          opacity: 0,
          zIndex: -1,
        }}
        pointerEvents="none"
      >
        {items.map((item, index) => (
          <View
            key={index}
            style={measureWidth ? { width: measureWidth } : undefined}
            onLayout={handleItemLayout(index)}
          >
            {item}
          </View>
        ))}
      </View>

      <Animated.View style={{ height: animatedHeight }}>
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={(e) => {
            const newIndex = e.nativeEvent.position;
            setActiveIndex(newIndex);
            onIndexChange?.(newIndex);
          }}
        >
          {items.map((item, index) => (
            <View key={index}>{item}</View>
          ))}
        </PagerView>
      </Animated.View>

      {showDots && items.length > 1 && (
        <HStack space="sm" className="items-center justify-center">
          {items.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => goToSlide(index)}
              hitSlop={10}
            >
              <View
                className={`h-2 rounded-full ${
                  activeIndex === index ? "bg-blue-500 w-6" : "bg-gray-300 w-2"
                }`}
              />
            </Pressable>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

export default SwipeableCarousel;

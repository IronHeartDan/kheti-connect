import { View, Text, StyleSheet, Image, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import PagerView from "react-native-pager-view";

export default function Carousel({ carouselItems }) {
  const currentCarouselIndex = useRef(0);
  const carouselRef = useRef<PagerView>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentCarouselIndex.current =
        (currentCarouselIndex.current + 1) % carouselItems.length;
      carouselRef.current?.setPage(currentCarouselIndex.current);
      setActiveIndex(currentCarouselIndex.current);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePageChange = (page: number) => {
    setActiveIndex(page);
    currentCarouselIndex.current = page;
  };

  return (
    <>
      <PagerView
        ref={carouselRef}
        style={styles.bannerCarousel}
        initialPage={0}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {carouselItems.map((item, index) => (
          <View key={index}>
            <Image source={item.image} style={styles.bannerImage} />
          </View>
        ))}
      </PagerView>
      <View style={styles.indicatorContainer}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bannerCarousel: {
    height: 250,
  },
  bannerImage: {
    borderRadius: 16,
    width: "100%",
    height: 250,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "black",
  },
});

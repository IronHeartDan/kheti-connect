import {
  Animated,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "@/components/home/SearchInput";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import Carousel from "@/components/Carousel";
import FeaturedItem from "@/components/list-items/FeaturedItem";
import CategoryItem from "@/components/list-items/CategoryItem";

const carouselItems = [
  {
    title: "Welcome",
    image: require("../../assets/images/hero.webp"),
  },
  {
    title: "Welcome",
    image: require("../../assets/images/hero.webp"),
  },
  {
    title: "Welcome",
    image: require("../../assets/images/hero.webp"),
  },
];

const categories = [
  {
    id: 1,
    name: "Equipment Rentals",
  },
  {
    id: 2,
    name: "Crop Services",
  },
  {
    id: 3,
    name: "Fertilizers",
  },
  {
    id: 4,
    name: "Seeds",
  },
  {
    id: 5,
    name: "Pesticides",
  },
  {
    id: 6,
    name: "Irrigation",
  },
  {
    id: 7,
    name: "Harvesting",
  },
  {
    id: 8,
    name: "Transport",
  },
  {
    id: 9,
    name: "Storage",
  },
  {
    id: 10,
    name: "Others",
  },
];

const featured = [
  {
    id: 1,
    name: "Mahindra Arjun Novo",
    image: require("../../assets/products/tractor.png"),
    pricePerDay: "₹2,500/day",
    location: "Haryana, India",
  },
  {
    id: 2,
    name: "Kubota MU5501",
    image: require("../../assets/products/tractor.png"),
    pricePerDay: "₹2,200/day",
    location: "Punjab, India",
  },
  {
    id: 3,
    name: "John Deere 5310",
    image: require("../../assets/products/tractor.png"),
    pricePerDay: "₹3,000/day",
    location: "Rajasthan, India",
  },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  useScrollToTop(scrollRef);

  const HEADER_MAX_HEIGHT = 500;
  const HEADER_MIN_HEIGHT = 100 + insets.top;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const animatedTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: "clamp",
  });

  const bannerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -500],
    extrapolate: "clamp",
  });

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 4],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
          },
        ]}
      >
        <View style={{ marginTop: insets.top }} />
        <LinearGradient
          colors={[
            "rgba(245,221,90,1)",
            "rgba(245,221,90,0.8)",
            "white",
            "rgba(255,255,255,0)",
          ]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />

        <Animated.Image
          source={require("../../assets/images/logo.png")}
          style={[
            styles.logo,
            {
              opacity: animatedOpacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.searchCon,
            {
              transform: [{ translateY: animatedTranslateY }],
            },
          ]}
        >
          <SearchInput />
        </Animated.View>

        <Animated.View
          style={[
            styles.bannerCon,
            {
              opacity: animatedOpacity,
              transform: [{ translateY: bannerTranslateY }],
            },
          ]}
        >
          <Text style={styles.bannerTitle}>
            Farming Essentials, Rentals, and More
          </Text>
          <Carousel carouselItems={carouselItems} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            numColumns={categories.length / 2}
            scrollEnabled={false}
            data={categories}
            contentContainerStyle={{
              gap: 10,
              paddingHorizontal: 12,
            }}
            columnWrapperStyle={{ gap: 10 }}
            renderItem={({ index }) => (
              <CategoryItem item={categories[index]} key={index} />
            )}
          />
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured</Text>

        {featured.map((item, index) => (
          <FeaturedItem item={item} key={index} />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️</Text>
          <Text style={styles.footerText}>For the farmers, by the farmers</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    overflow: "hidden",
  },
  logo: {
    marginLeft: -24,
    width: 200,
    height: 50,
  },
  searchCon: {
    marginHorizontal: 12,
    zIndex: 2,
  },
  bannerCon: {
    padding: 12,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  scrollViewContent: {
    paddingTop: 500,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 12,
    marginStart: 12,
  },
  footer: {
    height: 100,
  },
  footerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 12,
  },
});

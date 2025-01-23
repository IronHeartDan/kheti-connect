import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_MAX_HEIGHT = 200;
  const HEADER_MIN_HEIGHT = 60 + insets.top;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    profileImage: null,
    totalOrders: 10,
    totalFavorites: 5,
  };

  const menuSections = [
    {
      title: "Activity",
      data: [
        { label: "My Orders", screen: "MyOrders" },
        { label: "My Rentals", screen: "MyRentals" },
        { label: "Favorites", screen: "Favorites" },
      ],
    },
    {
      title: "Settings",
      data: [
        { label: "Notifications", screen: "Notifications" },
        { label: "Help & Support", screen: "HelpSupport" },
        { label: "Settings", screen: "Settings" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Collapsible Header */}
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, paddingTop: insets.top },
        ]}
      >
        <Animated.View
          style={[styles.headerContent, { opacity: headerContentOpacity }]}
        >
          {user.profileImage && (
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
          )}

          {!user.profileImage && (
            <MaterialCommunityIcons name="account-circle" size={100} />
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </Animated.View>
        <Animated.Text
          style={[styles.collapsedTitle, { opacity: headerTitleOpacity }]}
        >
          {user.name}
        </Animated.Text>
      </Animated.View>

      {/* Scrollable Content */}
      {/* Menu Section List */}
      <Animated.SectionList
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        sections={menuSections}
        keyExtractor={(item, index) => item.label + index}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Text style={styles.menuItemText}>{item.label}</Text>
            <MaterialCommunityIcons name="chevron-right" size={20} />
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <>
            <LottieView
              autoPlay
              style={{
                width: 300,
                height: 300,
                alignSelf: "center",
              }}
              source={require("../../assets/lottie/farmer.json")}
            />
            <TouchableOpacity style={styles.logoutBtn} onPress={() => {}}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <View style={{ padding: 20, alignItems: "center" }}>
              <Text style={{ color: "#999" }}>App Version 1.0.0</Text>
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(245,221,90,1)",
    zIndex: 1000,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContent: {
    alignItems: "center",
  },
  collapsedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    position: "absolute",
    bottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  scrollContent: {
    paddingTop: 200,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  logoutBtn: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;

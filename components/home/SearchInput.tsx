import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

const SearchInput = () => {
  return (
    <View style={styles.searchInputCon}>
      <MaterialCommunityIcons name="magnify" size={24} color="black" />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="rgba(0,0,0,0.5)"
        />
      </View>
      <View style={styles.verticalDivider} />
      <MaterialCommunityIcons name="microphone" size={24} color="black" />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  searchInputCon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    gap: 8,
  },
  searchInput: {
    fontSize: 16,
  },
});

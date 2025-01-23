import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function CategoryItem({ item }) {
  return (
    <View style={styles.categoryItem}>
      <LinearGradient
        colors={["rgba(245,221,90,1)", "rgba(245,221,90,0.8)", "white"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          borderRadius: 16,
        }}
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    width: 100,
    height: 100,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  itemText: {
    fontSize: 12,
    textAlign: "center",
  },
});

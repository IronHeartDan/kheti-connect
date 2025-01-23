import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function RentalItem({ item }) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.pricePerDay}</Text>
        <Text style={styles.location}>{item.location}, India</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFA726",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

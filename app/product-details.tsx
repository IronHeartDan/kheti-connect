import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ProductDetailsScreen = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const product = {
    name: "John Deere Tractor 5075",
    images: [
        require("../assets/products/tractor.png"),
        require("../assets/products/tractor.png"),
        require("../assets/products/tractor.png"),
    ],
    description:
      "A reliable and powerful tractor designed for versatile agricultural tasks. Equipped with a 75HP engine and advanced hydraulics.",
    price: "₹9,50,000",
    location: "Punjab, India",
    features: [
      "75HP powerful engine",
      "4WD for superior traction",
      "Advanced hydraulics for versatile operations",
      "Low fuel consumption",
    ],
    reviews: [
      { id: 1, user: "Aman", rating: 5, comment: "Excellent tractor for farming!" },
      { id: 2, user: "Pooja", rating: 4, comment: "Very reliable and efficient." },
      { id: 3, user: "Rajesh", rating: 4.5, comment: "Great value for money." },
    ],
    averageRating: 4.5,
  };

  const handleScroll = (event) => {
    const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={product.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <View style={styles.indicatorContainer}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentImageIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.rating}>Rating: {product.averageRating}★</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.location}>{product.location}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.sectionTitle}>Features</Text>
        {product.features.map((feature, index) => (
          <Text key={index} style={styles.feature}>
            - {feature}
          </Text>
        ))}

        <TouchableOpacity
          onPress={() => setReviewsVisible(!reviewsVisible)}
          style={styles.toggleReviewsButton}
        >
          <Text style={styles.toggleReviewsButtonText}>
            {reviewsVisible ? "Hide Reviews" : "Show Reviews"}
          </Text>
        </TouchableOpacity>

        {reviewsVisible && (
          <View>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {product.reviews.map((review) => (
              <View key={review.id} style={styles.reviewContainer}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewRating}>Rating: {review.rating}★</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buttonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.buttonText}>Rent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "#4CAF50",
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  toggleReviewsButton: {
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  toggleReviewsButtonText: {
    fontSize: 14,
    color: "#333",
  },
  reviewContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  rentButton: {
    flex: 1,
    backgroundColor: "#FFA726",
    paddingVertical: 15,
    borderRadius: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailsScreen;

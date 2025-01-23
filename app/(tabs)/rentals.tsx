import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import RentalFilterSheet from "@/components/sheets/RentalFilterSheet";
import RentalItem from "@/components/list-items/RentalItem";

const RentalsScreen = () => {
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const bottomSheetRef = useRef(null);
  const [filters, setFilters] = useState({
    category: { Tractor: false, Harvester: false },
    location: { Haryana: false, Punjab: false, Rajasthan: false },
    priceRange: { "₹2000-₹2500": false, "₹2500-₹3000": false },
  });

  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchRentals = async (pageNum) => {
    setLoading(true);
    // Simulate fetching data from API
    setTimeout(() => {
      const newRentals = Array.from({ length: 10 }, (_, index) => ({
        id: pageNum * 10 + index + 1,
        name: `Rental Item ${pageNum * 10 + index + 1}`,
        image: require("../../assets/products/tractor.png"),
        category: index % 2 === 0 ? "Tractor" : "Harvester",
        pricePerDay: `₹${2000 + index * 100}/day`,
        priceValue: 2000 + index * 100,
        location: ["Haryana", "Punjab", "Rajasthan"][index % 3],
      }));

      setRentals((prevRentals) => [...prevRentals, ...newRentals]);
      setHasMore(newRentals.length > 0); // Check if more data exists
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchRentals(page);
  }, [page]);

  const applyFilters = (selectedFilters) => {
    const selectedCategories = Object.keys(selectedFilters.category).filter(
      (key) => selectedFilters.category[key]
    );
    const selectedLocations = Object.keys(selectedFilters.location).filter(
      (key) => selectedFilters.location[key]
    );
    const selectedPriceRanges = Object.keys(selectedFilters.priceRange).filter(
      (key) => selectedFilters.priceRange[key]
    );

    const filtered = rentals.filter((rental) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(rental.category);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(rental.location);
      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range
            .replace("₹", "")
            .replace("/day", "")
            .split("-")
            .map(Number);
          return rental.priceValue >= min && rental.priceValue <= max;
        });

      return matchesCategory && matchesLocation && matchesPrice;
    });

    setFilteredRentals(filtered);
  };

  const loadMoreRentals = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const openFilterSheet = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rentals</Text>
        <TouchableOpacity style={styles.filterButton} onPress={openFilterSheet}>
          <MaterialCommunityIcons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={scrollRef}
        data={filteredRentals.length > 0 ? filteredRentals : rentals}
        renderItem={({ item }) => <RentalItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMoreRentals}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="large" color="#666" />
            </View>
          ) : null
        }
      />
      <RentalFilterSheet
        ref={bottomSheetRef}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});

export default RentalsScreen;

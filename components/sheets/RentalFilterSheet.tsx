import React, { useRef, useMemo, useImperativeHandle, forwardRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const RentalFilterSheet = forwardRef(
  ({ filters, setFilters, applyFilters }, ref) => {
    const bottomSheetRef = useRef(null);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.expand(),
    }));

    const snapPoints = useMemo(() => ["50%"], []);

    const toggleFilter = (filterType, option) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: {
          ...prevFilters[filterType],
          [option]: !prevFilters[filterType][option],
        },
      }));
    };

    const applyFilterChanges = () => {
      bottomSheetRef.current?.close();
      applyFilters(filters);
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.sheetBackground}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
      >
        <BottomSheetView>
          <View style={styles.sheetContent}>
            <Text style={styles.filterTitle}>Filter Options</Text>

            {/* Category Filter */}
            <Text style={styles.filterLabel}>Category</Text>
            {Object.keys(filters.category).map((option) => (
              <View key={option} style={styles.checkboxContainer}>
                <Checkbox
                  value={filters.category[option]}
                  onValueChange={() => toggleFilter("category", option)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}

            {/* Location Filter */}
            <Text style={styles.filterLabel}>Location</Text>
            {Object.keys(filters.location).map((option) => (
              <View key={option} style={styles.checkboxContainer}>
                <Checkbox
                  value={filters.location[option]}
                  onValueChange={() => toggleFilter("location", option)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}

            {/* Price Filter */}
            <Text style={styles.filterLabel}>Price</Text>
            {Object.keys(filters.priceRange).map((option) => (
              <View key={option} style={styles.checkboxContainer}>
                <Checkbox
                  value={filters.priceRange[option]}
                  onValueChange={() => toggleFilter("priceRange", option)}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilterChanges}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  sheetContent: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: "#FFA726",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RentalFilterSheet;

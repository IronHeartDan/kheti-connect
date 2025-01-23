import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");

  const validatePhoneNumber = () => {
    if (phoneNumber.trim() === "") {
      setError("Phone number is required.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    setError("");
    return true;
  };

  const validateOtp = () => {
    if (otp.trim() === "") {
      setError("OTP is required.");
      return false;
    }
    if (!/^[0-9]{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return false;
    }
    setError("");
    return true;
  };

  const sendOtp = () => {
    if (validatePhoneNumber()) {
      setIsOtpSent(true);
      Keyboard.dismiss();
    }
  };

  const handleLogin = () => {
    if (validateOtp()) {
      router.replace("/(tabs)");
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.6 }}>
            <Image
              source={require("../assets/images/farm-potrate.webp")}
              style={styles.bg}
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.7)", "transparent"]}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 20, top: insets.top }}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={{ color: "white", fontSize: 16 }}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 0.4, paddingHorizontal: 20, alignItems: "center" }}
          >
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.subtitle}>
              Buy, Rent, and Sell Agricultural Equipment
            </Text>

            {!isOtpSent && (
              <TextInput
                style={styles.input}
                placeholder={"Enter your phone number"}
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={10}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            )}

            {isOtpSent && (
              <TextInput
                style={styles.input}
                placeholder={"Enter OTP"}
                keyboardType="number-pad"
                returnKeyType="done"
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
              />
            )}

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {!isOtpSent && (
              <TouchableOpacity style={styles.button} onPress={sendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            )}

            {isOtpSent && (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.footer}>
              © 2025 Kheti Connect. All rights reserved.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#FF5252",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: "#757575",
    textAlign: "center",
  },
});

export default LoginScreen;

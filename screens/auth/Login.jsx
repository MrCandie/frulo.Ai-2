import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../context/auth";

export default function LoginScreen() {
  const { login } = useAuth();

  const handleLogin = (role) => {
    login(role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TouchableOpacity
        style={[styles.button, styles.customerButton]}
        onPress={() => handleLogin("customer")}>
        <Text style={styles.buttonText}>Login as Customer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.vendorButton]}
        onPress={() => handleLogin("vendor")}>
        <Text style={styles.buttonText}>Login as Vendor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  customerButton: {
    backgroundColor: "#007bff",
  },
  vendorButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

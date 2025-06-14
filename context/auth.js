import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const login = async (role) => {
    try {
      setIsAuthenticated(true);
      setRole(role);

      await AsyncStorage.setItem("isAuth", JSON.stringify({ isAuthenticated }));
      await AsyncStorage.setItem("role", JSON.stringify(role));
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);

      await AsyncStorage.removeItem("isAuth");
      await AsyncStorage.removeItem("role");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await AsyncStorage.getItem("isAuth");
        const role = await AsyncStorage.getItem("role");

        if (role && isAuth) {
          setRole(JSON.parse(role));
          setIsAuthenticated(JSON.parse(isAuth).isAuthenticated);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
        role,
      }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

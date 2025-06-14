import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/auth";
import { ToastProvider } from "./context/toast-context";
import Screen from "./screens";
import Toast from "./components/Toast";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ToastProvider>
          <Screen />
          <Toast />
        </ToastProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}

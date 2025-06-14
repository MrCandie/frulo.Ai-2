import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Picker from "../../components/Picker";
import { useToast } from "../../context/toast-context";

export default function CreateBookingScreen({ navigation }) {
  const [service, setService] = useState("");
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const { showToast } = useToast();

  const handleBooking = async () => {
    try {
      if (!service) return showToast("Select a service", "warning");
      if (!date) return showToast("Select a booking date", "warning");

      const storedBookings = await AsyncStorage.getItem("bookings");
      const parsedBookings = storedBookings ? JSON.parse(storedBookings) : [];

      // Check for existing booking at the same date/time
      const isSlotTaken = parsedBookings.some(
        (booking) =>
          new Date(booking.date).getTime() === new Date(date).getTime()
      );

      if (isSlotTaken) return showToast("Sorry, that time’s taken.", "error");

      const newBooking = {
        service,
        date,
        id: Date.now().toString(),
        status: "pending",
      };

      const updatedBookings = [...parsedBookings, newBooking];
      await AsyncStorage.setItem("bookings", JSON.stringify(updatedBookings));

      showToast("Booking successful");
      navigation.navigate("CustomerScreen");

      // reset
      setService("");
      setDate(new Date());
    } catch (error) {
      showToast("Error booking service", "error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        <Picker
          onSelect={(service) => setService(service)}
          label="Select Service"
          data={["Haircut", "Makeup"]}
          title={service}
          placeholder="Select service"
          error={!service}
        />

        <Picker
          label="Select Date/Time"
          custom
          onPress={() => setVisible(true)}
          placeholder="Select booking time"
          error={!date}
          title={format(new Date(date), "PPpp")}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Create Booking</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        mode="datetime"
        isVisible={visible}
        minimumDate={new Date()}
        date={new Date()}
        onConfirm={(selectedDate) => {
          setVisible(false);
          setDate(format(selectedDate, "yyyy-MM-dd HH:mm"));
        }}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

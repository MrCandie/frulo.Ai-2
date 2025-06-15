# 📆 Frulo Booking App

A simple React Native mobile application with two user roles — **Customer** and **Vendor** — allowing service booking, review, and approval.

---

## 🎯 Goal

To build a 10-hour MVP that lets:

- Customers submit service bookings.
- Vendors view and approve or reject bookings.

---

## 📱 Features

### 🔹 Authentication

- Mock authentication with two roles:

### 🔹 Customer Flow

- Select a service (e.g. Haircut, Makeup).
- Choose a valid date and time (past dates/times are disallowed).
- Submit a booking.
- Prevents double booking for the same time slot.

### 🔹 Vendor Flow

- View all submitted bookings.
- Approve or reject individual bookings.
- View status color-coded:
  - 🟡 **Pending**
  - 🟢 **Approved**
  - 🔴 **Rejected**

### 🔹 Feedback

- Users receive toast feedback on actions.
- Optionally simulates WhatsApp-style confirmation.

---

## 🛠️ Setup Instructions

### 🔧 Requirements

- Node.js v16+
- npm or yarn
- React Native CLI or Expo CLI
- Android Studio / Xcode (for device/emulator)

### 🚀 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/MrCandie/frulo.Ai-2
   cd frulo-booking
   ```

### 2. Install Dependencies

```bash
npx expo install
```

### 3. Run with Expo

```bash
npx expo
```

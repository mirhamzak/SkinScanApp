
# Skin Scan App

Skin Scan is a React Native mobile application that simulates a facial skin scan using the device's camera and displays personalized skincare recommendations.

## Features

- Uses `react-native-vision-camera` for high-performance camera access
- Simulates a face scan using the front camera
- Displays skincare recommendations after scan
- Uses stack navigator only (no bottom tabs)
- Handles camera permissions on both Android and iOS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mirhamzak/SkinScanApp.git
   cd skin-scan-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. For iOS, install CocoaPods:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Set permissions for camera:

   - **Android**: Add the following permissions in `AndroidManifest.xml`:
     ```xml
     <uses-permission android:name="android.permission.CAMERA" />
     ```

   - **iOS**: Add the following keys in `Info.plist`:
     ```xml
     <key>NSCameraUsageDescription</key>
     <string>We need camera access to scan your face.</string>
     <key>NSMicrophoneUsageDescription</key>
     <string>We need microphone access for future audio features.</string>
     ```

5. Run the project:
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## How it Works

- App launches with front camera active
- User taps "Simulate Face Scan"
- After a 3-second delay, user is navigated to the Result screen
- Scan results and product recommendations are displayed

## Author

Hamza Khan  
Email: hamzakhan4697@gmail.com
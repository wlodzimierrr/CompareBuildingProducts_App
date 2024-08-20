import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'CompareBuildingProducts',
  cordova: {},
  loggingBehavior: "debug",
  webDir: "out",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  },
  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    hostname: 'localhost:5000',
  },
  android: {
     loggingBehavior: "debug",
     webContentsDebuggingEnabled: true,
  },
  ios: {
    loggingBehavior: "debug",
    webContentsDebuggingEnabled: true,
  }
};

export default config;

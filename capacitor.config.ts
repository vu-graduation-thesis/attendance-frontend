import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "pro.nguyenhuuvu.app",
  appName: "Fithou Attendance",
  webDir: "dist",
  server: {
    androidScheme: "https",
    cleartext: true,
    allowNavigation: ["*"],
  },
};

export default config;

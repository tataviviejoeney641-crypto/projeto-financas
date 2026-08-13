import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

const rawBundleId = "{{bundle_id}}";
const bundleId = rawBundleId
  .replace(/[-_]/g, ".")
  .replace(/[^a-zA-Z0-9.]/g, "")
  .replace(/\.+/g, ".")
  .replace(/^\.+|\.+$/g, "")
  .toLowerCase()
  .split(".")
  .map((segment) => (/^[a-zA-Z]/.test(segment) ? segment : "x" + segment))
  .join(".") || "space.manus.app";
const timestamp = bundleId.split(".").pop()?.replace(/^t/, "") ?? "";
const schemeFromBundleId = `manus${timestamp}`;

const env = {
  appName: "ExpenseFlow",
  appSlug: "{{project_name}}",
  logoUrl: "/manus-storage/expenseflow-icon_973c1aad.png",
  scheme: schemeFromBundleId,
  iosBundleId: bundleId,
  androidPackage: bundleId,
};

const config: ExpoConfig = {
  name: env.appName,
  slug: env.appSlug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: env.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: env.iosBundleId,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0B5C66",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: env.androidPackage,
    permissions: ["POST_NOTIFICATIONS"],
    intentFilters: [{ action: "VIEW", autoVerify: true, data: [{ scheme: env.scheme, host: "*" }], category: ["BROWSABLE", "DEFAULT"] }],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    ["expo-camera", { cameraPermission: "Permita que o ExpenseFlow fotografe recibos." }],
    ["expo-image-picker", { photosPermission: "Permita que o ExpenseFlow selecione recibos." }],
    ["expo-splash-screen", { image: "./assets/images/splash-icon.png", imageWidth: 200, resizeMode: "contain", backgroundColor: "#0B5C66" }],
    ["expo-build-properties", { android: { buildArchs: ["armeabi-v7a", "arm64-v8a"], minSdkVersion: 24 } }],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
};

export default config;

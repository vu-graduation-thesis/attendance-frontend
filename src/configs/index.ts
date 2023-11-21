import { Capacitor } from "@capacitor/core";

const env = {
  apiEndpoint: import.meta.env.VITE_API_END_POINT as string,
  apiEndpointV2: import.meta.env.VITE_API_END_POINT_V2 as string,
  s3AssetUrl: import.meta.env.VITE_S3_ASSET_URL as string,
  env: import.meta.env.VITE_ENV as string,
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
  },
  domain: import.meta.env.VITE_DOMAIN as string,
};

const configs = {
  env: env.env,
  apiEndpoint: env.apiEndpoint,
  apiEndpointV2: env.apiEndpointV2,
  s3AssetUrl: env.s3AssetUrl,
  basePath: Capacitor.isNativePlatform() ? "/app" : "",
  firebase: env.firebase,
  domain: env.domain,
};

export default configs;

// Types for the API package
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env?: ImportMetaEnv;
}

// Extend process.env for Expo
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_API_URL?: string;
  }
}

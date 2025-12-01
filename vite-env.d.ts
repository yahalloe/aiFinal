/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  // add other custom vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

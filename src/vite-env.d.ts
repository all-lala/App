/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_FONTS_API_KEY: string;
  readonly LOGROCKET_APP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

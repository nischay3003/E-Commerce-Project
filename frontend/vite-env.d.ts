/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API: string;
  // add other variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

export {};

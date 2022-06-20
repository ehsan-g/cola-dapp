declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DOMAIN: string;
      REACT_APP_DOMAIN_LOCAL: string;
      REACT_APP_DOMAIN_STAG: string;
      REACT_APP_DOMAIN_PROD: string;
      REACT_APP_DOMAIN_DEV: string;
    }
  }
}

export {};

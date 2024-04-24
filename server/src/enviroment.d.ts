declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      PORT: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      JWT_STRING: string;
      // Add enviroment varibles type definitions here
    }
  }
}

// Converts this file into the module system.
export {};

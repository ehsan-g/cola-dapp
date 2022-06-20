export interface ThemeConfig {
  theme: string;
}

export interface AxiosConfig {
  headers: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
}
export enum Company {
  NONE = "None",
  PEPSI = "Pepsi",
  COKE = "Coke",
  JOINED = "Joined",
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  image: string;
  permission_level: number;
  created_at: string;
  is_superuser: boolean;
  company?: number;
  profile: {};
}

export interface LoginState {
  user: User | {};
  status?: "idle" | "loading" | "succeeded" | "failed";
  error?: string | undefined;
  profile?: User;
}

export interface BuildingImage {
  id: number;
  image: string;
  alt_text: string;
  created_at: string;
  updated_at: string;
  building: number;
}
export interface Address {
  id: number;
  country: string;
  city: string;
  address: string;
  created_at: string;
  building: number;
}

export interface Floor {
  id?: number;
  title?: string;
  permission_level: number;
  building?: number;
  rooms?: Room[];
}

export interface Room {
  id?: number;
  building?: number;
  permission_level: number;
  title?: string;
}

export interface Building {
  id?: number;
  building_name?: string;
  description?: string;
  company?: number;
  image?: BuildingImage;
  address?: Address;
  floors?: Floor[];
}

export interface Join {
  message: string;
  isReg: "registered" | "left" | "N/A";
  status: "idle" | "loading" | "succeeded" | "failed";
}

export enum IsReg {
  YES = 1,
  NO = 0,
}

export enum ThemeType {
  NONE = "NONE",
  PEPSI = "PEPSI_THEME",
  COKE = "COKE_THEME",
}

export enum ModeType {
  DARK = "dark",
  LIGHT = "light",
}

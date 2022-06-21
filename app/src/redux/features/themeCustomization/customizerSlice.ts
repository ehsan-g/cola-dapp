import { createSlice } from "@reduxjs/toolkit";
import { ModeType, ThemeType } from "../../types/types";

export interface CustomizeState {
  activeTheme?: ThemeType;
  activeMode?: "light" | "dark" | "loading";
  status?: "success" | "loading" | "failed";
}

const initialState: CustomizeState = {
  activeTheme: ThemeType.COKE, // PEPSI or COKE
  activeMode: "dark", // light or dark
  status: "loading",
};

export const custumizerSlice = createSlice({
  name: "themeCustomizer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTheme: (state, action) => {
      let theme;

      if (action.payload === 2) {
        theme = ThemeType.COKE;
      } else if (action.payload === 1) {
        theme = ThemeType.PEPSI;
      } else {
        if (state.activeTheme === ThemeType.COKE) {
          theme = ThemeType.PEPSI;
        } else {
          theme = ThemeType.COKE;
        }
      }

      state.activeTheme = theme;
    },
    changeMode: (state) => {
      if (state.activeMode === ModeType.DARK) {
        state.activeMode = ModeType.LIGHT;
      } else if (state.activeMode === ModeType.LIGHT) {
        state.activeMode = ModeType.DARK;
      }
    },
  },
});

export const { changeTheme, changeMode } = custumizerSlice.actions;
export default custumizerSlice.reducer;

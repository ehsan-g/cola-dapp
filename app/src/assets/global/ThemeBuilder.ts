import _ from "lodash";
import { createTheme } from "@mui/material/styles";

import components from "./Override";
import type { RootState } from "../../redux/app/store";
import { ThemeConfig, ThemeType } from "../../redux/types/types";
import { useAppSelector } from "../../redux/app/hooks";

const baseTheme = {
  palette: {
    primary: {
      main: "#00964b",
      light: "#e6f4ff",
      dark: "#1674f4",
    },
    secondary: {
      main: "#8338ec",
      light: "#f2cc8f",
      dark: "#00c292",
      contrastText: "#ffcc00",
    },
    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.1,
      hover: "rgba(0, 0, 0, 0.03)",
    },
  },

  components,
};

const themesOptions = [
  {
    name: ThemeType.PEPSI,
    palette: {
      primary: {
        main: "#4ea4e2",
        light: "#e6f4ff",
        dark: "#ddeb23",
      },
      secondary: {
        main: "#4ea4e2",
      },
    },
  },
  {
    name: ThemeType.COKE,
    palette: {
      primary: {
        main: "#d43653",
        light: "#fce6ed",
        dark: "#f2d5d3",
      },
      secondary: {
        main: "#fce6ed",
      },
    },
  },
];

export const BuildTheme = (config: ThemeConfig) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  const customize = useAppSelector((state: RootState) => state.custumize);
  const baseMode = {
    palette: {
      mode: customize.activeMode,
      background: {
        default: customize.activeMode === "dark" ? "#20232a" : "#fafbfb",
        paper: customize.activeMode === "dark" ? "#282C34" : "#fafbfb",
      },
      text: {
        primary:
          customize.activeMode === "dark" ? "#ffff" : "rgba(0, 0, 0, 0.87)",
        secondary: customize.activeMode === "dark" ? "#cddc39" : "#777e89",
        custom: "black",
      },
    },
  };
  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  const theme = createTheme(_.merge({}, baseTheme, baseMode, themeOptions, {}));
  return theme;
};

import { BuildTheme } from "./ThemeBuilder";
import type { RootState } from "../../redux/app/store";
import { useAppSelector } from "../../redux/app/hooks";

const ColaTheme = () => {
  const customize = useAppSelector((state: RootState) => state.custumize);
  const theme = BuildTheme({
    theme: customize.activeTheme || "",
  });

  return theme;
};
export default ColaTheme;

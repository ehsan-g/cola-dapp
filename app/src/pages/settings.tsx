import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Avatar,
  Badge,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  changeMode,
  changeTheme,
} from "../redux/features/themeCustomization/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeType } from "../redux/types/types";
import KeyIcon from "@mui/icons-material/Key";
import { logOut } from "../redux/features/auth/userSlice";

export default function Settings() {
  const dispatch = useAppDispatch();

  const customize = useAppSelector((state) => state.custumize);
  const { profile } = useAppSelector((state) => state.user);

  const handleModeChange = () => {
    if (!customize) return;
    dispatch(changeMode());
  };

  const handleThemeChange = () => {
    if (!customize) return;
    dispatch(changeTheme(1));
  };

  return (
    <Grid
      container
      // direction="column"
      // justifyContent="center"
      // alignItems="flex-end"
      sx={{ mt: 6, width: "100%" }}
      spacing={2}
    >
      <Grid item>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          {customize.activeMode} mode
          <IconButton sx={{ ml: 1 }} onClick={handleModeChange} color="inherit">
            {customize.activeMode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Grid>
      <Grid item>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          {customize.activeTheme}
          <IconButton
            sx={{ ml: 1 }}
            onClick={handleThemeChange}
            color="inherit"
          >
            {customize.activeTheme === ThemeType.PEPSI ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Grid>
      <Grid item sx={{ width: "100%" }}>
        <ExAlert />
      </Grid>
    </Grid>
  );
}

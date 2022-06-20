import Box from "@mui/material/Box";
import { Grid, IconButton } from "@mui/material";
import {
  changeMode,
  changeTheme,
} from "../redux/features/themeCustomization/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import ExAlert from "../components/settings/Alert";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeType } from "../redux/types/types";
import ApartmentIcon from "@mui/icons-material/Apartment";

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
    dispatch(changeTheme(profile?.company));
  };

  return (
    <Grid container sx={{ mt: 6, width: "100%" }} spacing={2}>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            fontSize: "9px",
          }}
        >
          {customize.activeMode} mode
          <IconButton onClick={handleModeChange} color="inherit">
            {customize.activeMode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
            fontSize: "8px",
          }}
        >
          {customize.activeTheme}
          <IconButton
            sx={{ ml: 1 }}
            onClick={handleThemeChange}
            color="inherit"
          >
            {customize.activeTheme === ThemeType.PEPSI ? (
              <ApartmentIcon color="secondary" />
            ) : (
              <ApartmentIcon color="primary" />
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

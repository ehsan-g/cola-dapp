import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { ThemeType } from "../../redux/types/types";

export default function CustomAppBar() {
  const customize = useAppSelector((state) => state.custumize);

  return (
    <Stack
      spacing={2}
      sx={{ position: "fixed", flexGrow: 1, left: 0, right: 0 }}
    >
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              maxWidth: "100%",
              margin: "auto",
            }}
          >
            {customize.activeTheme === ThemeType.COKE ? (
              <img
                src="/images/coke-typo.png"
                alt="cola"
                style={{ maxWidth: "30%", opacity: "50%" }}
              />
            ) : (
              <img
                src="/images/pepsi-typo2.png"
                alt="pepsi"
                style={{ maxWidth: "30%", opacity: "50%" }}
              />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Stack>
  );
}

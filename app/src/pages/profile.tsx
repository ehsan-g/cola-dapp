import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  changeMode,
  changeTheme,
} from "../redux/features/themeCustomization/customizerSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import KeyIcon from "@mui/icons-material/Key";
import { logOut } from "../redux/features/auth/userSlice";
import { fetchMyEvents } from "../redux/features/buildings/eventsSlice";
import { useEffect } from "react";
import EventAccordion from "../components/events/EventAccordion";
import { Company } from "../redux/types/types";

export default function Profile() {
  const dispatch = useAppDispatch();

  const customize = useAppSelector((state) => state.custumize);
  const { profile } = useAppSelector((state) => state.user);
  const { events } = useAppSelector((state) => state.events);

  const handleModeChange = () => {
    if (!customize) return;
    dispatch(changeMode());
  };

  useEffect(() => {
    dispatch(fetchMyEvents());
    dispatch(changeTheme(profile?.company));
  }, []);

  return (
    <>
      <Grid item sx={{ width: "100%", textAlign: "center" }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "60px",
                border:
                  customize.activeMode === "dark"
                    ? "1px solid white"
                    : "1px solid black",
                borderRadius: 50,
                backgroundColor:
                  customize.activeMode === "dark" ? "black" : "white",
              }}
            >
              <Grid item xs={4}>
                <Typography variant="caption" sx={{ margin: "auto" }}>
                  {profile?.permission_level}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <KeyIcon />
              </Grid>
              <Typography
                color="text.primary"
                component="span"
                sx={{ margin: "auto" }}
              >
                {profile &&
                  (profile?.company === 0
                    ? Company.NONE
                    : profile?.company === 1
                    ? Company.PEPSI
                    : Company.COKE)}
              </Typography>
            </Grid>
          }
          sx={{ margin: "auto" }}
        >
          <Avatar
            alt="Remy Sharp"
            src={profile?.profile_picture}
            sx={{
              width: 100,
              height: 100,
              margin: "auto",
              boxShadow: 10,
            }}
          />
        </Badge>
      </Grid>
      <Grid
        container
        direction="row-reverse"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ mt: 4, width: "100%" }}
        spacing={4}
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
            <IconButton
              sx={{ ml: 1 }}
              onClick={handleModeChange}
              color="inherit"
            >
              {customize.activeMode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {customize.activeMode} mode
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{ margin: "auto", mb: 8 }}
            onClick={() => dispatch(logOut())}
          >
            LogOut
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item>
          <Divider
            variant="middle"
            sx={{
              // width: "100%",
              margin: 2,
              borderColor: customize.activeMode === "light" ? "black" : "white",
            }}
          />
        </Grid>
        <Grid item>
          {events[0] ? (
            events.map((event: any, index: number) => (
              <EventAccordion key={index} event={event} roomId={event.room} />
            ))
          ) : (
            <Alert variant="filled" severity="info">
              You are not registered to any events!
            </Alert>
          )}
        </Grid>
      </Grid>
    </>
  );
}

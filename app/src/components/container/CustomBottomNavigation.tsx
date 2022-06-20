import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from "@mui/icons-material/Business";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { matchPath, useLocation, Link } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useAppSelector } from "../../redux/app/hooks";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function CustomBottomNavigation() {
  const ref = useRef<HTMLDivElement>(null);

  const routeMatch = useRouteMatch(["/buildings", "/profile", "/settings"]);
  const currentTab = routeMatch?.pattern?.path;
  const [value, setValue] = useState(1);

  const { profile } = useAppSelector((state) => state.user);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          color="primary"
        >
          <BottomNavigationAction
            component={Link}
            to="/buildings"
            label="Buildings"
            icon={<BusinessIcon />}
          />

          <BottomNavigationAction
            component={Link}
            to="/profile"
            label="Profile"
            icon={<PermIdentityIcon />}
          />
          {profile?.is_superuser && (
            <BottomNavigationAction
              component={Link}
              to="/settings"
              label="Admin Settings"
              icon={<SettingsIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

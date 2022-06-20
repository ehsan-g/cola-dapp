import { useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ColaTheme from "./assets/global/ColaTheme";
import Router from "./routes/Router";

function App() {
  const routing = useRoutes(Router);
  const theme = ColaTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App;

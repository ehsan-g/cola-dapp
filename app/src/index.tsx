import ReactDOM from "react-dom/client";
import { CircularProgress, Grid } from "@mui/material";
import { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      }
    >
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>
);

import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CustomAppBar from "../components/container/CustomAppBar";
import Loadable from "../layout/full-layout/loadable/Loadable";

const FullLayout = Loadable(
  lazy(() => import("../layout/full-layout/FullLayout"))
);
const BlankLayout = Loadable(
  lazy(() => import("../layout/plain-layout/PlainLayout"))
);

const Error = Loadable(lazy(() => import("../pages/authentication/Error")));
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));

const Buildings = Loadable(lazy(() => import("../pages/buildings")));
const Floors = Loadable(lazy(() => import("../pages/floor")));
const Profile = Loadable(lazy(() => import("../pages/profile")));
const Settings = Loadable(lazy(() => import("../pages/settings")));

const Router = [
  {
    path: "/",
    element: (
      <>
        <CustomAppBar />
        <FullLayout />
      </>
    ),
    children: [
      { path: "/", element: <Navigate to="/buildings" /> },
      { path: "buildings", element: <Buildings /> },
      { path: "buildings/:buildingId/floor/:floorId", element: <Floors /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;

import { experimentalStyled, Container, Box, Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import type { RootState } from "../../redux/app/store";
import CustomBottomNavigation from "../../components/container/CustomBottomNavigation";
import CustomAppBar from "../../components/container/CustomAppBar";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isEmpty } from "lodash";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));
const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "10px",
  },
}));

const FullLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search
    ? // eslint-disable-next-line no-restricted-globals
      location.search.split("redirect=")[1]
    : "";

  const customize = useAppSelector((state: RootState) => state.custumize);

  const { profile } = useAppSelector((state) => state.user);
  const { buildings } = useAppSelector((state) => state.buildings);

  useEffect(() => {
    if (isEmpty(profile)) {
      navigate(`/auth/login${redirect}`);
    }
  }, [dispatch, navigate, buildings, profile]);

  return (
    <MainWrapper className={customize.activeMode === "light" ? "dark" : ""}>
      <PageWrapper>
        <Container maxWidth="sm" sx={{ margin: "auto" }}>
          <Box
            sx={{
              minHeight: "calc(100vh - 200px)",
              paddingTop: "20px",
              paddingBottom: "30px",
            }}
          >
            <Outlet />
          </Box>
        </Container>
        <CustomBottomNavigation />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;

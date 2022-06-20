import {
  Alert,
  Button,
  Card,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import * as yup from "yup";
import { fetchProfile, login } from "../../redux/features/auth/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../redux/types/types";
import { isEmpty } from "lodash";
import { fetchBuildings } from "../../redux/features/buildings/buildingsSlice";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#8338ec",
  },
  "& .MuiOutlinedInput-root": {
    color: "black",

    "& fieldset": {
      borderRadius: 20,
      borderColor: "#8338ec",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8338ec",
    },
  },
});

const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string(),
});

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("redirect=")[1] : "";

  const { user, profile, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (profile !== ({} as User)) {
      dispatch(fetchProfile());
    }
  }, [user]);

  useEffect(() => {
    if (isEmpty(profile) === false) {
      dispatch(fetchBuildings());
      navigate(`/profile${redirect}`);
    }
  }, [redirect, navigate, profile]);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    dispatch(login({ user: { email: data.email, password: data.password } }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card
        sx={{
          position: "relative",
          height: "100vh",
          p: 0,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 100, marginTop: 9 }}
          image="/images/logo.png"
          alt="logo"
        />
        <Card
          style={{
            position: "absolute",
            bottom: "10px",
            height: "65vh",
            backgroundColor: "white",
            margin: 0,
            width: "100%",
          }}
        >
          <Grid container direction="column" alignItems="center">
            <Grid item xs sx={{ marginTop: 0 }}>
              <Typography variant="subtitle2">Login</Typography>
            </Grid>
            <Grid item sx={{ marginTop: 1, width: "90%" }}>
              <CssTextField
                id="username-login"
                type="email"
                label="username"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: "10px" }}
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1, width: "90%" }}>
              <TextField
                color="secondary"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                {...register("password")}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                  },
                }}
              />
              <Typography sx={{ direction: "rtl" }}>
                ?Forgot Password
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Grid>
            {error && (
              <Grid sx={{ marginTop: 2 }}>
                <Alert variant="filled" severity="error">
                  {error}
                </Alert>
              </Grid>
            )}
          </Grid>
          <Divider
            color="primary.light"
            sx={{
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Typography> OR </Typography>
          </Divider>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12} sx={{ width: "100%" }}>
              <Button variant="outlined" sx={{ width: "100%" }}>
                Connect Wallet
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 6 }}>
              <Typography>
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </form>
  );
}

export default Login;

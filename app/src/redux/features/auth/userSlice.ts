import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";
import { AxiosConfig, LoginState, User } from "../../types/types";

const userJson = localStorage.getItem("userInfo");
const userInfo = userJson !== null ? JSON.parse(userJson) : null;

const initialState: LoginState = {
  user: userInfo,
  status: "idle",
  error: "",
  profile: {} as User,
};

const config: AxiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "",
  },
};

export const fetchProfile = createAsyncThunk("profile", async () => {
  const userJson = localStorage.getItem("userInfo");
  const userInfo = userJson !== null ? JSON.parse(userJson) : null;
  if (!userInfo) {
    throw new Error("no user info in localstorage");
  }
  const config: AxiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo && userInfo.token}`,
    },
  };
  const response = await publicApi.get("users/profile-view", config);
  return response.data;
});

export const login = createAsyncThunk("login", async (values: LoginState) => {
  const response = await publicApi.post("users/login", values.user, config);
  return response.data;
});

const userSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("userInfo");
      state.user = {} as User;
      state.profile = {} as User;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
        state.user = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
        state.error = "";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;

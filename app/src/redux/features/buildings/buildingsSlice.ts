import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../../apis/base";
import { Building } from "../../types/types";

export interface BuildingState {
  buildings: object[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

export interface Config {
  headers: {
    "Content-Type": "application/json";
    Authorization: any;
  };
}

const initialState: BuildingState = {
  buildings: [],
  status: "idle",
  error: "",
};

export const fetchBuildings = createAsyncThunk(
  "buildings/fetchAll",
  async () => {
    const userJson = localStorage.getItem("userInfo");
    const userInfo = userJson !== null ? JSON.parse(userJson) : {};

    const config: Config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const response = await publicApi.get("buildings", config);
    return response.data;
  }
);

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBuildings.pending, (state, action) => {
        state.status = "loading";
        state.buildings = [];
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.buildings = [];
        const loadedBuildings = action.payload.buildings.map(
          (building: Building) => {
            return building;
          }
        );
        state.status = "succeeded";

        // Add any fetched buildings to the array
        state.buildings = state.buildings.concat(loadedBuildings);
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default buildingsSlice.reducer;

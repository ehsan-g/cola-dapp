import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { fetchBuildings } from "../redux/features/buildings/buildingsSlice";
import BuildingCard from "../components/buildings/BuildingCard";
import { Building } from "../redux/types/types";
import { Alert, Grid } from "@mui/material";

export default function Buildings() {
  const dispatch = useAppDispatch();

  const { status: buildingStatus, buildings } = useAppSelector(
    (state) => state.buildings
  );
  const { profile, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (buildingStatus !== "succeeded" && profile) {
      dispatch(fetchBuildings());
    }
  }, [profile]);

  return (
    <>
      <Grid container>
        {buildings.map((building: Building, index: number) => (
          <BuildingCard key={index} building={building} />
        ))}
      </Grid>
      {error && (
        <Grid sx={{ marginTop: 2 }}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Grid>
      )}
    </>
  );
}

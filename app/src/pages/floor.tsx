import "../assets/styles.css";
import VectorMap, { Layer, Tooltip, Label } from "devextreme-react/vector-map";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import type { RootState } from "../redux/app/store";
import { ThemeType } from "../redux/types/types";
import { useEffect, useState } from "react";
import { fetchEvents } from "../redux/features/buildings/eventsSlice";
import EventAccordion from "../components/events/EventAccordion";
import { useParams } from "react-router-dom";
import { Divider, Grid, Typography } from "@mui/material";
const projection = {
  to: ([l, lt]: [l: any, lt: any]) => [l / 100, lt / 100],
  from: ([x, y]: [x: any, y: any]) => [x * 100, y * 100],
};

export interface RoomDATA {
  type: string;
  features: [];
}

export default function Floors() {
  const dispatch = useAppDispatch();
  const { buildingId, floorId } = useParams();

  const [wallsCord, setwallsCordCord] = useState();
  const [roomsCord, setRoomsCord] = useState([]);
  const [roomsList, setRoomsList] = useState([{}]);
  const [roomId, setRoomId] = useState();
  // const [isAlert, setIsAlert] = useState<boolean>(false);

  const customize = useAppSelector((state: RootState) => state.custumize);

  const { status: buildingStatus, buildings } = useAppSelector(
    (state) => state.buildings
  );

  const { events } = useAppSelector((state) => state.events);

  // coordinates
  useEffect(() => {
    if (buildingStatus === "succeeded") {
      let theBuilding: any = buildings[1];
      let theLayout = theBuilding.floors[0].layout;

      setwallsCordCord(JSON.parse("[" + theLayout.wall_coordinates + "]"));
      setRoomsCord(JSON.parse("[" + theLayout.room_coordinates + "]"));
    }
  }, [buildingStatus]);

  // useEffect(() => {
  //   setIsAlert(true);
  // }, [joined]);

  const buildingData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[wallsCord]],
        },
      },
    ],
  };

  useEffect(() => {
    let list = [];

    if (roomsCord && buildingStatus === "succeeded") {
      let theBuilding: any = buildings[1];
      console.log(theBuilding);
      console.log(theBuilding.floors);
      console.log(theBuilding.floors[0].rooms);

      let rooms = theBuilding.floors[0].rooms;
      if (roomsCord[0]) {
        for (let i = 0; i < rooms.length; i++) {
          let dic = {
            type: "Feature",
            properties: {
              id: rooms[i].id,
              name: `Room ${i + 1}`,
              title: rooms[i].title,
            },
            geometry: {
              type: "Polygon",
              coordinates: [[roomsCord[i]]],
            },
          };
          list.push(dic);
        }
      }

      setRoomsList(list);
    }
  }, [roomsCord, buildingStatus]);

  const roomsData = {
    type: "FeatureCollection",
    features: roomsList,
  };

  const clickHandler = ({ target }: { target: any }) => {
    if (target && target.attribute("id")) {
      setRoomId(target.attribute("id"));
      dispatch(fetchEvents(target.attribute("id")));
    }
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="subtitle1" color="secondary.dark">
          Floor Id: {floorId}
        </Typography>
      </Grid>
      <Grid item sx={{ maxWidth: "100% !important", overflow: "scroll" }}>
        {buildingData && roomsData.features[1] && (
          <VectorMap
            id="vector-map"
            maxZoomFactor={4}
            projection={projection}
            onClick={clickHandler}
          >
            <Layer
              dataSource={wallsCord && buildingData}
              hoverEnabled={false}
              name="building"
            ></Layer>
            <Layer
              dataSource={roomsData}
              name="roomsCord"
              borderWidth={1}
              color={
                customize.activeTheme === ThemeType.PEPSI
                  ? "#e6f4ff"
                  : "#fce6ed"
              }
            >
              <Label enabled={true} dataField="name"></Label>
            </Layer>
            <Tooltip
              enabled={true}
              customizeTooltip={customizeTooltip}
            ></Tooltip>
          </VectorMap>
        )}
      </Grid>
      <Grid item>
        <Divider
          variant="middle"
          sx={{
            // width: "100%",
            margin: 4,
            borderColor: customize.activeMode === "light" ? "black" : "white",
          }}
        />
      </Grid>
      {/* {successEvents && (
        <Alert
          variant="filled"
          severity="success"
          onClose={() => {
            setIsAlert(false);
          }}
        >
          successful!
        </Alert>
      )} */}
      {roomId && (
        <Grid item container>
          <Grid item sx={{ mb: 10, maxWidth: "100% !important" }}>
            {events &&
              events?.map((event: any, index: number) => (
                <EventAccordion key={index} event={event} roomId={roomId} />
              ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function customizeTooltip(arg: any) {
  if (arg.layer.name === "roomsCord") {
    console.log(arg.attribute("color"));
    return { text: arg.attribute("title") };
  }
  return null;
}

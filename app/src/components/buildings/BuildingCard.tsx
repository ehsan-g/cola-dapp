import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Grid,
} from "@mui/material";
import { Building } from "../../redux/types/types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SyntheticEvent, useState } from "react";
import BuildingFloors from "./BuildingFloors";

export default function BuildingCard({ building }: { building: Building }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid container>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ width: "100%", margin: 1 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={3}>
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 80,
                  // maxHeight: "60vh",
                  borderRadius: 4,
                  border: "1px solid black",
                }}
                image={building.image?.image}
                alt="building"
              />
            </Grid>
            <Grid item xs={9}>
              <CardContent>
                <Typography
                  sx={{
                    flexShrink: 0,
                    color: "text.primary",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    height: "1.2em",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle1"
                  component="div"
                >
                  {building.building_name}
                </Typography>
                <Typography color="text.secondary" component="div">
                  {building.address?.address}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <BuildingFloors
            buildingId={building.id}
            floors={building.floors || []}
          />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}

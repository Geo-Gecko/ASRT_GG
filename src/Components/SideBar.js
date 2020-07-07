import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CustomizedSlider from "./Slider";
import LandCover from "./Landcover";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "70%",
    flexShrink: 0,
  },
  spacing: {
    marginLeft: 8,
  },
}));

export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Population</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CustomizedSlider IndicatorSlider="" sliderKey={0} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Soil Nutrients</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <CustomizedSlider IndicatorSlider="Soil Copper" sliderKey={1} />
            <CustomizedSlider
              IndicatorSlider="Soil Phosphorous"
              sliderKey={2}
            />
            <CustomizedSlider IndicatorSlider="Soil Potassium" sliderKey={3} />
            <CustomizedSlider IndicatorSlider="Soil Boron" sliderKey={4} />
            <CustomizedSlider IndicatorSlider="Soil Aluminium" sliderKey={5} />
            <CustomizedSlider IndicatorSlider="Soil Iron" sliderKey={6} />
            <CustomizedSlider IndicatorSlider="Soil Magnesium" sliderKey={7} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>
            Soil Moisture and Rainfall
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <CustomizedSlider IndicatorSlider="Soil Moisture" sliderKey={8} />
            <CustomizedSlider IndicatorSlider="Rainfall" sliderKey={9} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Vegetation Health</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <CustomizedSlider IndicatorSlider="" sliderKey={10} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Land Cover</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <LandCover IndicatorSlider="land cover" />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>Terrain</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <CustomizedSlider IndicatorSlider="Slope" sliderKey={11} />
            <CustomizedSlider IndicatorSlider="Elevation" sliderKey={12} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className={classes.heading}>
            Land Surface Temperature
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.spacing}>
            <CustomizedSlider IndicatorSlider="" sliderKey={13} />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

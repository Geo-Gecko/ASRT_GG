import React from "react";
import ControlledExpansionPanels from "./SideBar";
import Callouts from "./Callout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    lor: theme.palette.text.secondary,
  },
  spacing: {
    margin: 10,
  },
  calloutstyles: {
    width: 200,
  },
}));

export default function ExpansionSideBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Callouts
        myComponent={<ControlledExpansionPanels />}
        side="right"
        arrowsize={20}
        styles={classes.calloutstyles}
        message="These are the agricultural indicators available in this portal. Utilise the sliders with in these headings to filter 
      through the various agricultural indicators that fit your criteria."
      />
    </div>
  );
}

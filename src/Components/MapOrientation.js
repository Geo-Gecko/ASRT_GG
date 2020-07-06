import React from "react";
import UgMap from "./maps";
import Callouts from "./Callout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "0%",
  },
  spacing: {
    margin: 0,
  },
  calloutstyles: {
    width: 200,
    marginLeft: 220,
    marginTop:250,
  },
}));
export default function ExpansionMaps() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Callouts
        myComponent={<UgMap />}
        side="center"
        arrowsize={0}
        styles={classes.calloutstyles}
        message="This map shows district boundaries and reflects the  various changes as per the user's filtering via the sliders"
      />
    </div>
  );
}

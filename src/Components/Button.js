import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../App.css";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    fontWeight: 10,
    padding: 3,
  },
  input: {
    display: "none"
  }
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        id="button"
        className={classes.button}
        onClick={props.click}
      >
        <h5>
          {props.caption}
        </h5>
      </Button>
    </div>
  );
}

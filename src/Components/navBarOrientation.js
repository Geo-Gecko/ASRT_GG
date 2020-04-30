import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ContainedButtons from "./Button";
import geoLogo from "../Images/geoLogo.png";
import Callouts from "./callout";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  spacing: {
    margin: 10,
  },
  navigation: {
    height: 50,
    width: 120,
    marginLeft: -40,
  },
  calloutstyles: {
    height: 100,
    width: 130,
  },
}));

export default function MenuAppBarOrientation() {
  const classes = useStyles();
  function refreshPage() {
    window.location.reload();
  }
  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <a
            href="https://www.geogecko.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={geoLogo}
              alt="geo gecko logo"
              className={classes.navigation}
            />
          </a>
        </Typography>
        <Callouts
          myComponent={
            <Link to="/" className="btn-link">
              <ContainedButtons caption="Home" click={refreshPage} />
            </Link>
          }
          side="bottom"
          styles={classes.calloutstyles}
          message="Click this button to return to the home page"
        />
        {/* <ContainedButtons caption="Home" /> */}
        <div className={classes.spacing} />
        <Link to="/orientation" className="btn-link">
          <ContainedButtons caption="Orientation" />
        </Link>
      </Toolbar>
    </div>
  );
}

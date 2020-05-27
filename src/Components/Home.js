import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import geoLogo from "../Components/geoLogo.png";
import MatIcons from "./MatIcons";
import ContainedButtons from "./Button";
import ControlledExpansionPanels from "./SideBar";
import "../App.css";
import UgMap from "./maps";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
    // height: 128
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  navigation: {
    height: 50,
    width: 120
  },
  title: {
    flexGrow: 1
    // paddingLeft: '40%'
  },
  spacing: {
    margin: 10
  },
  mappingstyles: {
    height: 500,
    width: "80%",
    marginLeft: 10,
    marginTop: 0
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <StylesProvider injectFirst>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <a href="https://www.geogecko.com/">
                <img
                  src={geoLogo}
                  alt="geo gecko logo"
                  className={classes.navigation}
                />
              </a>
            </Typography>
            <ContainedButtons caption="Home" />
            <div className={classes.spacing} />
            <ContainedButtons caption="Orientation" />
          </Toolbar>
        </AppBar>
        {/* <div id="sideBar"> */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <div id="indicatorText">
            <small>
              <h6>AGRICULTURAL INDICATORS</h6>
            </small>
          </div>
          <ControlledExpansionPanels />
          <Divider />
          <MatIcons />
        </Drawer>

        {/* <main className={classes.content}> */}
        <div className={classes.mappingstyles}>
          <UgMap />
        </div>
        {/* </main> */}
      </div>
      {/* </div> */}
    </StylesProvider>
  );
}

import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme, StylesProvider } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import MatIcons from "./MatIcons";
import ControlledExpansionPanels from "./SideBar";
import MenuAppBar from "./navbar";
import "../App.css";
import UgMap from "./maps";
import PieChartComponent from "./pieChart";
import Rainfall from "./rainfallBarChart";

import Population from "./populationBarchart";
import { connect } from "react-redux";
import Switches from "./Togglebutton";

const ResponsiveDrawer = (props) => {
  let drawerWidth = 350;
  let finalLayout = <ControlledExpansionPanels />;
  let layout = "";
  let charts = "CHARTS";
  let indicatorTitle = "AGRICULTURAL INDICATORS";
  let title = indicatorTitle;
  let data = <ControlledExpansionPanels />;
  if (props.chartView === true && props.mapUpdated === true) {
    layout = (
      <div>
        <div>
          <PieChartComponent />
        </div>
        <div style={{ margin: 10 }} />
        <div id="RAINFALL">
          <Rainfall />
        </div>
        <div style={{ margin: 10 }} />
        <div id="POPULATION">
          <Population />
        </div>
        <div style={{ margin: 10 }} />
      </div>
    );
    title = <Switches chartData={charts} agricTitle={indicatorTitle} />;

    if (title["props"]["chartData"] === props.updateIndicatorSize) {
      drawerWidth = 600;
      finalLayout = layout;
    } else {
      drawerWidth = 350;
      finalLayout = data;
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    closeMenuButton: {
      marginRight: "auto",
      marginLeft: 0,
    },
    spacing: {
      margin: 10,
    },
    navigation: {
      height: 50,
      width: 120,
    },
    whitediv: {
      backgroundColor: "white",
    },
  }));
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  return (
    <StylesProvider injectFirst>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <MenuAppBar />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              <div id="indicatorText">
                <h6>
                  <strong>{title}</strong>
                </h6>
              </div>

              {finalLayout}
              <Divider />
              <MatIcons />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.toolbar} />
              <div id="indicatorText">
                <h6>
                  <strong>{title}</strong>
                </h6>
              </div>
              {finalLayout}

              <Divider />
              <MatIcons />
            </Drawer>
          </Hidden>
        </nav>
        <UgMap />
      </div>
    </StylesProvider>
  );
};
ResponsiveDrawer.propTypes = {
  container: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    mapUpdated: state.map.mapUpdated,
    chartView: state.chart.chartView,
    piechartData: state.chart.pieChartData,
    updateIndicatorSize: state.map.updateIndicatorSize,
    initialIndicatorSize: state.map.initialIndicatorSize,
    updateInitialIndicatorSize: state.map.updateInitialIndicatorSize,
  };
};

export default connect(mapStateToProps)(ResponsiveDrawer);

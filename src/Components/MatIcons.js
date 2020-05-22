import React from "react";
import "../App.css";
import Instagram from "../Images/Instagram.png";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import FaceBook from "../Images/FaceBook.png";
import { blue } from "@material-ui/core/colors";
import FormDialog from "./formDialog";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  horizontalSpacing: {
    marginLeft: 5,
    marginRight: 20,
  },
  navigation: {
    height: 20,
    width: 25,
    marginLeft: "5%",
  },
}));

export default function MatIcons() {
  const classes = useStyles();
  return (
    <div className="Icons">
      <Link to="/faqs" target="_blank" rel="noopener noreferrer">
        FAQS
      </Link>
      <div id="feedback">
        <FormDialog />
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/geogecko"
      >
        <TwitterIcon
          className={classes.navigation}
          style={{ color: blue[500] }}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/geogecko1/"
      >
        <img
          src={Instagram}
          target="blank"
          alt="geo gecko logo"
          className={classes.navigation}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/GeoGeckoUganda/"
      >
        <img
          src={FaceBook}
          target="blank"
          alt="geo gecko logo"
          className={classes.navigation}
        />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.geogecko.com/"
      >
        <img
          src="https://img.icons8.com/ultraviolet/120/000000/domain.png"
          target="blank"
          alt="geo gecko logo"
          className={classes.navigation}
        />
        {/* <img
          src={Gmail}
          target="blank"
          alt="geo gecko logo"
          className={classes.navigation}
        /> */}
      </a>
    </div>
  );
}

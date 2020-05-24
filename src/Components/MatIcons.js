import React from "react";
import "../App.css";
import Instagram from "../Images/Instagram.png";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import FaceBook from "../Images/FaceBook.png";
import { blue } from "@material-ui/core/colors";
import FormDialog from "./formDialog";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInstagram,
  faGoogle,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  horizontalSpacing: {
    marginLeft: 5,
    marginRight: 20,
  },
  navigation: {
    height: 20,
    width: 25,
    marginLeft: "5%",
    color: "#fff",
  },
}));

export default function MatIcons() {
  const classes = useStyles();
  return (
    <div className="Icons">
      <Link to="/faqs" target="_blank" rel="noopener noreferrer">
        <span style={{ color: "#fff" }}>FAQs</span>
      </Link>
      <div id="feedback">
        <FormDialog />
      </div>

      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/geogecko"
      >
        <FontAwesomeIcon className={classes.navigation} icon={faTwitter} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.instagram.com/geogecko1/"
      >
        <FontAwesomeIcon className={classes.navigation} icon={faInstagram} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/GeoGeckoUganda/"
      >
        <FontAwesomeIcon className={classes.navigation} icon={faFacebook} />
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.geogecko.com/"
      >
        <FontAwesomeIcon className={classes.navigation} icon={faGoogle} />
      </a>
    </div>
  );
}

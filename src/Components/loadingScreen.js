import React, { Component } from "react";
import "../App.css";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as mapLoader from "../fixtures/map_load_svg.json";

export default class Loading extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: mapLoader.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <div className="loadingScreen">
        <FadeIn>
          <div className="d-flex justify-content-center align-items-center">
            <h4>Map Loading</h4>
            <Lottie options={defaultOptions} height={40} width={40} />
          </div>
        </FadeIn>
      </div>
    );
  }
}

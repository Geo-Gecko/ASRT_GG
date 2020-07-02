import React from "react";
import { Line } from "react-chartjs-2";
const options = {
  legend: {
    display: true,
    position: "bottom",
  },
};
const state = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "National Rainfall Amount",
      fill: false,
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 2,
      data: [100.55, 89.28, 58.94, 180.0],
    },
    {
      label: " District Rainfall Amount",
      fill: false,
      backgroundColor: "rgba(255,99,132,1)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      data: [90.92, 35.1, 47.0, 150.28],
    },
  ],
};
export default class Rainfall extends React.Component {
  render() {
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Rainfall</h5>
        </div>
        <div className="chartSection">
          <Line data={state} options={options} height={120} />
        </div>
      </div>
    );
  }
}

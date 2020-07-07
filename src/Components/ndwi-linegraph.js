import React from 'react';
import { Line } from 'react-chartjs-2';
const options = {
  legend: {
    display: true,
    position: "bottom",
  },
}
const state = {
  labels: ['Q1', 'Q2', 'Q3',
    'Q4'],
  datasets: [
    {
      label: 'National Crop Health',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      data: [0.65, 0.59, 0.80, 0.81]
    },
    {
      label: ' District Crop Health',
      fill: false,
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      data: [0.87, 0.50, 0.70, 0.41]
    }
  ]
}
export default class Ndwilinegraph extends React.Component {
  render() {
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Crop Health</h5>
        </div>
        <div className="chartSection">
          <Line
            data={state}
            options={options}
            height={120}
          />
        </div>
      </div>
    );
  }
}

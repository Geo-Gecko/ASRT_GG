import React from 'react';
import {Line} from 'react-chartjs-2';
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
      label: 'National land surface temperature',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
      data: [1162, 289, 1170, 981]
    },
    {
      label: ' District land surface temperature',
      fill: false,
      backgroundColor: 'rgba(255,99,132,1)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 2,
      data: [990, 170, 840, 1176]
    }
  ]
}

export default class Temperature extends React.Component {
  render() {
    return (
      <div className="mega">
      <div className="charts">
      <h5 className="chartHeading">Land Surface Temperature</h5>
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

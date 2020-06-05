import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['Q1', 'Q2', 'Q3',
           'Q4'],
  datasets: [
    {
      label: 'land surface temperature',
      fill: false,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 6,
      data: [62, 89, 70, 81]
    }
  ]
}

export default class Lst extends React.Component {
  render() {
    return (
      <div className="mega">

<div className="charts">
        <h4 className="chartHeading">Land Surface Temperature</h4>
        <hr className="HR"  />
        <Line
          data={state}
          options={{
            title:{
              display:true,

              fontSize:20
            },
            legend:{
              display:true,
              position:'bottom'
            },
            scales: {
              yAxes: [{
                  gridLines: {
                      color: '#929292'
      }
              }],
              xAxes: [{
                  gridLines: {
                      color: 'white'
                  }  
              }]
          }
          }}
          height={100}
        />
      </div>

      </div>
    );
  }
}
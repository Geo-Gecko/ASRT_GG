import React from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['Q1', 'Q2', 'Q3',
           'Q4'],
  datasets: [
    {

      label: 'National soil moisture',
      fill: false,
      backgroundColor: 'rgba(255,250,250,1)',
      borderColor: '#77BB85',
      borderWidth: 6,
      data: [65, 59, 80, 81]
    },
    {
      label: 'District soil moisture',
      fill: false,
      backgroundColor: 'rgba(255,250,250,1)',
      borderColor: '#616161',
      borderWidth: 6,
      data: [87, 50, 70, 41]
    }
  ]
}

export default class Ndwilinegraph extends React.Component {
  render() {
    return (
      <div className="mega">
        <div className="charts">

        <h5 className="chartHeading">Soil Moisture</h5>

        <hr className="HR"/>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              fontSize:40
            },
            legend:{
              display:true,
              position:'bottom'
            },
            scales: {
              yAxes: [{
                  gridLines: {

                      color: '#929292',
                      height:100

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
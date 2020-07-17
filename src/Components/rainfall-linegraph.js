import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";
class Rainfall extends React.Component {
  render() {
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
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          lineTension: 0,
          data: this.props.rainfallNationalGridcells,
        },
        {
          label: " District Rainfall Amount",
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          hoverBackgroundColor: "rgba(75,192,192,2)",
          hoverBorderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          lineTension: 0,
          data: this.props.rainfallchartData,
        },
      ],
    };

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
const mapStateToProps = (state) => {
  return {
    rainfallchartData: state.chart.rainfallChartData,
    rainfallNationalGridcells: state.chart.rainfallNationalGridcells,
  };
};
export default connect(mapStateToProps)(Rainfall);

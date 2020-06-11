import React from "react";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

class Rainfall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["rainfall"],
    };
  }

  render() {
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Rainfall</h5>
        </div>
        <HorizontalBar
          key={this.props.rainfallchartData}
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: "National Rainfall grid-cell average",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: this.props.averagenationalGridcells,
              },
              {
                label: " District Rainfall grid-cell average",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                hoverBackgroundColor: "rgba(75,192,192,2)",
                hoverBorderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                data: this.props.rainfallchartData,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              fontSize: 40,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    rainfallchartData: state.chart.rainfallChartData,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
    averagenationalGridcells: state.chart.averagenationalGridcells,
  };
};
export default connect(mapStateToProps)(Rainfall);

import React from "react";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";

class Population extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["population"],
    };
  }
  render() {
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Population</h5>
        </div>
        <HorizontalBar
          key={this.props.populationchartData}
          data={{
            labels: this.state.labels,
            datasets: [
              {
                label: "National Population grid-cell average",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: this.props.populationAverageNationalGridcells,
              },
              {
                label: " District Population grid-cell average",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                hoverBackgroundColor: "rgba(75,192,192,2)",
                hoverBorderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                data: this.props.populationchartData,
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
    populationchartData: state.chart.populationChartData,
    populationAverageNationalGridcells:
      state.chart.populationAverageNationalGridcells,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
  };
};
export default connect(mapStateToProps)(Population);

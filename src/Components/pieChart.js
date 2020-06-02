import { Pie } from "react-chartjs-2";
import React, { Component } from "react";
import { connect } from "react-redux";

class PieChartComponent extends Component {
  colors1 = ["red", "blue", "green", "yellow", "gray", "maroon", "brown"];

  constructor(props) {
    super(props);

    this.state = {
      labels: this.props.updatePieChartIndicators,
      shouldRedraw: false,
    };
  }
  
  render() {
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Soil Nutrients</h5>
          </div>
          <Pie
            key={this.props.piechartData}
            data={{
              labels: this.state.labels,
              datasets: [
                {
                  data: this.props.piechartData,
                  backgroundColor: this.colors1,
                },
              ],
            }}
            height={100}
            options={{
              legend: {
                display: true,
                position: "right",
              },
            }}
            redraw={this.state.shouldRedraw}
          />
          <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
  };
};
export default connect(mapStateToProps)(PieChartComponent);

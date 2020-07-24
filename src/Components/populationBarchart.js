import React from "react";
import { connect } from "react-redux";
import { HorizontalBar } from "react-chartjs-2";
import _ from "lodash";

class Population extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ["population"],
    };
  }
  render() {
    let populationValue = 0;
    let PopulationNationalValue = 0;
    let nationalData = this.props.nationalGridData;
    let populationchartData = _.cloneDeep(this.props.populationchartData);
    let districtData = this.props.propertiesData;
    let populationAverageNationalGridcells = _.cloneDeep(
      this.props.populationAverageNationalGridcells
    );
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        if (sliderK === "ppp_sum") {
          populationValue += val;
        }
      }
      return true;
    });
    nationalData.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        if (sliderK === "ppp_sum") {
          PopulationNationalValue += val;
        }
      }
      return true;
    });
    populationValue = populationValue / districtData.length;
    PopulationNationalValue = PopulationNationalValue / nationalData.length;
    if (populationValue !== 0) {
      populationchartData[0] = populationValue.toFixed(2);
      populationAverageNationalGridcells[0] = PopulationNationalValue.toFixed(
        2
      );
    }
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
                data: populationAverageNationalGridcells,
              },
              {
                label: " District Population grid-cell average",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                hoverBackgroundColor: "rgba(75,192,192,2)",
                hoverBorderColor: "rgba(75,192,192,1)",
                borderWidth: 2,
                data: populationchartData,
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
      propertiesData: state.map.propertiesData,
      nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Population);

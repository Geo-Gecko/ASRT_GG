import { Pie } from "react-chartjs-2";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";

class PieChartComponent extends Component {
  colors1 = ["red", "blue", "green", "yellow", "gray", "maroon", "brown"];

  constructor(props) {
    super(props);

    this.state = {
      shouldRedraw: false,
    };
  }
  
  render() {
    let copperValue = 0;
    let alumiValue = 0;
    let phosValue = 0;
    let potasValue = 0;
    let boronValue = 0;
    let ironValue = 0;
    let magneValue = 0;
    let districtData = this.props.propertiesData;
    let piechartData = _.cloneDeep(this.props.piechartData);
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        if (sliderK === "soil_copper") {
          copperValue += val;
        } else if (sliderK === "soil_alumi") {
          alumiValue += val;
        } else if (sliderK === "soil_phos") {
          phosValue += val;
        } else if (sliderK === "soil_potas") {
          potasValue += val;
        } else if (sliderK === "soil_boron") {
          boronValue += val;
        } else if (sliderK === "soil_iron") {
          ironValue += val;
        } else if (sliderK === "soil_magne") {
          magneValue += val;
        }
      }
      return true;
    });
    // soil nutrients calculations
    copperValue = (copperValue / districtData.length).toFixed(2);
    alumiValue = (alumiValue / districtData.length).toFixed(2);
    phosValue = (phosValue / districtData.length).toFixed(2);
    potasValue = (potasValue / districtData.length).toFixed(2);
    boronValue = (boronValue / districtData.length).toFixed(2);
    ironValue = (ironValue / districtData.length).toFixed(2);
    magneValue = (magneValue / districtData.length).toFixed(2);
    let UpdatedIndicators = this.props.updatePieChartIndicators;
    let pieChartValuesObject = {
      soil_copper: copperValue,
      soil_alumi: alumiValue,
      soil_phos: phosValue,
      soil_potas: potasValue,
      soil_boron: boronValue,
      soil_iron: ironValue,
      soil_magne: magneValue,
    };
    Object.keys(pieChartValuesObject).forEach((key_) => {
      if (UpdatedIndicators.includes(key_)) {
        piechartData[UpdatedIndicators.indexOf(key_)] =
          pieChartValuesObject[key_];
      }
    });
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Soil Nutrients</h5>
          </div>
          <div className="chartSection">
          <Pie
            key={piechartData}
            data={{
              labels: UpdatedIndicators,
              datasets: [
                {
                  data: piechartData,
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
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
    propertiesData: state.map.propertiesData,
  };
};
export default connect(mapStateToProps)(PieChartComponent);

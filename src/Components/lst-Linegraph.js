import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Line } from "react-chartjs-2";
class Temperature extends React.Component {
  render() {
    let lst_jfm_value,
      lst_amj_value,
      lst_jas_value,
      lst_ond_value,
      lst_jfm,
      lst_amj,
      lst_jas,
      lst_ond = 0;
    let nationalData = this.props.nationalGridData;
    let temperaturechartData = _.cloneDeep(this.props.temperaturechartData);
    let districtData = this.props.propertiesData;
    let temperatureNationalGridcells = _.cloneDeep(
      this.props.temperatureNationalGridcells
    );
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        //lst amount
        lst_jfm =
          sliderK === "lst_jfm"
            ? (lst_jfm += val)
            : (lst_jfm = propertyData["lst_jfm"]);
        lst_amj =
          sliderK === "lst_amj"
            ? (lst_amj += val)
            : (lst_amj = propertyData["lst_amj"]);
        lst_jas =
          sliderK === "lst_jas"
            ? (lst_jas += val)
            : (lst_jas = propertyData["lst_jas"]);
        lst_ond =
          sliderK === "lst_ond"
            ? (lst_ond += val)
            : (lst_ond = propertyData["lst_ond"]);
      }
      return true;
    });
    nationalData.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        //national lst amount
        lst_jfm_value =
          sliderK === "lst_jfm"
            ? (lst_jfm_value += val)
            : (lst_jfm_value = nationalGridcell["properties"]["lst_jfm"]);
        lst_amj_value =
          sliderK === "lst_amj"
            ? (lst_amj_value += val)
            : (lst_amj_value = nationalGridcell["properties"]["lst_amj"]);
        lst_jas_value =
          sliderK === "lst_jas"
            ? (lst_jas_value += val)
            : (lst_jas_value = nationalGridcell["properties"]["lst_jas"]);
        lst_ond_value =
          sliderK === "lst_ond"
            ? (lst_ond_value += val)
            : (lst_ond_value = nationalGridcell["properties"]["lst_ond"]);
      }
      return true;
    });
    //temperature calculations
    temperaturechartData[0] = lst_jfm;
    temperaturechartData[1] = lst_amj;
    temperaturechartData[2] = lst_jas;
    temperaturechartData[3] = lst_ond;

    temperatureNationalGridcells[0] = lst_jfm_value;
    temperatureNationalGridcells[1] = lst_amj_value;
    temperatureNationalGridcells[2] = lst_jas_value;
    temperatureNationalGridcells[3] = lst_ond_value;
    temperaturechartData = temperaturechartData.map(
      (each_temperature_value) => {
        if (each_temperature_value !== null) {
          return Number(each_temperature_value.toFixed(2));
        }
        return true;
      }
    );
    temperatureNationalGridcells = temperatureNationalGridcells.map(
      (each_temperature_value) => {
        if (each_temperature_value !== null) {
          return Number(each_temperature_value.toFixed(2));
        }
        return true;
      }
    );
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
          label: "National land surface temperature",
          fill: false,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          lineTension: 0,
          data: temperatureNationalGridcells,
        },
        {
          label: " District land surface temperature",
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          hoverBackgroundColor: "rgba(75,192,192,2)",
          hoverBorderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          lineTension: 0,
          data: temperaturechartData,
        },
      ],
    };
    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Land Surface Temperature</h5>
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
    temperaturechartData: state.chart.temperatureChartData,
    temperatureNationalGridcells: state.chart.temperatureNationalGridcells,
    propertiesData: state.map.propertiesData,
    nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Temperature);

import React from 'react';
import { connect } from "react-redux";
import {Line} from 'react-chartjs-2';
import _ from "lodash";


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

    let data_ = this.props.temperalChartFn({
      "National land surface temperature": temperatureNationalGridcells,
      "District land surface temperature": temperaturechartData
    },)
    return (
      <div className="mega">
      <div className="charts">
      <h5 className="chartHeading">Land Surface Temperature</h5>
        </div>
        <div className="chartSection">
        <Line
          data={data_}
          options={{
            legend: {
              display: true,
              position: "bottom",
            },
            }}
          height={120}
        />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    temperaturechartData: state.chart.temperatureChartData,
    temperatureNationalGridcells: state.chart.temperatureNationalGridcells,
    temperalChartFn: state.chart.temperalChartFn,
    propertiesData: state.map.propertiesData,
    nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Temperature);

import React from 'react';
import { connect } from "react-redux";
import _ from "lodash";
import {Line} from 'react-chartjs-2';


class Ndvilinegraph extends React.Component {
  render() {
    let ndvi_jfm_value,
      ndvi_amj_value,
      ndvi_jas_value,
      ndvi_ond_value,
      ndvi_jfm,
      ndvi_amj,
      ndvi_jas,
      ndvi_ond = 0;
    let nationalData = this.props.nationalGridData;
    let vegetationHealthchartData = _.cloneDeep(
      this.props.vegetationHealthchartData
    );
    let districtData = this.props.propertiesData;
    let vegetationHealthNationalGridcells = _.cloneDeep(
      this.props.vegetationHealthNationalGridcells
    );
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        ndvi_jfm =
          sliderK === "ndvi_jfm"
            ? (ndvi_jfm += val)
            : (ndvi_jfm = propertyData["ndvi_jfm"]);
        ndvi_amj =
          sliderK === "ndvi_amj"
            ? (ndvi_amj += val)
            : (ndvi_amj = propertyData["ndvi_amj"]);
        ndvi_jas =
          sliderK === "ndvi_jas"
            ? (ndvi_jas += val)
            : (ndvi_jas = propertyData["ndvi_jas"]);
        ndvi_ond =
          sliderK === "ndvi_ond"
            ? (ndvi_ond += val)
            : (ndvi_ond = propertyData["ndvi_ond"]);
      }
      return true;
    });
    nationalData.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        ndvi_jfm_value =
          sliderK === "ndvi_jfm"
            ? (ndvi_jfm_value += val)
            : (ndvi_jfm_value = nationalGridcell["properties"]["ndvi_jfm"]);
        // ndvi_amj_value =
        sliderK === "ndvi_amj"
          ? (ndvi_amj_value += val)
          : (ndvi_amj_value = nationalGridcell["properties"]["ndvi_amj"]);
        // ndvi_jas_value =
        sliderK === "ndvi_jas"
          ? (ndvi_jas_value += val)
          : (ndvi_jas_value = nationalGridcell["properties"]["ndvi_jas"]);
        ndvi_ond_value =
          sliderK === "ndvi_ond"
            ? (ndvi_ond_value += val)
            : (ndvi_ond_value = nationalGridcell["properties"]["ndvi_ond"]);
      }
      return true;
    });
    //vegetation health calculations
    vegetationHealthchartData[0] = ndvi_jfm;
    vegetationHealthchartData[1] = ndvi_amj;
    vegetationHealthchartData[2] = ndvi_jas;
    vegetationHealthchartData[3] = ndvi_ond;

    vegetationHealthNationalGridcells[0] = ndvi_jfm_value;
    vegetationHealthNationalGridcells[1] = ndvi_amj_value;
    vegetationHealthNationalGridcells[2] = ndvi_jas_value;
    vegetationHealthNationalGridcells[3] = ndvi_ond_value;

    let data_ = this.props.temperalChartFn({
      "National vegetation health": vegetationHealthNationalGridcells,
      "District vegetation health": vegetationHealthchartData
    },)
    return (
      <div className="mega">
      <div className="charts">
       <h5 className="chartHeading">Vegetation Health</h5>
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

const mapStateToProps = (state) => {
  return {
    vegetationHealthchartData: state.chart.vegetationHealthChartData,
    vegetationHealthNationalGridcells:
      state.chart.vegetationHealthNationalGridcells,
    temperalChartFn: state.chart.temperalChartFn,
    propertiesData: state.map.propertiesData,
    nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Ndvilinegraph);

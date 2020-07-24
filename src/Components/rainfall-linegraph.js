import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Line } from "react-chartjs-2";


class Rainfall extends React.Component {
  render(props) {
    let presp_jfm_value,
      presp_amj_value,
      presp_jas_value,
      presp_ond_value,
      presp_jfm,
      presp_amj,
      presp_jas,
      presp_ond = 0;
    let nationalData = this.props.nationalGridData;
    let rainfallNationalGridcells = _.cloneDeep(this.props.rainfallNationalGridcells);
    let districtData = this.props.propertiesData;
    let rainfallchartData = _.cloneDeep(this.props.rainfallchartData);
    nationalData.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        //national rainfall amount
        presp_jfm_value =
          sliderK === "presp_jfm"
            ? presp_jfm_value + val
            : (presp_jfm_value = nationalGridcell["properties"]["presp_jfm"]);
        presp_amj_value =
          sliderK === "presp_amj"
            ? (presp_amj_value += val)
            : (presp_amj_value = nationalGridcell["properties"]["presp_amj"]);
        presp_jas_value =
          sliderK === "presp_jas"
            ? (presp_jas_value += val)
            : (presp_jas_value = nationalGridcell["properties"]["presp_jas"]);
        presp_ond_value =
          sliderK === "presp_ond"
            ? (presp_ond_value += val)
            : (presp_ond_value = nationalGridcell["properties"]["presp_ond"]);
      }
      return true;
    });
    districtData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        //rainfall amount
        presp_jfm =
          sliderK === "presp_jfm"
            ? (presp_jfm += val)
            : (presp_jfm = propertyData["presp_jfm"]);
        presp_amj =
          sliderK === "presp_amj"
            ? (presp_amj += val)
            : (presp_amj = propertyData["presp_amj"]);
        presp_jas =
          sliderK === "presp_jas"
            ? (presp_jas += val)
            : (presp_jas = propertyData["presp_jas"]);
        presp_ond =
          sliderK === "presp_ond"
            ? (presp_ond += val)
            : (presp_ond = propertyData["presp_ond"]);
      }
      return true;
    });
    //rainfall calculations
    rainfallchartData[0] = presp_jfm;
    rainfallchartData[1] = presp_amj;
    rainfallchartData[2] = presp_jas;
    rainfallchartData[3] = presp_ond;

    rainfallNationalGridcells[0] = presp_jfm_value;
    rainfallNationalGridcells[1] = presp_amj_value;
    rainfallNationalGridcells[2] = presp_jas_value;
    rainfallNationalGridcells[3] = presp_ond_value;

    let data_ = this.props.temperalChartFn({
      "National Rainfall Amount": rainfallNationalGridcells,
      "District Rainfall Amount": rainfallchartData
    },)

    return (
      <div className="mega">
        <div className="charts">
          <h5 className="chartHeading">Rainfall</h5>
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
    rainfallchartData: state.chart.rainfallChartData,
    rainfallNationalGridcells: state.chart.rainfallNationalGridcells,
    temperalChartFn: state.chart.temperalChartFn,
    propertiesData: state.map.propertiesData,
    nationalGridData: state.map.nationalGridData,
  };
};
export default connect(mapStateToProps)(Rainfall);

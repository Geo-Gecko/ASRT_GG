import React, { Component } from "react";
import _ from "lodash";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import Control from "react-leaflet-control";
import { connect } from "react-redux";
import LoadingScreen from "./loadingScreen";
import {
  updatePieChartData,
  updateChartView,
  updatePopulationChartData,
  updateRainfallChartData,
  updateVegetationHealthChartData,
  updateCropHealthChartData,
  updateTemperatureChartData,
} from "../redux/actions/actionTypes/actionTypes";
import { getMapGrids } from "../redux/actions/mapAction";
import { getLocation } from "../redux/actions/locationActions";
import { getSliderData } from "../redux/actions/sliderActions";
import districts from "../Components/uganda_districts_2019";
class UgMap extends Component {
  bounds = [
    [-1.487315, 30.56346], // Southwest coordinates
    [4.23314, 35.01031], // Northeast coordinates
  ];
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      data: this.props.locationValue,
      district: this.props.district,
      id: 0,
      bounds: this.bounds,
      map: null,
    };
    this.geoJsonLayer = React.createRef();
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch(getMapGrids());
    this.props.dispatch(getLocation());
    this.props.dispatch(getSliderData());
  }
  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => this.MouseOverFeature(e, feature),
      mouseout: (e) => this.MouseOutFeature(e, feature),
      click: (e) => this.ZoomToFeature(e, feature),
    });
  };
  highlightSelection(e, feature) {
    var layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 0.5,
      color: "#666",
      fillOpacity: 0.7,
    });
  }
  ZoomToFeature(e, feature) {
    let gridcellArray = [];
    let propertiesArray = [];
    let dist_ref = this.props.dist_ref;
    function checkDistrict(district) {
      return district === e.target.feature.properties.DName2019;
    }
    const map = this.refs.map.leafletElement;

    Object.keys(map["_layers"]).forEach((element) => {
      if (
        typeof map["_layers"][element]["feature"] !== "undefined" &&
        map["_layers"][element]["feature"]["geometry"]["type"] === "Polygon"
      ) {
        var l = map["_layers"][element];
        l.setStyle({
          weight: 2,
          color: "#3388ff",
          dashArray: "",
          fillOpacity: 0.2,
          fill: "#00aa55",
        });
      }
    });
    let districtGridcells = this.props.mapGrids;
    let districtsdata = districtGridcells[0][0];
    Object.keys(districtsdata["features"]).forEach((element) => {
      if (
        typeof districtsdata["features"][element] !== "undefined" &&
        typeof districtsdata["features"][element]["rsd_id"] !== "undefined" &&
        districtsdata["features"][element]["rsd_id"] !==
          dist_ref.findIndex(checkDistrict) + 1
      ) {
        var districtDetails = districtsdata["features"][element];

        gridcellArray.push(districtDetails);
      } else {
        var districtProperties =
          districtsdata["features"][element]["properties"];
        propertiesArray.push(districtProperties);
      }
    });

    this.populationchartData = _.cloneDeep(this.props.populationchartData);
    this.rainfallchartData = _.cloneDeep(this.props.rainfallchartData);
    this.piechartData = _.cloneDeep(this.props.piechartData);
    this.temperaturechartData = _.cloneDeep(this.props.temperaturechartData);
    this.vegetationHealthchartData = _.cloneDeep(
      this.props.vegetationHealthchartData
    );
    this.cropHealthchartData = _.cloneDeep(this.props.cropHealthchartData);
    this.cropHealthNationalGridcells = _.cloneDeep(
      this.props.cropHealthNationalGridcells
    );

    this.populationAverageNationalGridcells = _.cloneDeep(
      this.props.populationAverageNationalGridcells
    );
    this.rainfallNationalGridcells = _.cloneDeep(
      this.props.rainfallNationalGridcells
    );
    this.vegetationHealthNationalGridcells = _.cloneDeep(
      this.props.vegetationHealthNationalGridcells
    );
    this.temperatureNationalGridcells = _.cloneDeep(
      this.props.temperatureNationalGridcells
    );
    this.propertiesData = propertiesArray;
    this.rainfallValue = 0;
    this.nationalGridValue = 0;
    this.populationValue = 0;
    this.PopulationNationalGridValue = 0;
    this.presp_jfm_nationalgridvalue = 0;
    this.presp_amj_nationalgridvalue = 0;
    this.presp_jas_nationalgridvalue = 0;
    this.presp_ond_nationalgridvalue = 0;
    this.presp_jfm = 0;
    this.presp_amj = 0;
    this.presp_jas = 0;
    this.presp_ond = 0;

    this.ndvi_jfm_nationalgridvalue = 0;
    this.ndvi_amj_nationalgridvalue = 0;
    this.ndvi_jas_nationalgridvalue = 0;
    this.ndvi_ond_nationalgridvalue = 0;
    this.ndvi_jfm = 0;
    this.ndvi_amj = 0;
    this.ndvi_jas = 0;
    this.ndvi_ond = 0;

    this.ndwi_jfm_nationalgridvalue = 0;
    this.ndwi_amj_nationalgridvalue = 0;
    this.ndwi_jas_nationalgridvalue = 0;
    this.ndwi_ond_nationalgridvalue = 0;
    this.ndwi_jfm = 0;
    this.ndwi_amj = 0;
    this.ndwi_jas = 0;
    this.ndwi_ond = 0;

    this.lst_jfm_nationalgridvalue = 0;
    this.lst_amj_nationalgridvalue = 0;
    this.lst_jas_nationalgridvalue = 0;
    this.lst_ond_nationalgridvalue = 0;
    this.lst_jfm = 0;
    this.lst_amj = 0;
    this.lst_jas = 0;
    this.lst_ond = 0;
    this.copperValue = 0;
    this.alumiValue = 0;
    this.phosValue = 0;
    this.potasValue = 0;
    this.boronValue = 0;
    this.ironValue = 0;
    this.magneValue = 0;
    this.nationalGridcells = districtsdata.features;
    this.nationalGridcells.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        if (sliderK === "ppp_sum") {
          this.PopulationNationalGridValue += val;
        }
        if (
          sliderK === "presp_jfm" ||
          sliderK === "ndvi_jfm" ||
          sliderK === "ndwi_jfm" ||
          sliderK === "lst_jfm"
        ) {
          this.presp_amj_nationalgridvalue =
            nationalGridcell["properties"]["presp_amj"];
          this.presp_jas_nationalgridvalue =
            nationalGridcell["properties"]["presp_jas"];
          this.presp_ond_nationalgridvalue =
            nationalGridcell["properties"]["presp_ond"];
          this.presp_jfm_nationalgridvalue += val;

          this.ndvi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_amj"];
          this.ndvi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jas"];
          this.ndvi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_ond"];
          this.ndvi_jfm_nationalgridvalue += val;

          this.ndwi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_amj"];
          this.ndwi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jas"];
          this.ndwi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_ond"];
          this.ndwi_jfm_nationalgridvalue += val;

          this.lst_amj_nationalgridvalue =
            nationalGridcell["properties"]["lst_amj"];
          this.lst_jas_nationalgridvalue =
            nationalGridcell["properties"]["lst_jas"];
          this.lst_ond_nationalgridvalue =
            nationalGridcell["properties"]["lst_ond"];
          this.lst_jfm_nationalgridvalue += val;
        }
        if (
          sliderK === "presp_amj" ||
          sliderK === "ndvi_amj" ||
          sliderK === "ndwi_amj" ||
          sliderK === "lst_amj"
        ) {
          this.presp_jfm_nationalgridvalue =
            nationalGridcell["properties"]["presp_jfm"];
          this.presp_jas_nationalgridvalue =
            nationalGridcell["properties"]["presp_jas"];
          this.presp_ond_nationalgridvalue =
            nationalGridcell["properties"]["presp_ond"];
          this.presp_amj_nationalgridvalue += val;

          this.ndvi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jfm"];
          this.ndvi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jas"];
          this.ndvi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_ond"];
          this.ndvi_amj_nationalgridvalue += val;

          this.ndwi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jfm"];
          this.ndwi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jas"];
          this.ndwi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_ond"];
          this.ndwi_amj_nationalgridvalue += val;

          this.lst_jfm_nationalgridvalue =
            nationalGridcell["properties"]["lst_jfm"];
          this.lst_jas_nationalgridvalue =
            nationalGridcell["properties"]["lst_jas"];
          this.lst_ond_nationalgridvalue =
            nationalGridcell["properties"]["lst_ond"];
          this.lst_amj_nationalgridvalue += val;
        }
        if (
          sliderK === "presp_jas" ||
          sliderK === "ndvi_jas" ||
          sliderK === "ndwi_jas" ||
          sliderK === "lst_jas"
        ) {
          this.presp_amj_nationalgridvalue =
            nationalGridcell["properties"]["presp_amj"];
          this.presp_jfm_nationalgridvalue =
            nationalGridcell["properties"]["presp_jfm"];
          this.presp_ond_nationalgridvalue =
            nationalGridcell["properties"]["presp_ond"];
          this.presp_jas_nationalgridvalue += val;

          this.ndvi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_amj"];
          this.ndvi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jfm"];
          this.ndvi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_ond"];
          this.ndvi_jas_nationalgridvalue += val;

          this.ndwi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_amj"];
          this.ndwi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jfm"];
          this.ndwi_ond_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_ond"];
          this.ndwi_jas_nationalgridvalue += val;

          this.lst_amj_nationalgridvalue =
            nationalGridcell["properties"]["lst_amj"];
          this.lst_jfm_nationalgridvalue =
            nationalGridcell["properties"]["lst_jfm"];
          this.lst_ond_nationalgridvalue =
            nationalGridcell["properties"]["lst_ond"];
          this.lst_jas_nationalgridvalue += val;
        }
        if (
          sliderK === "presp_ond" ||
          sliderK === "ndvi_ond" ||
          sliderK === "ndwi_ond" ||
          sliderK === "lst_ond"
        ) {
          this.presp_amj_nationalgridvalue =
            nationalGridcell["properties"]["presp_amj"];
          this.presp_jas_nationalgridvalue =
            nationalGridcell["properties"]["presp_jas"];
          this.presp_jfm_nationalgridvalue =
            nationalGridcell["properties"]["presp_jfm"];
          this.presp_ond_nationalgridvalue += val;

          this.ndvi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_amj"];
          this.ndvi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jas"];
          this.ndvi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndvi_jfm"];
          this.ndvi_ond_nationalgridvalue += val;

          this.ndwi_amj_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_amj"];
          this.ndwi_jas_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jas"];
          this.ndwi_jfm_nationalgridvalue =
            nationalGridcell["properties"]["ndwi_jfm"];
          this.ndwi_ond_nationalgridvalue += val;

          this.lst_amj_nationalgridvalue =
            nationalGridcell["properties"]["lst_amj"];
          this.lst_jas_nationalgridvalue =
            nationalGridcell["properties"]["lst_jas"];
          this.lst_jfm_nationalgridvalue =
            nationalGridcell["properties"]["lst_jfm"];
          this.lst_ond_nationalgridvalue += val;
        }
      }
      return true;
    });

    this.propertiesData.filter((propertyData) => {
      for (let [sliderK, val] of Object.entries(propertyData)) {
        if (sliderK === "ppp_sum") {
          this.populationValue += val;
        } else if (
          sliderK === "presp_jfm" ||
          sliderK === "ndvi_jfm" ||
          sliderK === "ndwi_jfm" ||
          sliderK === "lst_jfm"
        ) {
          this.presp_amj = propertyData["presp_amj"];
          this.presp_jas = propertyData["presp_jas"];
          this.presp_ond = propertyData["presp_ond"];
          this.presp_jfm += val;

          this.ndvi_amj = propertyData["ndvi_amj"];
          this.ndvi_jas = propertyData["ndvi_jas"];
          this.ndvi_ond = propertyData["ndvi_ond"];
          this.ndvi_jfm += val;

          this.ndwi_amj = propertyData["ndwi_amj"];
          this.ndwi_jas = propertyData["ndwi_jas"];
          this.ndwi_ond = propertyData["ndwi_ond"];
          this.ndwi_jfm += val;

          this.lst_amj = propertyData["lst_amj"];
          this.lst_jas = propertyData["lst_jas"];
          this.lst_ond = propertyData["lst_ond"];
          this.lst_jfm += val;
        } else if (
          sliderK === "presp_amj" ||
          sliderK === "ndvi_amj" ||
          sliderK === "ndwi_amj" ||
          sliderK === "lst_amj"
        ) {
          this.presp_jfm = propertyData["presp_jfm"];
          this.presp_jas = propertyData["presp_jas"];
          this.presp_ond = propertyData["presp_ond"];
          this.presp_amj += val;

          this.ndvi_jfm = propertyData["ndvi_jfm"];
          this.ndvi_jas = propertyData["ndvi_jas"];
          this.ndvi_ond = propertyData["ndvi_ond"];
          this.ndvi_amj += val;

          this.ndwi_jfm = propertyData["ndwi_jfm"];
          this.ndwi_jas = propertyData["ndwi_jas"];
          this.ndwi_ond = propertyData["ndwi_ond"];
          this.ndwi_amj += val;

          this.lst_jfm = propertyData["lst_jfm"];
          this.lst_jas = propertyData["lst_jas"];
          this.lst_ond = propertyData["lst_ond"];
          this.lst_amj += val;
        } else if (
          sliderK === "presp_jas" ||
          sliderK === "ndvi_jas" ||
          sliderK === "ndwi_jas" ||
          sliderK === "lst_jas"
        ) {
          this.presp_amj = propertyData["presp_amj"];
          this.presp_jfm = propertyData["presp_jfm"];
          this.presp_ond = propertyData["presp_ond"];
          this.presp_jas += val;

          this.ndvi_amj = propertyData["ndvi_amj"];
          this.ndvi_jfm = propertyData["ndvi_jfm"];
          this.ndvi_ond = propertyData["ndvi_ond"];
          this.ndvi_jas += val;

          this.ndwi_amj = propertyData["ndwi_amj"];
          this.ndwi_jfm = propertyData["ndwi_jfm"];
          this.ndwi_ond = propertyData["ndwi_ond"];
          this.ndwi_jas += val;

          this.lst_amj = propertyData["lst_amj"];
          this.lst_jfm = propertyData["lst_jfm"];
          this.lst_ond = propertyData["lst_ond"];
          this.lst_jas += val;
        } else if (
          sliderK === "presp_ond" ||
          sliderK === "ndvi_ond" ||
          sliderK === "ndwi_ond" ||
          sliderK === "lst_ond"
        ) {
          this.presp_amj = propertyData["presp_amj"];
          this.presp_jas = propertyData["presp_jas"];
          this.presp_jfm = propertyData["presp_jfm"];
          this.presp_ond += val;

          this.ndvi_amj = propertyData["ndvi_amj"];
          this.ndvi_jas = propertyData["ndvi_jas"];
          this.ndvi_jfm = propertyData["ndvi_jfm"];
          this.ndvi_ond += val;

          this.ndwi_amj = propertyData["ndwi_amj"];
          this.ndwi_jas = propertyData["ndwi_jas"];
          this.ndwi_jfm = propertyData["ndwi_jfm"];
          this.ndwi_ond += val;

          this.lst_amj = propertyData["lst_amj"];
          this.lst_jas = propertyData["lst_jas"];
          this.lst_jfm = propertyData["lst_jfm"];
          this.lst_ond += val;
        } else if (sliderK === "soil_copper") {
          this.copperValue += val;
        } else if (sliderK === "soil_alumi") {
          this.alumiValue += val;
        } else if (sliderK === "soil_phos") {
          this.phosValue += val;
        } else if (sliderK === "soil_potas") {
          this.potasValue += val;
        } else if (sliderK === "soil_boron") {
          this.boronValue += val;
        } else if (sliderK === "soil_iron") {
          this.ironValue += val;
        } else if (sliderK === "soil_magne") {
          this.magneValue += val;
        }
      }
      return true;
    });
    this.populationFinalValue =
      this.populationValue / this.propertiesData.length;
    this.populationFinalNationalValue =
      this.PopulationNationalGridValue / this.nationalGridcells.length;
    if (this.populationValue !== 0) {
      this.populationchartData[0] = this.populationFinalValue.toFixed(2);
      this.populationAverageNationalGridcells[0] = this.populationFinalNationalValue.toFixed(
        2
      );
    }
    this.props.dispatch({
      type: updatePopulationChartData,
      payload: this.populationchartData,
      populationAverageNationalGridcells: this
        .populationAverageNationalGridcells,
    });
    //rainfall calculations
    this.rainfallchartData[0] = this.presp_jfm;
    this.rainfallchartData[1] = this.presp_amj;
    this.rainfallchartData[2] = this.presp_jas;
    this.rainfallchartData[3] = this.presp_ond;

    this.rainfallNationalGridcells[0] = this.presp_jfm_nationalgridvalue;
    this.rainfallNationalGridcells[1] = this.presp_amj_nationalgridvalue;
    this.rainfallNationalGridcells[2] = this.presp_jas_nationalgridvalue;
    this.rainfallNationalGridcells[3] = this.presp_ond_nationalgridvalue;

    this.rainfallchartData = this.rainfallchartData.map(
      (each_rainfall_value) => {
        if (each_rainfall_value !== null) {
          return Number(each_rainfall_value.toFixed(2));
        }
        return true;
      }
    );
    this.rainfallNationalGridcells = this.rainfallNationalGridcells.map(
      (each_rainfall_value) => {
        if (each_rainfall_value !== null) {
          return Number(each_rainfall_value.toFixed(2));
        }
        return true;
      }
    );

    this.props.dispatch({
      type: updateRainfallChartData,
      payload: this.rainfallchartData,
      rainfallNationalGridcells: this.rainfallNationalGridcells,
    });

    //vegetation health calculations
    this.vegetationHealthchartData[0] = this.ndvi_jfm;
    this.vegetationHealthchartData[1] = this.ndvi_amj;
    this.vegetationHealthchartData[2] = this.ndvi_jas;
    this.vegetationHealthchartData[3] = this.ndvi_ond;

    this.vegetationHealthNationalGridcells[0] = this.ndvi_jfm_nationalgridvalue;
    this.vegetationHealthNationalGridcells[1] = this.ndvi_amj_nationalgridvalue;
    this.vegetationHealthNationalGridcells[2] = this.ndvi_jas_nationalgridvalue;
    this.vegetationHealthNationalGridcells[3] = this.ndvi_ond_nationalgridvalue;

    this.vegetationHealthchartData = this.vegetationHealthchartData.map(
      (each_vegetationHealth_value) => {
        if (each_vegetationHealth_value !== null) {
          return Number(each_vegetationHealth_value.toFixed(2));
        }
        return true;
      }
    );
    this.vegetationHealthNationalGridcells = this.vegetationHealthNationalGridcells.map(
      (each_vegetationHealth_value) => {
        if (each_vegetationHealth_value !== null) {
          return Number(each_vegetationHealth_value.toFixed(2));
        }
        return true;
      }
    );

    this.props.dispatch({
      type: updateVegetationHealthChartData,
      payload: this.vegetationHealthchartData,
      vegetationHealthNationalGridcells: this.vegetationHealthNationalGridcells,
    });

    //crop health calculations
    this.cropHealthchartData[0] = this.ndwi_jfm;
    this.cropHealthchartData[1] = this.ndwi_amj;
    this.cropHealthchartData[2] = this.ndwi_jas;
    this.cropHealthchartData[3] = this.ndwi_ond;

    this.cropHealthNationalGridcells[0] = this.ndwi_jfm_nationalgridvalue;
    this.cropHealthNationalGridcells[1] = this.ndwi_amj_nationalgridvalue;
    this.cropHealthNationalGridcells[2] = this.ndwi_jas_nationalgridvalue;
    this.cropHealthNationalGridcells[3] = this.ndwi_ond_nationalgridvalue;

    this.cropHealthchartData = this.cropHealthchartData.map(
      (each_cropHealth_value) => {
        if (each_cropHealth_value !== null) {
          return Number(each_cropHealth_value.toFixed(2));
        }
        return true;
      }
    );
    this.cropHealthNationalGridcells = this.cropHealthNationalGridcells.map(
      (each_cropHealth_value) => {
        if (each_cropHealth_value !== null) {
          return Number(each_cropHealth_value.toFixed(2));
        }
        return true;
      }
    );

    this.props.dispatch({
      type: updateCropHealthChartData,
      payload: this.cropHealthchartData,
      cropHealthNationalGridcells: this.cropHealthNationalGridcells,
    });

    //temperature calculations
    this.temperaturechartData[0] = this.lst_jfm;
    this.temperaturechartData[1] = this.lst_amj;
    this.temperaturechartData[2] = this.lst_jas;
    this.temperaturechartData[3] = this.lst_ond;

    this.temperatureNationalGridcells[0] = this.lst_jfm_nationalgridvalue;
    this.temperatureNationalGridcells[1] = this.lst_amj_nationalgridvalue;
    this.temperatureNationalGridcells[2] = this.lst_jas_nationalgridvalue;
    this.temperatureNationalGridcells[3] = this.lst_ond_nationalgridvalue;
    this.temperaturechartData = this.temperaturechartData.map(
      (each_temperature_value) => {
        if (each_temperature_value !== null) {
          return Number(each_temperature_value.toFixed(2));
        }
        return true;
      }
    );
    this.temperatureNationalGridcells = this.temperatureNationalGridcells.map(
      (each_temperature_value) => {
        if (each_temperature_value !== null) {
          return Number(each_temperature_value.toFixed(2));
        }
        return true;
      }
    );

    this.props.dispatch({
      type: updateTemperatureChartData,
      payload: this.temperaturechartData,
      temperatureNationalGridcells: this.temperatureNationalGridcells,
    });

    this.copperValue = (this.copperValue / this.propertiesData.length).toFixed(
      2
    );
    this.alumiValue = (this.alumiValue / this.propertiesData.length).toFixed(2);
    this.phosValue = (this.phosValue / this.propertiesData.length).toFixed(2);
    this.potasValue = (this.potasValue / this.propertiesData.length).toFixed(2);
    this.boronValue = (this.boronValue / this.propertiesData.length).toFixed(2);
    this.ironValue = (this.ironValue / this.propertiesData.length).toFixed(2);
    this.magneValue = (this.magneValue / this.propertiesData.length).toFixed(2);

    this.UpdatedIndicators = this.props.updatePieChartIndicators;
    let pieChartValuesObject = {
      soil_copper: this.copperValue,
      soil_alumi: this.alumiValue,
      soil_phos: this.phosValue,
      soil_potas: this.potasValue,
      soil_boron: this.boronValue,
      soil_iron: this.ironValue,
      soil_magne: this.magneValue,
    };

    Object.keys(pieChartValuesObject).forEach((key_) => {
      if (this.UpdatedIndicators.includes(key_)) {
        this.piechartData[this.UpdatedIndicators.indexOf(key_)] =
          pieChartValuesObject[key_];
      }
    });

    this.props.dispatch({
      type: updatePieChartData,
      payload: this.piechartData,
    });

    const district = this.refs.geojson.leafletElement;
    if (this.refs.map && map && this.refs.geojson && district) {
      map.fitBounds(e.target.getBounds());
      this.props.dispatch({ type: updateChartView, payload: true });
    } else {
      map.fitBounds(district.getBounds());
    }

    var layer = e.target;
    layer.setStyle({
      weight: 2,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.5,
    });
  }

  MouseOverFeature(e, feature) {
    this.setState({
      district: feature.properties.DName2019,
      id: feature.properties.id,
    });
  }

  MouseOutFeature(e, feature) {
    e.target.closePopup();
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      district: "Hover over the map",
    });
    e.target.setStyle({});
  }

  render() {
    let collectionOfGridcells = this.props.mapGrids;
    let districtData = districts;
    let data = districtData;
    var statusArea = "";
    if (this.props.mapUpdated === false) {
      data = districtData;
      statusArea = "District: " + this.state.district;
    } else {
      data = collectionOfGridcells[0][0];
      if (this.props.mapGrids[0] !== undefined) {
        statusArea =
          "Total grid cells: " + data.features.length + " 5x5 square km";
      }
    }

    if (collectionOfGridcells[0]) {
      let map_state = (
        <Map
          className="map"
          center={[this.props.lat, this.props.lng]}
          zoom={this.props.zoom}
          ref="map"
          style={{ height: "550px", color: "#e15c26" }}
          maxBounds={this.state.bounds}
          maxZoom={12}
          minZoom={this.props.zoom}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> contributors &copy; <a href="https://carto.com/attributions"></a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            maxzoom="9"
          />
          <GeoJSON
            key={this.props.mapGrids[0][0].features.length}
            data={data}
            ref="geojson"
            onEachFeature={this.onEachFeature}
          />
          <GeoJSON data={districtData} onEachFeature={this.onEachFeature} />
          <Control className="info" position="topright">
            <div>{statusArea}</div>
          </Control>
        </Map>
      );
      return map_state;
    } else return <LoadingScreen />;
  }
}
const mapStateToProps = (state) => {
  return {
    lat: state.map.lat,
    lng: state.map.lng,
    zoom: state.map.zoom,
    district: state.map.district,
    dist_ref: state.map.dist_ref,
    mapGrids: state.map.updatedMapGrids,
    locationValue: state.location.locationValue,
    sliderValue: state.slider.sliderValue,
    mapUpdated: state.map.mapUpdated,
    populationchartData: state.chart.populationChartData,
    vegetationHealthchartData: state.chart.vegetationHealthChartData,
    rainfallchartData: state.chart.rainfallChartData,
    cropHealthchartData: state.chart.cropHealthChartData,
    temperaturechartData: state.chart.temperatureChartData,
    populationAverageNationalGridcells:
      state.chart.populationAverageNationalGridcells,
    rainfallNationalGridcells: state.chart.rainfallNationalGridcells,
    cropHealthNationalGridcells: state.chart.cropHealthNationalGridcells,
    vegetationHealthNationalGridcells:
      state.chart.vegetationHealthNationalGridcells,
    temperatureNationalGridcells: state.chart.temperatureNationalGridcells,
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
  };
};

export default connect(mapStateToProps)(UgMap);

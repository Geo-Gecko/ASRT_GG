import React, { Component } from "react";
import _ from "lodash";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import Control from "react-leaflet-control";
import { connect } from "react-redux";
import {
  updatePieChartData,
  updateChartView,
  updatePopulationChartData,
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
    this.piechartData = _.cloneDeep(this.props.piechartData);
    this.populationAverageNationalGridcells = _.cloneDeep(
      this.props.populationAverageNationalGridcells
    );
    this.propertiesData = propertiesArray;
    this.rainfallValue = 0;
    this.nationalGridValue = 0;
    this.populationValue = 0;
    this.PopulationNationalGridValue = 0;
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
      }
      return true;
    });

    this.propertiesData.filter((rfs) => {
      for (let [sliderK, val] of Object.entries(rfs)) {
        if (sliderK === "ppp_sum") {
          this.populationValue += val;
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

    for (let a = 0; a <= this.UpdatedIndicators.length; a++) {
      if (this.UpdatedIndicators[a] === "soil_copper") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.copperValue;
      } else if (this.UpdatedIndicators[a] === "soil_alumi") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.alumiValue;
      } else if (this.UpdatedIndicators[a] === "soil_phos") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.phosValue;
      } else if (this.UpdatedIndicators[a] === "soil_potas") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.potasValue;
      } else if (this.UpdatedIndicators[a] === "soil_boron") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.boronValue;
      } else if (this.UpdatedIndicators[a] === "soil_iron") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.ironValue;
      } else if (this.UpdatedIndicators[a] === "soil_magne") {
        this.piechartData[
          this.UpdatedIndicators.indexOf(this.UpdatedIndicators[a])
        ] = this.magneValue;
      }
    }

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
    } else return "Failed to load the map";
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
    populationAverageNationalGridcells:
      state.chart.populationAverageNationalGridcells,
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
  };
};

export default connect(mapStateToProps)(UgMap);

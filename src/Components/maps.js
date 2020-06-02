import React, { Component } from "react";
import _ from "lodash";
import {
  Map,
  TileLayer,
  GeoJSON,
} from "react-leaflet";
import Control from "react-leaflet-control";
import { connect } from "react-redux";
import {
  updatePieChartData,
  updateRainfallChartData,
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
    let aarrr = [];
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
        var l = districtsdata["features"][element];

        gridcellArray.push(l);
      } else {
        var m = districtsdata["features"][element]["properties"];
        aarrr.push(m);
      }
    });

    this.rainfallchartData = _.cloneDeep(this.props.rainfallchartData);
    this.populationchartData = _.cloneDeep(this.props.populationchartData);
    this.piechartData = _.cloneDeep(this.props.piechartData);

    this.averagenationalGridcells = _.cloneDeep(
      this.props.averagenationalGridcells
    );
    this.populationAverageNationalGridcells = _.cloneDeep(
      this.props.populationAverageNationalGridcells
    );
    this.rf = aarrr;
    this.newValue = 0;
    this.nationalGridValue = 0;
    this.PopulationNationalGridValue = 0;
    this.nationalGridcells = districtsdata.features;
    this.nationalGridcells.forEach((nationalGridcell) => {
      for (let [sliderK, val] of Object.entries(
        nationalGridcell["properties"]
      )) {
        if (sliderK === "rainfall") {
          this.nationalGridValue += val;
        } else if (sliderK === "ppp_sum") {
          this.PopulationNationalGridValue += val;
        }
      }
      return true
    });
    this.rf.filter((rfs) => {
      for (let [sliderK, val] of Object.entries(rfs)) {
        if (sliderK === "rainfall") {
          this.newValue += val;
        } else if (sliderK === "ppp_sum") {
          this.newValue += val;
        } else if (sliderK === "soil_copper") {
          this.newValuee += val;
        } else if (sliderK === "soil_alumi") {
          this.newValue += val;
        } else if (sliderK === "soil_phos") {
          this.newValue+= val;
        } else if (sliderK === "soil_potas") {
          this.newValue += val;
        } else if (sliderK === "soil_boron") {
          this.newValue += val;
        } else if (sliderK === "soil_iron") {
          this.newValue+= val;
        } else if (sliderK === "soil_magne") {
          this.newValue += val;
        }
      }
      return this.newValue;
    });

    this.FinalValue = this.newValue / this.rf.length;
    this.FinalNationalValue =
      this.nationalGridValue / this.nationalGridcells.length;
    if (this.newValue !== 0) {
      this.rainfallchartData[0] = this.FinalValue.toFixed(2);
      this.averagenationalGridcells[0] = this.FinalNationalValue.toFixed(2);
    }
    this.props.dispatch({
      type: updateRainfallChartData,
      payload: this.rainfallchartData,
      averagenationalGridcells: this.averagenationalGridcells,
    });
    this.populationFinalValue = this.newValue / this.rf.length;
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

    this.copperValue = (this.newValue / this.rf.length).toFixed(2);
    this.alumiValue = (this.newValue / this.rf.length).toFixed(2);
    this.phosValue = (this.newValue / this.rf.length).toFixed(2);
    this.potasValue = (this.newValue / this.rf.length).toFixed(2);
    this.boronValue = (this.newValue / this.rf.length).toFixed(2);
    this.ironValue = (this.newValue / this.rf.length).toFixed(2);
    this.magneValue = (this.newValue / this.rf.length).toFixed(2);

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
      let map_state =
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
              <div>{(statusArea)}</div>
            </Control>
            }
          </Map>
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
    rainfallchartData: state.chart.rainfallChartData,
    populationchartData: state.chart.populationChartData,
    averagenationalGridcells: state.chart.averagenationalGridcells,
    populationAverageNationalGridcells:
      state.chart.populationAverageNationalGridcells,
    piechartData: state.chart.pieChartData,
    updatePieChartIndicators: state.chart.piechartIndicators,
    pieChartDataUpdated: state.chart.pieChartDataUpdated,
  };
};

export default connect(mapStateToProps)(UgMap);

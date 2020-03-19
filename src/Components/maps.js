import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, ZoomControl, GeoJSON, Popup } from "react-leaflet";
import Control from "react-leaflet-control";
import { connect } from "react-redux";
import { updateGridDataSuccess } from "../redux/actions/actionTypes/actionTypes";
import { getMapGrids } from "../redux/actions/mapAction";
import { getLocation } from "../redux/actions/locationActions";
import { getSliderData } from "../redux/actions/sliderActions";
import districts from "../Components/uganda_districts_2019";




class UgMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      data: this.props.locationValue,
      district: 'Hover over district',


      map: null
    };
    this.geoJsonLayer = React.createRef();
    //   this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   this.setState({ currentPos: e.latlng });
  // }

  componentWillMount() {
    this.props.dispatch(getMapGrids());
    this.props.dispatch(getLocation());
    this.props.dispatch(getSliderData());
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.mapGrids)
    if (nextProps.mapUpdated === true) {

      // console.log(this.props.mapGrids[0][0].features.length, this.state.map);
      // this.geoJsonLayer.current.leafletElement.clearLayers().addData(this.props.mapGrids)
      this.props.dispatch({ type: updateGridDataSuccess, payload: false });
    }
  }
  onEachFeature = (feature, layer) => {
    // console.log("onEachFeature fired: ");
    layer.on({
      mouseover: e => this.MouseOverFeature(e, feature)
      // mouseout: (e) => this.MouseOutFeature(e, feature),
    });
  };

  MouseOverFeature(e, feature) {

    this.setState({
      district: feature.properties.DName2019,
    })

    e.target.bindPopup(this.state.district);

    e.target.openPopup();

  }

  // setZoomAround(fixedPoint, zoom)

  // }

  MouseOutFeature(e, feature) {
    e.target.closePopup();
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      district: this.props.district

    });
    e.target.setStyle({
      // fillColor: '#A52A2A',
      // fillOpacity: 1,
    });
    // status = 'hello'
    // console.log(feature);
    // feature.showPopup();
  }

  // handleMasaka = () => {
  //   return districts.features[0].properties.DName2016;

  // }

  handleClick = (e, feature) => {
    // console.log(e);
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,
      zoom: this.props.zoom,
      district: this.props.locationValue
    });
  };

  render() {
    let status = this.state.district;
    let collectionOfGridcells = this.props.mapGrids;
    console.log(collectionOfGridcells)
    // let data = districts
    let statusArea=this.state.district
    // if (this.props.mapUpdated == false) {
      // data = data
      // statusArea=statusArea
    // } else {
      // data = collectionOfGridcells[0][0]
      // statusArea="Total grid cells: "+this.props.mapGrids[0][0].features.length + "<br /> "+" 5x5 square kilometers"
    // }


    if (collectionOfGridcells[0]) {
      this.state.map = (
        <Map
          className="map"
          center={[this.props.lat, this.props.lng]}
          zoom={this.props.zoom}
          style={{ height: "800px", color: "#e15c26" }}
          onClick={this.handleClick}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> contributors &copy; <a href="https://carto.com/attributions"></a>'
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            maxzoom="10"
          />

          <GeoJSON
            key={this.props.mapGrids[0][0].features.length}
            data={collectionOfGridcells[0][0]}
            // data={data}
            onEachFeature={this.onEachFeature}
          />

          <Control className="info" position="topright">
            <div>
              <strong>
                Total grid cells: {this.props.mapGrids[0][0].features.length}{" "}
                <br /> 55x square kilometers
                {/* {statusArea} */}
              </strong>
            </div>
          </Control>

          }
          </Map>
      );
      return this.state.map;
    } else return "hello";
  }
}
const mapStateToProps = state => {
  return {
    lat: state.map.lat,
    lng: state.map.lng,
    zoom: state.map.zoom,
    district: state.map.district,
    mapGrids: state.map.updatedMapGrids,
    locationValue: state.location.locationValue,
    sliderValue: state.slider.sliderValue,
    mapUpdated: state.map.mapUpdated
  };
};

export default connect(mapStateToProps)(UgMap);

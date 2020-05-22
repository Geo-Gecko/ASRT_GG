import React, { Component } from "react";
import Callout from "react-callout-component";
import "../App.css";

export default class Callouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: null,
    };
    this.boxEl = React.createRef();
  }

  componentDidMount() {
    this.setState({
      box: this.boxEl.current,
    });
  }

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div ref={this.boxEl}>{this.props.myComponent}</div>
        <Callout
          isVisible
          parentElement={this.state.box}
          className={this.props.styles}
          side={this.props.side}
          arrowSize={this.props.arrowsize}
          distanceFromParent={-10}
        >
          <span style={{ color: "white" }}>{this.props.message}</span>
        </Callout>
      </div>
    );
  }
}

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "leaflet/dist/leaflet.css";
import { Provider } from "react-redux";
import store from "./redux/store";

// import ResponsiveDrawer from './Components/Analysis'

//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  
  </Provider>,
  document.getElementById("root") 
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

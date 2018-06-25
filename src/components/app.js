import React, { Component } from "react";
import Picker from "./picker";

export default class App extends Component {
  render() {
    return (
      <div className="grid">
        <h1 className="grid__title">Birthday Countdown</h1>
        <div className="grid__skew-dark-one-box" />
        <div className="grid__skew-dark-two" />
        <div className="grid__skew-dark-three" />

        <div className="grid__skew-light-one" />
        <div className="grid__skew-light-two" />
        <div className="grid__skew-light-three-box" />

        <Picker />
      </div>
    );
  }
}

import React, { Component } from "react";

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export default class Picker extends Component {
    handleChange = function(date) {
        this.props.callback(date);
    }.bind(this);

    render() {
        let minDate = new Date();
        minDate.setDate(minDate.getDate() + 1);
        return (
            <div className="picker">
                <DatePicker
                    minDate={minDate}
                    selected={this.props.startDate}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

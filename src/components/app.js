import React, { Component } from "react";

import Picker from "./picker";
import Button from "./button";
import Clock from "./clock";
import ChangeDate from "./changeDate";
import LargeText from "./largeText";

import moment from "moment";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            startDate: moment()
        };
    }

    handleChange = function(date) {
        this.setState({
            startDate: date
        });
    }.bind(this);

    handleGenerate = function() {
        this.setState({ active: true });

        let countDownDate = this.state.startDate.toDate().getTime();

        // Update the countdown every one second
        let x = setInterval(function() {
            let now = new Date().getTime();

            let distance = countDownDate - now;

            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minutes = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const time =
                days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

            console.log(time);

            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
    }.bind(this);

    renderItems = function() {
        if (this.state.active) {
            return [
                <Clock />,
                ChangeDate("Change Date", () =>
                    this.setState({ active: false })
                ),
                LargeText("04/03"),
                <label className="grid__remaining">
                    Remaining until your selected date.
                </label>
            ];
        } else {
            return [
                Button("Generate Countdown", this.handleGenerate),
                <Picker callback={date => this.handleChange(date)} />
            ];
        }
    }.bind(this);

    render() {
        return (
            <div className="grid">
                <h1 className="grid__title">Date Countdown</h1>
                <div className="grid__skew-dark-two" />
                <div className="grid__skew-dark-three" />

                <div className="grid__skew-light-one" />
                <div className="grid__skew-light-two" />
                <div className="grid__skew-light-three-box" />

                {this.renderItems()}
            </div>
        );
    }
}

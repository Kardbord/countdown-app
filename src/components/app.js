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

        this.timer = 0;

        this.state = {
            active: false,
            startDate: moment(new Date()).add(1, "days"),
            timeRemaining: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        };
    }

    handleChange = function(date) {
        this.setState({
            startDate: date
        });
        clearInterval(this.timer);
    }.bind(this);

    handleGenerate = function() {
        this.setState({ active: true });

        let countDownDate = this.state.startDate.toDate().getTime();

        // Update the countdown every one second
        this.timer = setInterval(
            function() {
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
                    days +
                    "d " +
                    hours +
                    "h " +
                    minutes +
                    "m " +
                    seconds +
                    "s ";

                const timeRemaining = {
                    days,
                    hours,
                    minutes,
                    seconds
                };

                this.setState({
                    timeRemaining
                });

                if (distance < 0) {
                    clearInterval(x);
                }
            }.bind(this),
            1000
        );
    }.bind(this);

    renderItems = function() {
        if (this.state.active) {
            let day = this.state.startDate.toDate().getDate();
            let month = this.state.startDate.toDate().getMonth() + 1;
            let year = this.state.startDate.toDate().getFullYear() % 100;
            return [
                <Clock key={0} timeRemaining={this.state.timeRemaining} />,
                ChangeDate("Change Date", () =>
                    this.setState({ active: false })
                ),
                LargeText(`${month}/${day}/${year}`),
                <label key={3} className="grid__remaining">
                    Remaining until your selected date.
                </label>
            ];
        } else {
            return [
                Button("Generate Countdown", this.handleGenerate),
                <Picker
                    key={1}
                    startDate={this.state.startDate}
                    callback={date => this.handleChange(date)}
                />
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

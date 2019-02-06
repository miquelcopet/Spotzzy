import React, { Component } from "react";
import "react-sweet-progress/lib/style.css";
import { Progress } from "react-sweet-progress";
import "./CustomProgress.css";

export class CustomProgress extends Component {
	render() {
		const theme = {
			active: {
				symbol: this.props.progress + "%",
				color: "#d84877",
				trailColor: "#ffefd5"
			}
		};

		return (
			<div>
				<p className="progressText">{this.props.name}</p>
				<Progress percent={this.props.progress} theme={theme} status="active"/>
			</div>
		);
	}
}

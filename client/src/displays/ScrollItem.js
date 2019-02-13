import React, { Component } from "react";
import "./ScrollItem.css";

export class ScrollItem extends Component {
	render() {
		return (
			<div className="scrollholder">
				<div className="image-cropper">
					<img
						className="scrollImg"
						src={this.props.img}
						alt={this.props.name}
					/>
				</div>
				<p>{this.props.name}</p>
			</div>
		);
	}
}

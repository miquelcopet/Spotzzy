import React, { Component } from 'react';
import "react-sweet-progress/lib/style.css";
import { Progress } from 'react-sweet-progress';
import "./CustomProgress.css";

export class CustomProgress extends Component {
    render() {     
        const theme = {
            active: {
                color: '#ff5ebc'
                }
            };

        const status = this.props.progress === 0 ? "error" : "active";

        return (
            <div>
                <p className="progressText">{this.props.name}</p>
                <Progress percent={this.props.progress} status={status}/>
            </div>
        );
      }
}
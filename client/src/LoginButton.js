import React, { Component } from 'react';
import './App.css';

export class LoginButton extends Component {
    render() {        
        return (
            <div className="LoginHolder">
                <h3>You need to be logged with your Spotify account</h3>
                <a href='http://localhost:8888' > Login to Spotify </a>
            </div>
        );
      }
}
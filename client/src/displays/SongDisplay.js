import React, { Component } from 'react';
import './Song.css';
import { CustomProgress } from './progress/CustomProgress';

export class SongDisplay extends Component {
    render() {        
        return (
            <div className="songHolder">
                <div className="avatarHolder">
                    <img className="albumAvatar" src={this.props.song.album.art} alt={this.props.song.name}></img>
                </div>
                <div className="songNameHolder">
                    <p className="title">{this.props.song.name}</p>
                    <p className="artist">{this.props.song.artist.name}</p>
                </div>

                <div className="songInfoHolder">
                    <CustomProgress name="Acousticness" progress={this.props.song.acoustiness}/>
                    <CustomProgress name="Energy" progress={this.props.song.energy}/>
                    <CustomProgress name="Instrumentalness" progress={this.props.song.instrumentalness}/>
                    <CustomProgress name="Danceability" progress={this.props.song.danceability}/>
                </div>
            </div>
        );
      }
}
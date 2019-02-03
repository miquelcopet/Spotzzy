import React, { Component } from "react";
import "./Song.css";
import { CustomProgress } from "./progress/CustomProgress";

export class SongDisplay extends Component {
	render() {
		return (
			<div className="songHolder">
				<div onClick={this.calculateSongProgress} className="avatarHolder">
					<img    
						className="albumAvatar"
						src={this.props.data.nowPlaying.album.art}
						alt={this.props.data.nowPlaying.name}
					/>
				</div>
				<div className="songNameHolder">
					<p className="title">{this.props.data.nowPlaying.name}</p>
					<p className="artist">{this.props.data.nowPlaying.artist.name}</p>
				</div>

				<div className="songInfoHolder">
					<CustomProgress
						name="Acousticness"
						progress={this.props.data.song.acoustiness}
					/>
					<CustomProgress name="Energy" progress={this.props.data.song.energy} />
					<CustomProgress
						name="Instrumentalness"
						progress={this.props.data.song.instrumentalness}
					/>
					<CustomProgress
						name="Danceability"
						progress={this.props.data.song.danceability}
					/>
				</div>
			</div>
		);
	}
}

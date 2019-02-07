import React, { Component } from "react";
import "./DisplayStyle.css";
import { CustomProgress } from "./progress/CustomProgress";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export class SongDisplay extends Component {
	constructor() {
		super();

		this.state = {
			name: "Song",
			album: {
				art:
					"https://music.uberchord.com/assets/images/png/placeholder-song.png",
				name: "Album"
			},
			artist: {
				name: "Artist"
			},
			acoustiness: 0,
			energy: 0,
			instrumentalness: 0,
			danceability: 0
		};
	}

	render() {
		return (
			<div className="mainHolder">
				<div className="avatarHolder">
					<img
						className="avatar"
						src={this.state.album.art}
						alt={this.state.name}
					/>
				</div>
				<div className="holder center">
					<p className="title">{this.state.name}</p>
					<p className="artist">{this.state.artist.name}</p>
				</div>

				<div className="holder">
					<CustomProgress name="Acousticness" progress={this.state.acoustiness}/>
					<CustomProgress name="Energy" progress={this.state.energy} />
					<CustomProgress name="Instrumentalness" progress={this.state.instrumentalness}/>
					<CustomProgress name="Danceability" progress={this.state.danceability}/>
				</div>
			</div>
		);
	}

	updateSongDisplay(songId) {
		this.getTrackData(songId);
	}

	getTrackData(trackId) {
		spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
			console.log(response);
			let updatedSong = {
				name: "",
				album: {
					art:
						"https://music.uberchord.com/assets/images/png/placeholder-song.png",
					name: ""
				},
				artist: {
					name: ""
				},
				acoustiness: Math.round(response.acousticness * 100),
				energy: Math.round(response.energy * 100),
				instrumentalness: Math.round(response.instrumentalness * 100),
				danceability: Math.round(response.danceability * 100)
			};

			this.setState({ song: updatedSong });
		});
	}
}

import React, { Component } from "react";
import "./DisplayStyle.css";
import { CustomProgress } from "./progress/CustomProgress";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

export class SongDisplay extends Component {
	constructor() {
		super();

		this.state = {
			lastSongId: "",
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
		if (this.state.lastSongId === trackId) return;

		spotifyApi.getTrack(trackId).then(response => {
			let updatedSong = {
				lastSongId: trackId,
				name: response.name,
				album: {
					art: response.album.images[0].url,
					name: response.album.name
				},
				artist: {
					name: response.album.artists[0].name
				}
			};

			this.getAudioFeatures(trackId, updatedSong);
		});
	}

	getAudioFeatures(trackId, trackData) {
		spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
			trackData.acoustiness = Math.round(response.acousticness * 100);
			trackData.energy = Math.round(response.energy * 100);
			trackData.instrumentalness = Math.round(response.instrumentalness * 100);
			trackData.danceability = Math.round(response.danceability * 100);

			this.setState(trackData);
		});
	}
}

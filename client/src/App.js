import React, { Component } from "react";
import "./App.css";
import { LoginButton } from "./LoginButton";

import SpotifyWebApi from "spotify-web-api-js";
import { SongDisplay } from "./displays/SongDisplay";
import { UserDisplay } from "./displays/UserDisplay";
import { ListDisplay } from "./displays/ListDisplay";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
	constructor(props) {
		super(props);
		const params = this.getHashParams();
		const token = params.access_token;
		if (token) {
			spotifyApi.setAccessToken(token);
		}

		this.props = {
			loggedIn: token ? true : false
		};

		this.songDisplay = React.createRef();
	}

	getHashParams() {
		var hashParams = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		e = r.exec(q);
		while (e) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
			e = r.exec(q);
		}
		return hashParams;
	}

	updateSongDisplay = (songId) => {
		this.songDisplay.current.updateSongDisplay(songId);
	};

	render() {
		const isLoggedIn = this.props.isLoggedIn;
		return (
			<div className="grid-container">
				<div className="item1">
					<link
						href="https://fonts.googleapis.com/css?family=Open+Sans:300,400"
						rel="stylesheet"
					/>
					<LoginButton />
				</div>

				<div className="item2">
					<ListDisplay updateSongDisplay={this.updateSongDisplay}/>
				</div>

				<div className="item3">
					<SongDisplay ref={this.songDisplay} data={this.state} />
				</div>

				<div className="item4">
					<UserDisplay />
				</div>
				
				<footer className="item5">
					Powered by React
				</footer>

			</div>
		);
	}
}

export default App;

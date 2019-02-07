import React, { Component } from "react";
import "./DisplayStyle.css";
import Slider from "react-slick";

import SpotifyWebApi from "spotify-web-api-js";
import { ScrollItem } from "./ScrollItem";
const spotifyApi = new SpotifyWebApi();

export class UserDisplay extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			displayName: "Username",
			followers: 0,
			img: "https://app.voxeet.com/images/user-placeholder.png",
			topArtists: [],
			topTracks: []
		};
		this.getUserData();
	}

	render() {
		return (
			<div className="mainHolder">
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
				/>

				<div className="avatarHolder">
					<img
						className="avatar"
						src={this.state.img}
						alt={this.state.displayName}
					/>
				</div>

				<div className="holder center">
					<p className="title">{this.state.displayName}</p>
					<p className="artist">{this.state.followers} followers</p>
				</div>

                <div className="holder slider">
					<p className="title">Top tracks</p>
					<Slider slidesToShow={3} dots="false" arrows="false" infinite="false">
						{this.state.topTracks.map((track, key) => (
							<ScrollItem
								name={track.name}
								img={track.album.images[0].url}
								key={key}
							/>
						))}
					</Slider>
				</div>

				<div className="holder slider">
					<p className="title">Top artists</p>
					<Slider slidesToShow={3} dots="false" arrows="false" infinite="false">
						{this.state.topArtists.map((artist, key) => (
							<ScrollItem
								name={artist.name}
								img={artist.images[0].url}
								key={key}
							/>
						))}
					</Slider>
				</div>
			</div>
		);
	}

	getUserData = () => {
		spotifyApi.getMe().then(response => {
			let getMeResponse = response;

			spotifyApi.getMyTopArtists().then(response => {
				let getArtistsResponse = response;
				spotifyApi.getMyTopTracks().then(response => {
					let updatedState = {
						id: getMeResponse.id,
						displayName: getMeResponse.display_name,
						followers: getMeResponse.followers.total,
						img: getMeResponse.images[0].url,
						topArtists: getArtistsResponse.items,
						topTracks: response.items
                    };

					this.setState(updatedState);
				});
			});
		});
	};
}

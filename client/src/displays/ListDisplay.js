import React, { Component } from "react";
import "./DisplayStyle.css";
//import VirtualList from "react-tiny-virtual-list";

import SpotifyWebApi from "spotify-web-api-js";
import { ListItem } from "./ListItem";
const spotifyApi = new SpotifyWebApi();

export class ListDisplay extends Component {
	constructor() {
		super();
		this.state = {
			items: []
		};

		this.getUserPlaylists();
	}

	render() {
		return (
			<div className="mainHolder">
				<h2>User playlists</h2>
				<div className="list-holder">
					{this.state.items.map((item, key) => (
						<ListItem
							item={item}
							handleItemClicked={this.handleItemClicked}
							key={key}
						/>
					))}
				</div>
			</div>
		);
	}

	getUserPlaylists() {
		spotifyApi.getUserPlaylists().then(response => {
			let itemList = [];
			response.items.forEach(element => {
				let item = {
					id: element.id,
					isCollaborative: element.collaborative,
					name: element.name,
					type: element.type,
					tracksCount: element.tracks.total,
					ownerId: element.owner.id
				};
				itemList.push(item);
			});

			this.setState({ items: itemList });
		});
	}

	handleItemClicked = (ownerId, itemId, isPlaylist) => {
		console.log(isPlaylist);
		if (isPlaylist) {
			this.getPlaylistTracks(ownerId, itemId);
		} else {
			this.props.updateSongDisplay(itemId);
		}
	};

	getPlaylistTracks = (ownerId, playlistId) => {
		spotifyApi.getPlaylistTracks(ownerId, playlistId).then(response => {
			let itemList = [];
			response.items.forEach(element => {
				let item = {
					id: element.track.id,
					name: element.track.name,
					artists: element.track.artists,
					type: element.track.type,
					duration: element.track.duration_ms
				};
				itemList.push(item);
			});
			console.log(itemList);
			this.setState({ items: itemList });
		});
	};
}

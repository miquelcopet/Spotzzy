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
				{this.state.items.map((item, key) => (
					<ListItem item={item} handleItemClicked={this.handleItemClicked}  key={key}/>
				))}
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

	handleItemClicked = (ownerId, playlistId) => {
		spotifyApi.getPlaylistTracks(ownerId, playlistId).then(response => {
			console.log(response);
		});
	};
}

import React, { Component } from "react";
import "./ListItemStyle.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

library.add(faFolder);
library.add(faMusic);

export class ListItem extends Component {
	render() {
		const isPlaylist = this.props.item.type === "playlist" ? true : false;
        const typeIcon = isPlaylist ? "folder" : "music";
        let secondaryText;
        if (isPlaylist) {
            secondaryText = <p className="list-artist">{this.props.item.tracksCount} tracks</p>;
        } else {
            secondaryText = <p className="list-artist">{this.props.item.artists[0].name}</p>;
        }

        let rightText;
        if (!isPlaylist) {
            rightText = <p>{this.millisToMinutesAndSeconds(this.props.item.duration)}</p>;
        } else {
            rightText = <p></p>;
        }

		return (
			<div className="holder" onClick={() => this.onClick()}>
				<div className="list-left">
					<FontAwesomeIcon icon={typeIcon} />
				</div>

				<div className="list-center">
					<p className="list-title">{this.props.item.name}</p>
                    {secondaryText}
				</div>

                <div className="list-right">
                    {rightText}
                </div>
			</div>
		);
	}

	onClick = () => {
        this.props.handleItemClicked(
            this.props.item.ownerId,
            this.props.item.id,
            this.props.item.type === "playlist" ? true : false);
	};
    
    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
}

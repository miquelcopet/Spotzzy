import React, { Component } from "react";
import "./ListItemStyle.css";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

library.add(faFolder);
library.add(faMusic);

export class ListItem extends Component {
	render() {
        const typeIcon = this.props.item.type === "playlist" ? "folder" : "music";

		return (
			<div className="holder" onClick={() => this.onClick()}>
				<div className="icon"> 
                    <FontAwesomeIcon icon={typeIcon}/>
                </div>
				<div>
					<p className="list-title">{this.props.item.name}</p>
					<p className="list-artist">{this.props.item.tracksCount} tracks</p>
				</div>
			</div>
		);
	}

	onClick = () => {
        this.props.handleItemClicked(this.props.item.ownerId, this.props.item.id);
	};
}

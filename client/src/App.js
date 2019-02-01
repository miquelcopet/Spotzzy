import React, { Component } from 'react';
import './App.css';
import {LoginButton} from './LoginButton'

import SpotifyWebApi from 'spotify-web-api-js';
import { SongDisplay } from './displays/SongDisplay';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }

    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { 
        name: "Name not checked", 
        album: {
          art: "https://music.uberchord.com/assets/images/png/placeholder-song.png",
          name: "",
          year: ""
        },
        artist: {
          name: ""
        },
        stats: {
          acoustiness: 0,
          energy: 0,
          instrumentalness: 0,
          danceability: 0
        }
      }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  
  getTrackData(trackId) {
    spotifyApi.getAudioFeaturesForTrack(trackId)
      .then((response) => {
          console.log(response);
      })
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              id: response.item.id,
              name: response.item.name, 
              album: {
                art: response.item.album.images[0].url,
                name: response.item.album.name,
                year: response.item.album.release_date
              },
              artist: {
                name: response.item.artists[0].name
              }
            }
        });

        this.getTrackData(response.item.id);
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet"></link>
        {isLoggedIn ? <LoginButton/> : <SongDisplay song={this.state.nowPlaying} />}
        {this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }
}

export default App;

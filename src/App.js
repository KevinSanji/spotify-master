import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  _search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/'
    const ACCESS_TOKEN = 'BQCSv5q0oMVu-whvY9993H2JQiqpULuTp_g53x-9LCZa2VkUE97ICmCsf0RurTEyI_sWmQNwNSnj6SjzJ9nY52QzjuXyfpPsZ7d4aHl2pT41MUGBLwS9wbPoOKnK-e0dJQ5pPsG1UfVcN-ObsCxJLxd6OC9OiyCLcbzA&refresh_token=AQBUIuAtraRZdcfb7V_br72X0LF2SW378gjdyFHPW-9aOCl1c8AKpyJA1hCmbCUNiEeRo9GESgEl9kyZLmwu_fwB2VpXUVNBkA1FJeBwsuAxITHhl6AzqVc63LxAIML8NP44Dg';
    var myHeaders = new Headers();

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + ACCESS_TOKEN
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        console.log('artist', artist);
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          console.log('artist\'s top tracks:', json);
          const { tracks } = json;
          this.setState({tracks})
        })
      });
  }

  render() {
    return (
      <div className='App'>
        <h1>Spotify Master</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='Search for an Artist'
              query={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this._search()
                }
              }}
            />
            <InputGroup.Addon onClick={() => this._search()}>
              <Glyphicon glyph='search'></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
                />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }
      </div>
    )
  }
}

export default App;

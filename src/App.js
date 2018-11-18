import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null
    }
  }

  _search() {
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ACCESS_TOKEN = 'BQAm7c4NpxVbLdCCl3Szg8SxvSOPMEMAm2E3RDlcHhUX0jgcE4Hy2CPcvdTWdpVTwcsF50iXRlbmjRN7vKW5EszkQ4ugkC6j5yFVOxC--KAYjVOMMkC_B7RDoHH7kREGD3WgdshJGeWbr7ndY9SqCO-9vqVDCCFwWc16&refresh_token=AQDGd4N1BKA-kfQis1wyBibECVJo8I6vvMkMwLMEF-ST5ors0vjpgaQqkp4ymlPbXjtFXaQQsbZJRUIswj96CPEc7wZCT3igVWt0PLmisR_ckGslZn-gbwFdYazGJu5xVUcs2A';
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
        <Profile
          artist={this.state.artist}
        />
        <div>
          Gallery
        </div>
      </div>
    )
  }
}

export default App;

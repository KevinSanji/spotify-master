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
    console.log('this.state', this.state)
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    console.log('FETCH_URL', FETCH_URL);
    const ACCESS_TOKEN = 'BQDi5C63DVfyPDZ-DzC6zoriHHDFAyYQE3cmkFb8dyIr53TkApZfZWGH1zFGCooC9FJlSQuj_98Tbj3_vZrwSEMjvMXA5EBy49lQRpGxWoF59mGy5JIBQhW2hxyM7ur9HecKnDdID5ebddLhTwCFayepEHGbD59uCbUY&refresh_token=AQCSlm16DQ1jZlTkMJIYilAeldQiEP7x-sdZP7SbR7aBXjj0Um7pSnIFYzMjE_aD3gHPpe8BKmJKyH1QIbFd5o4fEamZPc-hPL5C8YB4LjGiQU4pbic8TKNBJ0La5emExAhHAw';
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

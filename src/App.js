import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  _search() {
    console.log('this.state', this.state)
    const ACCESS_TOKEN = '#access_token=BQDkvCsR6hDQdILS-0fvLsxhTLy6SLqq__3kNasR8Dg3UOUUPzwCk-c8gEePxsEzrFVvvWfBETceBiNh4rkzaE4dFfoilo_CSlj_5rg4ZNiM_tl1wvYvzuz6H4UjD3pOaykyq7WE_fDcCZMTZwudbqq0m1Qs9fGO8q3S&refresh_token=AQAX4-pkjkRXKBGigUM_S1ml2wcTaKbMMOpjrHfqW76oaajn9UZ0OGKXEpPbHce3iNGLrtYkF1tnnIOwFACmSwBCQoBMGVULKIbVY9GIOVvct6P0LBGnlSC-70JZ1zy1YDIe9w'
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1' + ACCESS_TOKEN;
    console.log('FETCH_URL', FETCH_URL);
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
        <div>
          <div>Artist Picture</div>
          <div>Artist Name</div>
        </div>
        <div>
          Gallery
        </div>
      </div>
    )
  }
}

export default App;

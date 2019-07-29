import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {
  state = {
    albums: []
  }

  componentDidMount() {
    axios.get('/api/albums').then(resp => {
      this.setState({
        albums: resp.data
      })
    })
  }

  render() {
    return (
      <div>
        <header>
          <h1>My Albums</h1>
        </header>
        <div className="albumList">
          {this.state.albums.map(album => (
            <Link className="albumLink" to={"/album/" + album.id}>
              <img src={album.coverPhoto} />
              <h3>{album.name}</h3>
            </Link> 
          ))}
        </div>
      </div>
    )
  }
}

export default Home
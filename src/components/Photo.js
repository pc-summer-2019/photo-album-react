import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Photo extends Component {
  state = {
    name: '',
    url: '',
    albumId: '',
    left: '',
    right: ''
  }

  renderImage = (id) => {
    axios.get('/photos/' + id).then(resp => {
      this.setState({
        name: resp.data.name,
        url: resp.data.imgURL,
        albumId: resp.data.albumId
      })

      this.getPosition(id, resp.data.albumId)
    })
  }

  getPosition = (id, albumId) => {
    axios.get('/albums/' + albumId + '?_embed=photos').then(resp => {
      const ids = resp.data.photos.map(photo => photo.id)
      const curId = Number(id)
      const minId = Math.min(...ids)
      const maxId = Math.max(...ids)

      if (curId === maxId) {
        this.setState({
          right: minId,
          left: curId - 1
        })
      } else if(curId === minId) {
        this.setState({
          right: curId + 1,
          left: maxId
        })
      } else {
        this.setState({
          right: curId + 1,
          left: curId - 1
        })
      }
    })
  }

  componentDidMount() {
    this.renderImage(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    this.renderImage(newProps.match.params.id)
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.state.name}</h1>
          <Link to={"/album/" + this.state.albumId}>
            &lt; Back to Album
          </Link>
        </header>
        <div className="photo">
          <Link to={"/photo/" + this.state.left}>&lt;</Link>
          <img src={this.state.url} />
          <Link to={"/photo/" + this.state.right}>&gt;</Link>
        </div>
      </div>
    )
  }
}

export default Photo
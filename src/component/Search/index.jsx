import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class Search extends Component {
  search = () => {
    const { keyWordElement: { value: keyWord } } = this
    PubSub.publish("users", {
      isFirst: false,
      isLoading: true,
      err: ''
    })
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
      (response) => {
        PubSub.publish("users", {
          isLoading: false,
          result: response.data.items
        })
      },
      (error) => {
        PubSub.publish("users", {
          isLoading: false,
          err: error
        })
      }
    )
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-header">Search Github User</h3>
        <div>
          <input ref={c => this.keyWordElement = c} type="text" placeholder="Enter the name you search" style={{width:'200px'}}/>&nbsp;
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}

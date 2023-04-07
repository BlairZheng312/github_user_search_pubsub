import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        result: [],
        isFirst: true,
        isLoading: false,
        err: ''
    }

    componentDidMount() {
        this.token = PubSub.subscribe('users', (_, result) => {
            this.setState(result)
        })
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token)
    }

    render() {
        const { result, isFirst, isLoading, err } = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>Welcome, please enter username to search</h2> :
                        isLoading ? <h2>Loading</h2> :
                            err ? <h2 style={{ color: 'red' }}>{err.message}</h2> :
                                result.map((user) => {
                                    return (
                                        <div className="card" key={user.id}>
                                            <a href={user.html_url} target="_blank" rel="noreferrer">
                                                <img src={user.avatar_url} style={{ width: '100px' }} alt="avatar" />
                                            </a>
                                            <p className="card-text">{user.login}</p>
                                        </div>
                                    )
                                })
                }

            </div>
        )
    }
}

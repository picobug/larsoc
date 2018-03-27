import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Example extends Component {
    constructor(props) {
        super(props)
        this.state = {
            graph: 'https://graph.facebook.com',
            ig: {},
            token:
                'EAACEdEose0cBAMpSxhwfaApTPRJZAoDfGnUATgY4edzBj9PZADvSzJBqRn2LzYQzSN6tzqZAFmQWWbR5GhXKUa9rSO0uviy1SaxZA7v8vtcieQ6BZCq0TziIpZACNFgZAOOdWaRZAF8uO19NPUQaj4OXguvSeZCIbUfiLxcR6q8ahLFy0ni04YYUuJjBj7IrlwmeajvohaQtGXAZDZD',
            data: []
        }
    }
    componentDidMount() {
        axios
            .get(`${this.state.graph}/me/accounts`, {
                params: {
                    access_token: this.state.token
                }
            })
            .then(r => this.setState({ data: r.data.data }))
            .catch(err => console.log(err))
    }
    getDetail(item) {
        axios
            .get(`${this.state.graph}/${item.id}`, {
                params: {
                    access_token: this.state.token,
                    fields: 'instagram_business_account'
                }
            })
            .then(r => this.setState({ ig: r.data.instagram_business_account }))
            .catch(err => console.log(err))
    }
    getlist() {
        let ig = this.state.ig
        axios
            .get(`${this.state.graph}/${ig.id}`, {
                params: {
                    access_token: this.state.token,
                    fields: 'name'
                }
            })
            .then(r => this.setState({ ig: r.data }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">
                                I'm an example component!
                                <ul>
                                    {this.state.data.map((item, key) => (
                                        <li
                                            key={key}
                                            onClick={e => this.getDetail(item)}
                                        >
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="card-footer">
                                {this.state.ig.id && (
                                    <p onClick={e => this.getlist()}>
                                        Test Click
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'))
}

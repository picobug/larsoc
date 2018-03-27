import React from 'react'
import axios from 'axios'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token:
                'EAACEdEose0cBAMpSxhwfaApTPRJZAoDfGnUATgY4edzBj9PZADvSzJBqRn2LzYQzSN6tzqZAFmQWWbR5GhXKUa9rSO0uviy1SaxZA7v8vtcieQ6BZCq0TziIpZACNFgZAOOdWaRZAF8uO19NPUQaj4OXguvSeZCIbUfiLxcR6q8ahLFy0ni04YYUuJjBj7IrlwmeajvohaQtGXAZDZD',
            graph: 'https://graph.facebook.com',
            pages: [],
            ig: {}
        }
    }
    getPages() {
        axios
            .get(`${this.state.graph}/me/accounts`, {
                params: {
                    access_token: this.state.token
                }
            })
            .then(r => this.setState({ pages: r.data.data }))
            .catch(err => console.log(err))
    }
    getIg(page) {
        axios
            .get(`${this.state.graph}/${page.id}`, {
                params: {
                    access_token: this.state.token
                }
            })
            .then(r => this.setState({ ig: r.data.instagram_business_account }))
            .catch(err => console.log(err))
    }
    getDetailIg() {}
    render() {
        return (
            <p>
                Lorem <sub>Ipsum</sub>
            </p>
        )
    }
}

import React from 'react'
import axios from 'axios'

import ListPage from '@js/components/ListPage'
import Instagrab from '@js/components/Instagrab'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            graph: 'https://graph.facebook.com',
            pages: [],
            ig: {}
        }
        this.getIg = this.getIg.bind(this)
        this.getPages = this.getPages.bind(this)
        this.getDetailIg = this.getDetailIg.bind(this)
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
                    access_token: this.state.token,
                    fields: 'instagram_business_account'
                }
            })
            .then(r => this.setState({ ig: r.data }))
            .catch(err => console.log(err))
    }
    getDetailIg(id, fields, name) {
        name = name || 'fields'
        let params = {
            access_token: this.state.token
        }
        if (fields) {
            params[name] = fields
        }
        return axios.get(`${this.state.graph}/${id}`, {
            params: params
        })
    }
    render() {
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column">
                        <ListPage
                            {...this.state}
                            getIg={this.getIg}
                            getPages={this.getPages}
                        />
                    </div>
                </div>
                {this.state.ig.instagram_business_account && (
                    <Instagrab {...this.state} getDetailIg={this.getDetailIg} />
                )}
            </React.Fragment>
        )
    }
}

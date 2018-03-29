import React from 'react'

import ListIg from './ListIg'

export default class Instagrab extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: {},
            media: []
        }
    }
    componentDidMount() {
        this.getInfo()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.ig.id !== this.props.ig.id) {
            this.getInfo()
        }
    }
    getIgID() {
        let id = this.props.ig.instagram_business_account.id
        return id
    }
    getInfo() {
        let fields =
            'biography,id,ig_id,followers_count,follows_count,media_count,name,profile_picture_url,username,website'
        this.props
            .getDetailIg(this.getIgID(), fields)
            .then(r => this.setState({ detail: r.data }))
            .catch(err => console.log(err))
        this.props
            .getDetailIg(`${this.getIgID()}/media`, '')
            .then(r => this.setState({ media: r.data.data }))
            .catch(err => console.log(err))
    }
    getValue(target) {
        let result = null
        let detail = this.state.detail
        if (detail) {
            result = detail[target]
        }
        return result
    }
    render() {
        return (
            <div className="columns">
                <div className="column">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-header-title">
                                Instagram Detail
                            </h4>
                        </div>
                        <div className="card-image">
                            <figure className="image">
                                <img
                                    src={this.getValue('profile_picture_url')}
                                    alt={this.getValue('name')}
                                />
                            </figure>
                        </div>
                        <div className="card-content">
                            <h4 className="has-text-centered">
                                {this.getValue('name')}
                            </h4>
                        </div>
                        <div className="card-footer">
                            <p className="card-footer-item">
                                Follower {this.getValue('followers_count')}
                            </p>
                            <p className="card-footer-item">
                                Follow {this.getValue('follows_count')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="column is-three-quarters">
                    <div className="columns is-multiline">
                        {this.state.media.map((media, key) => (
                            <ListIg
                                key={key}
                                detail={this.state.detail}
                                {...this.props}
                                media={media}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

import React from 'react'
import Insight from './Insight'

export default class ListIg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            detail: {}
        }
    }
    componentDidMount() {
        this.getMedia()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.media.id !== this.props.media.id) {
            this.getMedia()
        }
    }
    getIg() {
        return this.props.media.id
    }
    getMedia() {
        let fields =
            'media_type,media_url,owner,permalink,shortcode,timestamp,caption'
        this.props
            .getDetailIg(this.getIg(), fields)
            .then(r => this.setState({ detail: r.data }))
            .catch(err => console.log(err))
    }
    getMediaDetail() {
        this.props.getDetailIg(this)
    }
    renderMedia() {
        let detail = this.props.detail
        return (
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img
                            src={detail.profile_picture_url}
                            alt={detail.name}
                        />
                    </figure>
                </div>
                <div className="media-content" style={{ overflow: 'hidden' }}>
                    <p className="title is-4">{detail.name}</p>
                    <p className="subtitle is-6">@{detail.username}</p>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="column is-half">
                <div className="card">
                    <div className="card-image">
                        <figure className="image">
                            <img
                                src={this.state.detail.media_url}
                                alt={this.props.detail.name}
                            />
                        </figure>
                    </div>
                    <div className="card-content">
                        {this.renderMedia()}
                        <div className="content">
                            <p>{this.state.detail.caption}</p>
                            <p>{this.state.detail.timestamp}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <Insight {...this.props} />
                    </div>
                </div>
            </div>
        )
    }
}

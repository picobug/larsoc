import React from 'react'

export default class ListPage extends React.Component {
    componentDidMount() {
        this.props.getPages()
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="card-header-title">List Page Available</h4>
                </div>
                <div className="card-footer">
                    {this.props.pages.map((page, key) => (
                        <a
                            key={key}
                            onClick={e => this.props.getIg(page)}
                            className="card-footer-item"
                        >
                            {page.name}
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}

import React from 'react'

export default class Insight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            insights: []
        }
    }
    componentDidMount() {
        this.getInsight()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.media.id !== this.props.media.id) {
            this.getInsight()
        }
    }
    getInsight() {
        let id = this.props.media.id
        this.props
            .getDetailIg(
                `${id}/insights`,
                'engagement,impressions,reach',
                'metric'
            )
            .then(r => this.setState({ insights: r.data.data }))
            .catch(err => console.log(err))
    }
    getTotal(values) {
        let total = 0
        values.map(val => (total += val.value))
        return total
    }
    render() {
        return (
            <React.Fragment>
                {this.state.insights.map((insight, key) => (
                    <p key={key} className="card-footer-item">
                        {insight.name} : {this.getTotal(insight.values)}
                    </p>
                ))}
            </React.Fragment>
        )
    }
}

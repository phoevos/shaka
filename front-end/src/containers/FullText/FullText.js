import React, {Component} from 'react'
import axios from '../../axios'

class FullText extends Component {
    state = {
        title: "", 
        publish_time: "",
        authors: "",
        text: ""
    }

    componentDidMount() {
        console.log(this.props.match);
        axios.get('/text' + this.props.match.id)
        .then(res => {
            console.log(res.data)
            this.setState({ 
                title: res.data.title,
                publish_time: res.data.publish_time,
                authors: res.data.authors,
                text: res.data.text_id.text 
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    backHandler = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div>{this.state.text}</div>
                <button onClick={this.backHandler}>X</button> 
            </div>
        )
    }
}

export default FullText
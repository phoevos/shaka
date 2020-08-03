import React, {Component} from 'react'
import axios from '../../axios'
import Result from '../../components/ResultArray/Result/Result'

class FullText extends Component {
    state = {
        title: "", 
        publish_time: "",
        authors: "",
        text: ""
    }

    componentDidMount() {
        axios.get('/text/' + this.props.match.params.id)
        .then(res => {
            console.log(res.data)
            this.setState({ 
                title: res.data.title,
                publish_time: res.data.publish_time,
                authors: res.data.authors,
                text: res.data.text 
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
                <button className='Button' onClick={this.backHandler}>Return to search page</button> 
                <div className='Results'>
                    <Result title={this.state.title} 
                            authors={this.state.authors} 
                            abstract={this.state.text} 
                            publish_time={this.state.publish_time}
                            full={true}
                    />
                </div>
            </div>
            
        )
    }
}

export default FullText
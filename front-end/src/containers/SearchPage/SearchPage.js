import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import ResultArray from '../../components/ResultArray/ResultArray'
import axios from '../../axios'
import './SearchPage.css'

class SearchPage extends Component {
    state = {
        results: [],
        selectedTextId: null,
        drug: ""
    }

    componentDidMount() {
        
    }

    selectedTextHandler = (id) => {
        this.setState({ selectedTextId: id })
    }

    typingHandler = (e) => {
        this.setState({drug: e.target.value})
    }

    searchDrugHandler = (e) => {
        axios.get('/' + this.state.drug)
            .then(res => {
                this.setState({ results: res.data })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    render () {        
        return (
            <Aux>
                <div >
                    <form onSubmit={e => e.preventDefault()}>
                    <input 
                        className='Search'
                        type='text'
                        size='45'
                        placeholder='Search for a drug...'
                        onChange={this.typingHandler.bind(this)}
                        value={this.state.drug} />
                    <button 
                        className='Button'
                        type='submit'
                        onClick={this.searchDrugHandler.bind(this)}>
                        Search
                    </button>
                    </form>
                </div>
                <ResultArray articles={this.state.results} selected={this.selectedTextHandler}/> 
            </Aux>
        )
    }
}

export default SearchPage
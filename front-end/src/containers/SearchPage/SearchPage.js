import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'
import ResultArray from '../../components/ResultArray/ResultArray'
import axios from '../../axios'
import './SearchPage.css'

class SearchPage extends Component {
    state = {
        results: [],
        selectedTextId: null,
        drug: "",
        lastSearch: "",
        page: 1
    }

    componentDidMount() {
        
    }

    selectedTextHandler = (id) => {
        this.setState({ selectedTextId: id })
    }

    typingHandler = (e) => {
        this.setState({drug: e.target.value})
    }

    searchDrugHandler = () => {
        const drug = this.state.drug
        const page = this.state.page
        axios.get('/' + drug + '/' + page)
            .then(res => {
                this.setState({ results: res.data, lastSearch: drug})
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    // rightHandler = () => {
    //     let page = this.state.page
    //     page++
    //     this.setState({page: page})
    //     this.searchDrugHandler()
    // }

    // leftHandler = () => {
    //     let page = this.state.page
    //     if(page > 1) page--
    //     this.setState({page: page})
    //     this.searchDrugHandler()
    // }

    render () {      
        // let pages = null
        // if(this.state.lastSearch) {
        //     pages = <div className= 'btn-group'>
        //                 <button type='submit' onClick={this.leftHandler}>-</button>
        //                 <button>{this.state.page}</button>
        //                 <button type='submit' onClick={this.rightHandler}>+</button>
        //             </div> 
        // }
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
                <ResultArray articles={this.state.results} selected={this.selectedTextHandler} searchedFor={this.state.lastSearch}/> 

            </Aux>
        )
    }
}

export default SearchPage
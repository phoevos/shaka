import React, {Component} from 'react'
import axios from '../../axios'
import Aux from '../../hoc/Auxiliary'
import ResultArray from '../../components/ResultArray/ResultArray'
import Result from '../../components/ResultArray/Result/Result'
import { Bar } from 'react-chartjs-2'
import './SearchPage.css'
import cov from '../../assets/CORD-19_3.svg'

class SearchPage extends Component {
    state = {
        results: [],
        selectedTextId: null,
        drug: "",
        lastSearch: "",
        page: 1,
        tab: 0,
        year: 2020,
        month: false,
        listOpen: false,
        hasText: false
    }

    componentDidMount() {
        const drug = this.props.match.params.drug
        const page = 1
        if(drug) {
            axios.get('/search/' + drug + '/' + page)
            .then(res => {
                this.setState({ results: res.data, drug: drug, lastSearch: drug, page: page, tab: 1 })
            })
            .catch(err => {
                console.log(err.message)
            })
        }
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
        axios.get('/search/' + drug + '/' + page)
            .then(res => {
                this.setState({ results: res.data, lastSearch: drug, page: page, tab: 1 })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    filterSwitchHandler = () => {
        const hasText = this.state.hasText
        this.setState({hasText: !hasText})
    }

    rightHandler = () => {
        const drug = this.state.drug
        let page = this.state.page
        page = page + 1
        axios.get('/search/' + drug + '/' + page)
            .then(res => {
                this.setState({ results: res.data, lastSearch: drug, page: page })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    leftHandler = () => {
        const drug = this.state.drug
        let page = this.state.page
        if(page > 1) {
            page = page - 1
            console.log(this.state);
            axios.get('/search/' + drug + '/' + page)
                .then(res => {
                    this.setState({ results: res.data, lastSearch: drug, page: page })
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    toggleHandler = () => {
        const drug = this.state.drug
        const tab = this.state.tab
        const page = this.state.page
        let path = '/'
        let newTab = 0
        if (tab === 1) {
            newTab = 2
            path += 'chart/' + drug
        }
        else if (tab === 2) {
            newTab = 1
            path += 'search/' + drug + '/' + page
        } 
        axios.get(path)   
            .then(res => {
                this.setState({results: res.data, tab: newTab})
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    monthYearHandler = () => {
        const month = this.state.month
        this.setState({month: !month})
    }

    toggleList = () => {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }))
    }

    changeYearHandler = (i) => {
        this.setState({year: i, listOpen: false})
    }

    render () {
        let output = null
        switch(this.state.tab){
            case 0:
                output = <img src={cov} alt='covid'/>
                break;
            case 1:
                output = <div>
                            <button className='Button' type='submit' onClick={this.toggleHandler}> Click to view chart</button>
                            {this.state.hasText ? 
                                <button className='Button' type='submit' onClick={this.filterSwitchHandler}> Show all</button> 
                                    : <button className='Button' type='submit' onClick={this.filterSwitchHandler}> Only show articles with available text</button> }
                            <br></br>
                            <br></br>

                            <button className='previous round' type='submit' onClick={this.leftHandler}>&#8249;</button>
                            <button className='Button' style={{backgroundColor: "white"}}>{this.state.page}</button>
                            <button className='next round' type='submit' onClick={this.rightHandler}>&#8250;</button>
                            
                            <ResultArray 
                                articles={this.state.results} 
                                selected={this.selectedTextHandler} 
                                searchedFor={this.state.lastSearch}
                                hasText={this.state.hasText}
                                /> 
                        </div>
                break;
            case 2:
                if(!this.state.month){
                    const transformed = this.state.results.reduce((arr, el) => {
                        const year = el._id.split('-')[0]
                        arr[2020-year] += el.count
                        return arr
                    }, [...Array(70).fill(0)])
                    let xAxis = []
                    let yAxis = []
                    transformed.forEach((e,i) => {
                        if(e > 0) {
                            xAxis.push(2020-i)
                            yAxis.push(e)
                        }
                    })
    
                    const config = {
                        labels: xAxis,
                        datasets: [
                            {
                                label: 'Publications per year',
                                backgroundColor: 'rgba(51, 51, 51, 1)',
                                borderColor: 'rgba(51, 51, 51, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgb(151, 216, 207, 1)',
                                hoverBorderColor: 'rgb(151, 216, 207, 1)',
                                data: yAxis
                            }
                        ]
                    };
                    const chart =
                        <Bar
                            data={config}
                            width={100}
                            height={500}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }}
                        />
                                    
                    output = (  <div>
                                    <button className='Button' type='submit' onClick={this.toggleHandler}> Click to view articles</button>
                                    <button className='Button' type='submit' onClick={this.monthYearHandler}> Show by month</button>
                                    <div className='Results'>
                                        <Result abstract={chart} full={true}></Result> 
                                    </div>
                                </div>)
                }
                else {
                    const extract = this.state.results.reduce((arr, el) => {
                        const year = el._id.split('-')[0]
                        arr[2020-year] += el.count
                        return arr
                    }, [...Array(70).fill(0)])
                    let years = []
                    extract.forEach((e,i) => {
                        if(e > 0) {
                            years.push(2020-i)
                        }
                    })
                    const transformed = this.state.results.reduce((arr, el) => {
                        const splits = el._id.split('-', 2)
                        if(splits[0] == this.state.year) {
                            if(splits[1]) arr[parseInt(splits[1]) - 1] += el.count
                        }
                        return arr
                    }, [...Array(12).fill(0)])
                    let xAxis = []
                    let yAxis = []
                    transformed.forEach((e,i) => {
                        if(e > 0) {
                            xAxis.push(i+1)
                            yAxis.push(e)
                        }
                    })
    
                    const config = {
                        labels: xAxis,
                        datasets: [
                            {
                                label: 'Publications per month (' + this.state.year + ')',
                                backgroundColor: 'rgba(51, 51, 51, 1)',
                                borderColor: 'rgba(51, 51, 51, 1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgb(151, 216, 207, 1)',
                                hoverBorderColor: 'rgb(151, 216, 207, 1)',
                                data: yAxis
                            }
                        ]
                    };
                    const chart =
                        <Bar
                            data={config}
                            width={100}
                            height={500}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }}
                        />
                                    
                    output = (  <div>
                                    <button className='Button' type='submit' onClick={this.toggleHandler}> Click to view articles</button>
                                    <button className='Button' type='submit' onClick={this.monthYearHandler}> Show by year</button>
                                    
                                    <div className="dropdown">
                                        <button className="dropbtn" onClick={() => this.toggleList()} >{this.state.year}</button>
                                        <div className="dropdown-content">
                                        {years.map((i) => (
                                                <div key={i} onClick={()=>this.changeYearHandler(i)}>{i}</div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className='Results'>
                                        <Result abstract={chart} full={true}></Result> 
                                    </div>
                                </div>)
                }
                
                break;
            default:
                output = <div>Well, something must have gone terribly wrong.</div>
        }
        
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
                {output}
            </Aux>
        )
    }
}

export default SearchPage
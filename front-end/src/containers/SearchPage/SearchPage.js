import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary'

class SearchPage extends Component {
    render () {
        return (
            <Aux>
                <input type='text'/>
                <div>Results</div>
            </Aux>
        )
    }
}

export default SearchPage
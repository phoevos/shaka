import React from 'react'
import './Result.css'

const result = (props) => {

    let abstract = <div className="Abstract">{props.abstract}</div>
    
    return(
        <article className="Article" >
            <h1>{props.title}</h1>
            <div className="Author">{props.authors}</div>
            {abstract}
            <div className="Date">{props.publish_time}</div>
        </article>
    )
}

export default result
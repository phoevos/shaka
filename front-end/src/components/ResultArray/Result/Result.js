import React from 'react'
import './Result.css'

const result = (props) => {

    let text = (props.textAvailable) ? <h1>CLICK TO READ THE ARTICLE.</h1>
                                        : <h1 style={{color: "red"}}>FULL ARTICLE IS NOT AVAILABLE.</h1>
    if(props.full) text = ""
    return(
        <article className="Article" >
            <h2>{props.title}</h2>
            <div className="Author">{props.authors}</div>
            <div className="Abstract">{props.abstract}</div>
            <br></br>
            {text}
            <div className="Date">{props.publish_time}</div>
        </article>
    )
}

export default result
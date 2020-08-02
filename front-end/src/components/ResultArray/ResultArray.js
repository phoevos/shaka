import React from 'react'
import { Link } from 'react-router-dom'
import Result from './Result/Result'
import './ResultArray.css'

const resultArray = (props) => {
    let articles = <p style={{textAlign: 'center'}}>Something went wrong!</p>

    articles = props.articles.map(article => {

        if(!article.text_id) return (
            <div key={article._id} >
                <Result
                    title={article.title}
                    authors={article.authors}
                    publish_time={article.publish_time}
                    abstract={article.abstract}
                />
            </div>
        )
        
        return (<Link to={"/article/" + article.text_id} key={article.text_id} style={{ textDecoration: 'none' }}>
            <Result
                title={article.title}
                authors={article.authors}
                publish_time={article.publish_time}
                abstract={article.abstract}
                clicked={() => props.selected(article.text_id)}

            />
        </Link>)
    })

    return (
        <section className="Results">
            {articles}
        </section>
    )
}

export default resultArray
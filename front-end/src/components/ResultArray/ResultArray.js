import React from 'react'
import { Link } from 'react-router-dom'
import Result from './Result/Result'
import './ResultArray.css'

const resultArray = (props) => {
    let articles = <p style={{textAlign: 'center'}}>Something went wrong!</p>

    articles = props.articles.map(article => {

        if(!article.textExists && !props.hasText) return (
            <div key={article._id} >
                <Result
                    title={article.title}
                    authors={article.authors}
                    publish_time={article.publish_time}
                    abstract={article.abstract}
                    textAvailable={false}
                />
            </div>
        )
        else if (article.textExists) return (
            <Link to={'/article/' + props.searchedFor + '/' + article._id} key={article._id} style={{ textDecoration: 'none' }}>
                <Result
                    title={article.title}
                    authors={article.authors}
                    publish_time={article.publish_time}
                    abstract={article.abstract}
                    textAvailable={true}
                    clicked={() => props.selected(article._id)}
                />
            </Link>)      
        else return null
    })

    return (
        <section className="Results">
            {articles}
        </section>
    )
}

export default resultArray
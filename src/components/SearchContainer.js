
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'


export class SearchContainer extends Component {
   
 
    static propTypes = {
        searchterm: PropTypes.string,
        
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            placeholder:"search",
        }

    }
     async component()  {
        let url = `https://newsapi.org/v2/everything?q=${this.props.searchterm}&apiKey=c544b22c88ae484c9786d71253655d3f`;
        let data = await fetch(url);
        let parsedData = await data.json();

        // Update the component's state with the search results and display them in the list
        this.setState({ articles: parsedData.articles });

    }
    render() {
        console.log("hello",this.props.searchterm)
        return (
            <div>
                <div className="container border my-3 ">

                    <h1 className="text-center" style={{ margin: '35px 0px', fontFamily: "Petit Formal Script" }}>{this.props.headline}</h1>
                    <hr className="border border-dark opacity-50"></hr>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-6 col-lg-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 111) : "There is no title avialable for this article!"} description={element.description ? element.description.slice(0, 88) : "There is no description avialable for this article!"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>

                </div>
            </div>
        )
    }
}

export default SearchContainer
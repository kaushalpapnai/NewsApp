import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchterm : "",
            articles: [],
            placeholder:"search",
        }

    }


    async componentDidMount() {
        let url = `
        https://newsapi.org/v2/everything?q=tesla&from=2022-12-08&sortBy=publishedAt&apiKey=34107504262e445bbd6e1b9cf4d7f481`
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    } 

      handleChange = (event)=>{
        const searchterm = event.target.value;
          this.setState({ searchterm });
          this.getarticles(searchterm);
      }

      onSearch = async (element)=>{
        let url = `https://newsapi.org/v2/everything?q=${this.state.searchterm}&apiKey=34107504262e445bbd6e1b9cf4d7f481`;
        let data = await fetch(url);
        let parsedData = await data.json();
      
        // Update the component's state with the search results and display them in the list
        this.setState({ articles: parsedData.articles });

      }

      updatesearchterm = (term) => {
        //   console.log("search",term)
        this.setState({ searchterm: term, articles: [] });
      }

    render() {
        // const {searchterm}=this.state 
        const { searchterm } = this.state;

        return (
            

            <>
                <form className="d-flex container mt-3 col-md-6 col-lg-6 col-11 mx-auto my-auto " role="search" >
                    <input className="form-control me-2 overflow-hidden" value ={searchterm} onChange={this.handleChange} type="text" placeholder={this.state.placeholder} aria-label="Search" />
                    <button className="btn btn-outline-success " onClick={()=>this.onSearch(this.state.searchterm)} type="submit" >heloo</button>   
                </form>
                <div className='container text-center  shadow-lg rounded-5 w-50'>   
                  
                        <div>
                        <ul>
                          {this.state.articles
                            .filter(item => 
                               this.state.searchterm.toLowerCase() && item.title.toLowerCase().includes(this.state.searchterm.toLowerCase()))
                            .map(item => <li onClick={()=>this.updatesearchterm(item.title)}  key={item.url}>{item.title}</li>)}
                        </ul>
                      </div>

                </div>

                
                <div className="container border my-3 ">

                    <h1 className="text-center" style={{ margin: '35px 0px', fontFamily: "Petit Formal Script" }}>{this.state.headline}</h1>
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
            </>
        )
    }
}

export default Search

import React, { Component } from 'react';
import NewsItem from './NewsItem';

class SearchFilter extends Component {
  state = {
    searchText: '',
    articles: [],
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = async (event) => {
    this.setState({ searchText: event.target.value });
    const response = await fetch(`https://newsapi.org/v2/everything?q=${event.target.value}&sortBy=relevancy&apiKey=c544b22c88ae484c9786d71253655d3f`);
    const data = await response.json();
    this.setState({ suggestions: data.articles.map(article => article.title) });
  }

  handleSubmit = async (event) => {
    console.log("hello",this.state.searchText)
    let url = `https://newsapi.org/v2/everything?q=${this.state.searchText}&from=2022-12-09&sortBy=publishedAt&apiKey=c544b22c88ae484c9786d71253655d3f`;
    let data = await fetch(url);
    let parsedData = await data.json();
  
    // Update the component's state with the search results and display them in the list
    this.setState({ articles: parsedData.articles });
    console.log("articles",this.state.articles)
  }

  selectSuggestion = (suggestion) => {
    this.setState({ searchText: suggestion, suggestions: [] });
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.searchText}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={()=> this.handleSubmit(this.state.searchText)}>Search</button>
        </form>
        {this.state.suggestions.length > 0 && (
          <ul>
            {this.state.suggestions.slice(0,8).map(suggestion => (
              <li key={suggestion} onClick={() => this.selectSuggestion(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
           <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-6 col-lg-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 111) : "There is no title avialable for this article!"} description={element.description ? element.description.slice(0, 88) : "There is no description avialable for this article!"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
      </div>
    );
  }
}

export default SearchFilter;


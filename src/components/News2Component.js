import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News2Component extends Component {

constructor(){
    super()
    this.state = {
        articles : [],
        loading : false,
        page:1
    }
}

async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc9e81600eb44595bbee07a92a303197&page=1&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData)
  this.setState({articles: parsedData.articles, totalResults : parsedData.totalResults})
}


handlePrevClick= async ()=>{
    console.log("previous click")
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc9e81600eb44595bbee07a92a303197&page=${this.state.page - 1}&pageSize =${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({
        page : this.state.page - 1,
        articles: parsedData.articles,
    })
}

handleNextClick = async ()=>{  
  console.log("next click")

  if( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))
  {

  }
 else {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cc9e81600eb44595bbee07a92a303197&page=${this.state.page + 1}&pageSize =${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();

  this.setState({
    page : this.state.page + 1,
    articles: parsedData.articles,
  })
}
}
  render() {
    return (
      <div className='container my-3'>
        <h2>EagleNews  -  Top Headlines</h2>
        <div className='row'>
        {this.state.articles.map((element)=>{
           return  <div className='col-md-6 col-lg-4 ' key = {element.url}>
            <NewsItem  title = {element.title?element.title.slice(0,111):"There is no title avialable for this article!"} description = {element.description?element.description.slice(0,88):"There is no description avialable for this article!"} imageUrl = {element.urlToImage} newsUrl= {element.url} />
        </div> 
        })}
        <div className="container d-flex justify-content-between">
        <button disabled ={this.state.page <= 1} type="button" className="btn btn-dark "onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
        </div>
      </div> 
    )
  }
}

export default News2Component

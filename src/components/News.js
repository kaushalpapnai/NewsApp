
import React, { useEffect, useLayoutEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";



<style>
    @import url('https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap');
</style>

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [hasMore, setHasMore] = useState(true)


    const componentDidMount = async () => {
        props.setProgress(0)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        componentDidMount();
    }, [])



    const fetchMoreData = async () => {
        console.log("pagenumber", page)
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log("parsed data is", parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)

    };

    return (
        <>

            <h1 className="text-center " style={{ margin: '35px 0px',marginTop:"90px" , fontFamily: "Petit Formal Script" }}>{props.headline}</h1>
            <hr className="border border-dark opacity-50"></hr>
            {/* {loading && <Spinner />} */}
            <InfiniteScroll
                key={articles.publishedAt}
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className='container' key={articles.url}>
                    <div className="row">
                        {articles.map((element, index) => {
                            return <div className="col-md-6 col-lg-4" key={index}>
                                <NewsItem title={element.title ? element.title.slice(0, 111) : "There is no title avialable for this article!"} description={element.description ? element.description.slice(0, 88) : "There is no description avialable for this article!"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    headline: "Eagle Eye - Top Headlines",
    page: 1,
    // search: "NDTV"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    headline: PropTypes.string,
}


export default News
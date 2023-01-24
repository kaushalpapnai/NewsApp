import React  from 'react'
import defaultimg from './default-img.png'



const  NewsItem =(props)=>{

        let { title, description, imageUrl, newsUrl,author,date,source} = props;
        return (
            <div >
                <div className="card my-3 border-0" style={{ height: 550 }}>
                    <img style={{ height: 200 , borderRadius:10}} src={!imageUrl?defaultimg:imageUrl} alt = "NO  SOURCE IMG" />
                    <div className="card-body" >
                        <h5 className="card-title" style={{ height: 120 }} >{title} <span className="badge bg-secondary">{source}</span></h5>
                        {/* <h5>Example heading <span className="badge bg-secondary">New</span></h5> */}
                        <p className="card-text" style={{ height: 60 }} >{description}...</p>
                        <p className="card-text mt-3"  style={{ height: 40 }}><small className="text-muted">By {!author?"Unkown":author.slice(0,25)} on {new Date(date).toGMTString()}</small></p>
                        <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem

import React from 'react';

const NewsComponent = (props) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <img src={props.imageUrl} alt={props.title} />
      <a href={props.newsUrl}>Read more</a>
      <p>Author: {props.author}</p>
      <p>Date: {props.date}</p>
      <p>Source: {props.source}</p>
    </div>
  );
}

export default NewsComponent;

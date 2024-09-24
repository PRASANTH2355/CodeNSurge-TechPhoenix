import React from "react";
import './../Card1/card1.css';

function Card1(props) {
  return (
    <div
      className="news-card"
      style={{ backgroundImage: `url(${props.imgUrl})` }} // Parallax effect background image
    >
      <div className="news-card-content">
        <b className="news-card-title">{props.title}</b>

        <div className="news-card-description">
          <p>{props.description?.substring(0, 2000)}</p>
        </div>

        <div className="news-card-info">
          <div className="news-source-info">
            <span>Source:</span>
            <a href={props.url} target="_blank" rel="noopener noreferrer" className="news-source-link">
              {props.source?.substring(0, 300)}
            </a>
          </div>

          <div className="news-origin-info">
            <p><span>Author:</span> {props.author || 'N/A'}</p>
            <p><span>Published At:</span> {props.publishedAt || 'Unknown'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card1;

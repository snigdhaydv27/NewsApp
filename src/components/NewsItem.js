import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    const cardStyle = {
      height: "470px",
    };
    const publish = {
      position: "absolute",
      bottom: "35px",
    };
    const btnStyle = {
      position: "absolute",
      bottom: "12px",
    };

    let { title, description, imageUrl, newsUrl,date, source } =
      this.props;

    return (
      <div className="container my-3">
        <div className="card" style={cardStyle}>
          <img
            src={
              !imageUrl
                ? "https://static.toiimg.com/thumb/msid-82217908,width-1070,height-580,imgsize-264639,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="News"
            style={{ height: "185px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text" style={publish}>
            <span className="badge bg-danger">{source}</span><br></br>
              <small className="text-muted">
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
              style={btnStyle}
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;

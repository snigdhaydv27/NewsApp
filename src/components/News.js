import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "nz",
    category: "general",
  };
  
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${
      this.props.category[0].toUpperCase() + this.props.category.slice(1)
    } - Fatafat-News`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    try {
      this.props.setProgress(10);
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9af6cfa29104da682d6fce673aeb7ed&pageSize=9&page=${this.state.page}`;
      const response = await fetch(url);
      const parsedData = await response.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.props.setProgress(100);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    try {
      this.props.setProgress(10);
      this.setState({ loading: true });
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b9af6cfa29104da682d6fce673aeb7ed&pageSize=9&page=${this.state.page + 1}`;
      const nextPage = this.state.page + 1;
      const response = await fetch(url);
      const parsedData = await response.json();
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles || []),
        page: nextPage,
        totalResults: parsedData.totalResults || prevState.totalResults,
        loading: false,
      }));
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching more news:", error);
      this.props.setProgress(100);
      this.setState({ loading: false });
     
    }
  };

  render() {
    const { articles, totalResults} = this.state;

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:"65px 0px 10px 0px"}}>
          Top{" "}
          {this.props.category[0].toUpperCase() + this.props.category.slice(1)}{" "}
          Headlines
        </h1>
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;

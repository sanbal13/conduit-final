/* CSS is not proper */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';
import '../style/post.css';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
  };
  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articlesURL + '/' + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  }
  render() {
    const { article, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (!article) {
      return <Loader />;
    }
    return (
      <article className="single-post">
        <header className="post-banner">
          <div className="container">
            <h1 className="post-title">{article.title}</h1>
            <div className="flex item-center justify-start">
              <Link to={`/userProfile/${article.author.username}`}>
                <img
                  src={article.author.image}
                  alt="author"
                  className="profile-image"
                />
              </Link>
              <div className="post-details">
                <Link to="/profile">
                  <p className="post-author">{article.author.username}</p>
                </Link>
                <time className="post-time" dateTime="">
                  {article.createdAt}
                </time>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="single-post-body padding">{article.body}</div>
        </div>
        <footer className="padding text-center post-footer">
          <div className="container">
            {!this.props.user ? (
              <p>
                <Link to="/login">Sign in</Link> or
                <Link to="/signup"> Sign up</Link> to add comments on this
                article.
              </p>
            ) : (
              ''
            )}
          </div>
        </footer>
      </article>
    );
  }
}
export default withRouter(SinglePost);

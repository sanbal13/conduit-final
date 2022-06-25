/* CSS is not proper */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { articlesURL, profileURL } from '../utils/constant';
import Loader from './Loader';
import '../style/post.css';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
    comment: '',
    allComments: [],
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
        this.setState(
          {
            article: data.article,
            error: '',
          },
          () => {
            /* Fetching Comments for the article */
            fetch(`${articlesURL}/${this.state.article.slug}/comments`)
              .then((res) => {
                if (!res.ok) {
                  return res.json().then(({ errors }) => {
                    return Promise.reject(errors);
                  });
                }
                return res.json();
              })
              .then(({ comments }) => this.setState({ allComments: comments }))
              .catch((error) => console.log(error));
          }
        );
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch article' });
      });
  }
  handleComment = (event) => {
    event.preventDefault();
    const { article } = this.state;
    fetch(`${articlesURL}/${article.slug}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: this.state.comment,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ comment }) => {
        let updatedComments = [comment].concat(this.state.allComments);
        this.setState({ comment: '', allComments: updatedComments });
      })
      .catch((error) => console.log(error));
  };
  handleDelete = (id) => {
    const { article } = this.state;
    fetch(`${articlesURL}/${article.slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res;
      })
      .then((data) => {
        console.log(data);
        let comments = this.state.allComments.filter(
          (comment) => comment.id !== id
        );
        this.setState({ allComments: comments });
      })
      .catch((error) => console.log(error));
  };
  handleChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };
  handleArticleEdit = (event) => {};
  handleArticleDelete = () => {
    const { article } = this.state;
    fetch(`${articlesURL}/${article.slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res;
      })
      .then((res) => {
        console.log(res);
        this.props.history.push('/');
      })
      .catch((error) => console.log(error));
  };
  handleFollow = (username) => {
    fetch(`${profileURL}/${username}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ profile }) => console.log(profile))
      .catch((error) => console.log(error));
  };
  render() {
    const { article, error, comment, allComments } = this.state;
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
            <div className="flex">
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
              <div>
                {this.props.user && (article.author.username === this.props.user.username ? (
                  <>
                  <Link to={`/editor/${article.slug}`} className='edit-article'>Edit Article </Link> 
                    <div
                      className="delete-article"
                      onClick={() => this.handleArticleDelete()}
                    >
                      Delete Article
                    </div>
                  </>
                ) : (
                  <div
                    className="follow-btn"
                    onClick={() => this.handleFollow(article.author.username)}
                  >
                    + Follow {article.author.username}
                  </div>
                ))}
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
              <form
                className="comment-form"
                onSubmit={(event) => this.handleComment(event)}
              >
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  placeholder="Write your thoughts about the article..."
                  value={comment}
                  onChange={(event) => this.handleChange(event)}
                ></textarea>
                <div className="statusbar flex">
                  <div className="userInfo flex">
                    <img
                      src={this.props.user.image}
                      alt={this.props.user.username}
                      className="comment-image"
                    />
                    {this.props.user.username}
                  </div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            )}
            {
              /* Comments for the articles */
              allComments.map((comment) => {
                return (
                  <div className="comment-section" key={comment.id}>
                    <div className="comment-body">{comment.body}</div>

                    <div className="statusbar flex">
                      <div className="userInfo flex">
                        <img
                          src={comment.author.image}
                          alt={comment.author.username}
                          className="comment-image"
                        />
                        {comment.author.username}
                      </div>
                      {comment.author.username === this.props.user.username && (
                        <div
                          className="delete"
                          onClick={() => this.handleDelete(comment.id)}
                        >
                          🗑
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </footer>
      </article>
    );
  }
}
export default withRouter(SinglePost);

import React from 'react';
import { articlesURL } from '../utils/constant';
import { withRouter } from 'react-router-dom';
import validate from '../utils/validate';
class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tags: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tags: '',
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({
      [name]: value,
      errors,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();    
    const { title, description, body, tags } = this.state;
    fetch(articlesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tags.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Cannot create new article!');
        }
        return res.json();
      })
      .then(({article}) => {
        console.log(article);
        this.setState({ title: '', description: '', body: '', tags: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { title, description, body, tags ,errors} = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="article-form flex flex-column"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Article Title"
            value={title}
            onChange={(event) => this.handleChange(event)}
          />
          <span className="error">{errors.title}</span>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Article Description"
            value={description}
            onChange={(event) => this.handleChange(event)}
          />
          <span className="error">{errors.description}</span>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            placeholder="Article in markdown format"
            value={body}
            onChange={(event) => this.handleChange(event)}
          ></textarea>
          <span className="error">{errors.body}</span>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags"
            value={tags}
            onChange={(event) => this.handleChange(event)}
          />
          <span className="error">{errors.tags}</span>
          <input type="submit" value="Publish Article" disabled={errors.title || errors.description || errors.body || errors.tags || !title || !description || !body || !tags}/>
        </form>
      </div>
    );
  }
}
export default withRouter(NewPost);

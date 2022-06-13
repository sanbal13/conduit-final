import React from 'react';
import { tagsURL } from '../utils/constant';
import Loader from './Loader';
class Sidebar extends React.Component {
  state = {
    tags: null,
    error: '',
  };
  componentDidMount() {
    fetch(tagsURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        this.setState({tags});
      })
      .catch((err) => {
        this.setState({ error: 'Not able to fetch tags!' });
      });
  }

  render() {
    const { tags, error } = this.state;
    if(error) {
        return <p>{error}</p>
    }
    if(!tags) {
        return <Loader />
    }
    return (
      <aside className="sidebar">
        <h3 className="sidebar-heading">Popular Tags</h3>
        {tags.filter((tag) => tag.length > 0 ).map(tag => (
          <div className="tag" onClick = {() => this.props.addTab(tag)} key={tag}>{tag}</div>
        ))}
      </aside>
    );
  }
}

export default Sidebar;

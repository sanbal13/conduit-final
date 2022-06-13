import React from 'react';
import Loader from './Loader';
import Post from './Post';

function Posts(props) {  
    const { articles, error } = props;    
    if(error) {
      return <p>{error}</p>;
    }
    if (!articles) {
      return <Loader />;
    }
    if(articles.length < 1) {
      return <h3>No articles found.</h3>
    }
    return (
      <>
        {articles.map((article) => (
          <Post key={article.slug} {...article} />
        ))}
      </>
    );
  }

export default Posts;

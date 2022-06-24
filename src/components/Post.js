import { Link } from 'react-router-dom';
import '../style/post.css';
import { articlesURL } from '../utils/constant';
function Post(props) {
  let { author, createdAt, favoritesCount, title, description, tagList, slug } =
    props;
  return (
    <>
      {
        <article className="article-post">
          <div className="flex">
            <div className="author-info flex">
              <img
                src={author.image}
                alt={author.username}
                className="profile-image"
              />

              <div className="flex flex-column item-start">
                <div className="username">{author.username}</div>

                <div className="article-created-at">
                  {new Date(createdAt).toDateString()}
                </div>
              </div>
            </div>
            <div
              className="likes"
              onClick={() => handleFavorite(slug, props.user.token)}
            >
              {favoritesCount} 💚{' '}
            </div>
          </div>
          <div className="margin-top-bot">
            <Link to={`/article/${slug}`}>
              <h2>{title}</h2>
              <p>{description}</p>
            </Link>
          </div>
          <div className="flex">
            <Link to={`/article/${slug}`}>Read More...</Link>
            <div className="tags">
              {tagList.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      }
    </>
  );
}
function handleFavorite(slug, token) {
  fetch(`${articlesURL}/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then(({ errors }) => {
        return Promise.reject(errors);
      });
    }
    return res.json();
  }).then(({article}) => {
    console.log(article);
  }).catch(error => console.log(error));
}
export default Post;

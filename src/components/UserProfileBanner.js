import { profileURL } from '../utils/constant';
function UserProfileBanner(props) {
    let {user, author} = props;  
    author = author.profile;  
    return (
        <section className="profile-banner">
            <center>
                <img src={author.image} alt={author.username} />
                <h1 className="profile name">
                {author.username}
                </h1>
                </center>
                
                <div className="follow-btn profile-btn" onClick={() => handleFollow(author.username, user)}>
                    <p>
                        + Follow <span>{author.username}</span>
                    </p>
                </div>            
        </section>
    )
}
function handleFollow(username, user) {
    console.log(user);
    fetch(`${profileURL}${username}/follow`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`
        }
    }).then(res => {
        if(!res.ok){
            return res.json().then(({errors}) => {
                return Promise.reject(errors);
            })
        }
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log(error))
}
export default UserProfileBanner;
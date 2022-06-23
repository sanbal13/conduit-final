import {Link} from 'react-router-dom';
function ProfileBanner(props) {
    let {user} = props;       
    return (
        <section className="profile-banner">
            <center>
                <img src={user.image} alt={user.username} />
                <h1 className="profile name">
                {user.username}
                </h1>
                </center>
                <Link to='./settings'>
                <div className="edit-profile-btn profile-btn" >                    
                        Edit Settings                    
                </div>    
                </Link>        
        </section>
    )
}

export default ProfileBanner;
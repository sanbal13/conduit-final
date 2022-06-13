function ProfileBanner(props) {
    let {user} = props;
    return (
        <section className="profile-banner">
            <center>
                <img src={props.user.image} alt={user.username} />
                <h1 className="profile name">{user.username}</h1>
                <div className="follow-btn profile-btn">
                    <p>
                        + Follow <span>{user.username}</span>
                    </p>
                </div>
            </center>
        </section>
    )
}
export default ProfileBanner;
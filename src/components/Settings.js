import React from 'react';
import { userVerifyURL } from '../utils/constant';
class Settings extends React.Component {
  state = {
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
    errors: {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
    },
  };
  componentDidMount = () => {
    const { image, username, bio, email } = this.props.user;
    this.setState({
      image,
      username,
      bio,
      email
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handlePublish = (event) => {
    event.preventDefault();
  
    const { image, username, bio, email } = this.state;      
    
      fetch(userVerifyURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${this.props.user.token}`
        },
        body: JSON.stringify({
            user:{
            image,
            username,
            bio,
            email
          }
        })
      }).then(res => {
        if(!res.ok) {
          return res.json().then(({errors}) => {
            return Promise.reject(errors);
          })
        }
        return res.json();
      }).then((data) => console.log(data)).catch((error) =>  console.log(error));
  }
  render() {
    const { image, username, bio, email, password, errors } = this.state;
    return (
      <div className="container settings">
        <center>
          <h2>Your Settings</h2>
        </center>
        <form className="settingsForm flex flex-column" onSubmit={(event) => this.handlePublish(event)}>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(event) => this.handleChange(event)}
            placeholder="URL of profile picture"
          />
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => this.handleChange(event)}
            placeholder="Username"
          />
          <textarea
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            value={bio}
            onChange={(event) => this.handleChange(event)}
            placeholder="Short bio about you"
          ></textarea>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(event) => this.handleChange(event)}
          />
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(event) => this.handleChange(event)}
            placeholder="New Password"
          />
          <input type="submit" value="Update Settings" />
        </form>
      </div>
    );
  }
}
export default Settings;

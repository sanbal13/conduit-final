import React from 'react';
import { Link } from 'react-router-dom';
import '../style/form.css';
import validate from '../utils/validate';
import { signupURL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

class Signup extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    errors: { 
      username: '',
      email: '',
      password: '',
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
    const { username, email, password } = this.state;

    fetch(signupURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {           
            return Promise.reject(errors);
          });

          //this code is not used as we cannot pass an object to Error Object
          // throw new Error('Fetch not successful');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: '', password: '', email: '' });
        this.props.history.push('/');
      })
      .catch((errors) =>  this.setState({ errors }));
  };

  render() {
    let { errors, username, email, password } = this.state;
    return (
      <center className="container">
        <h2>Signup</h2>
        <Link to="./login" className="link">
          Have an account?
        </Link>
        <form
          className="signup-form flex flex-column"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
          <span className="error">{errors.username}</span>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <span className="error">{errors.email}</span>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
            value={password}
            onChange={this.handleChange}
          />
          <span className="error">{errors.password}</span>
          <input
            type="submit"
            value="Sign up"
            disabled={errors.username || errors.email || errors.password}
          />
        </form>
      </center>
    );
  }
}
export default withRouter(Signup);

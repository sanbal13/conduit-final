import React from 'react';
import { Link } from 'react-router-dom';
import '../style/form.css';
import validate from '../utils/validate';
import { loginURL } from '../utils/constant';
import {withRouter} from "react-router-dom";
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    validate(errors, name, value);
    this.setState({ [name]: value, errors });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    fetch(loginURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
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
          
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);        
        this.props.history.push('/');
      })
      .catch((error) => this.setState((prevState) => {
        return {
          ...prevState,
          errors: {
            ...prevState.errors,
            email: 'Email or password is incorrect!'
          }
        }
      }));
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <center className="container">
        <h2>Login</h2>
        <Link to="./signup" className="link">
          Need an account?
        </Link>
        <form
          className="login-form flex flex-column"
          onSubmit={this.handleSubmit}
        >
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <span className="error">{errors.email}</span>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChange}
            placeholder="Password"
            autoComplete="off"
          />
          <span className="error">{errors.password}</span>
          <input
            type="submit"
            value="Log in"
            disabled={errors.email || errors.password}
          />
        </form>
      </center>
    );
  }
}

export default withRouter(Login);

// withRouter will give acess to all the functions you need from react-router-dom
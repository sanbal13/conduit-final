import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import NoMatch from './NoMatch';
import SinglePost from './SinglePost';
import Loader from './FullPageSpinner';
import { localStorageKey, userVerifyURL } from '../utils/constant';
import NewPost from './NewPost';
import Profile from './Profile';
import Settings from './Settings';
import UserProfile from './UserProfile';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
    isVerifying: false,
  };
  componentDidMount() {
    let storageKey = localStorage[localStorageKey];
    if (storageKey) {
      fetch(userVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then(({ errors }) => {
              return Promise.reject(errors);
            });
          }
          return res.json();
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      isVerifying: false,
      user,
    });
    localStorage.setItem(localStorageKey, user.token);
  };
  render() {
    if (this.state.isVerifying) {
      return <Loader />;
    }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp user={this.state.user} />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home user={props.user} />
      </Route>
      <Route path="/article/:slug">
        <SinglePost user={props.user} />
      </Route>
      <Route path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route path="/editor/:slug">
        <NewPost user={props.user} />
      </Route>
      <Route path="/profile">
        <Profile user={props.user} />
      </Route>
      <Route path="/userProfile/:author">
        <UserProfile user={props.user} />
      </Route>
      <Route path="/settings">
        <Settings user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup updateUser={props.updateUser} />
      </Route>
      <Route path="/login">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/article/:slug">
        <SinglePost user={props.user} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}

export default App;

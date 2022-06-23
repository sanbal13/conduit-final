import { NavLink } from 'react-router-dom';
import { localStorageKey } from '../utils/constant';
import { withRouter } from 'react-router-dom';
function Header(props) {
  return (
    <div className="header">
      <header className="flex container">
        <div className="brand">
          <a href="/">Conduit</a>
        </div>
        <nav>{props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</nav>
      </header>
    </div>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex header-nav">
      <li>
        <NavLink activeClassName="active-link" exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-link" to="/signup">
          SignUp
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-link" to="/login">
          Login
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader() {
  return (
    <ul className="flex header-nav">
      <li>
        <NavLink activeClassName="active-link" exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-link" to="/new-post">
          New Article
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-link" to="/settings">
          Settings
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li>
        <button className='logout' onClick={() => handleLogout()}>Logout</button>
      </li>
    </ul>
  );
}
function handleLogout() {
        localStorage.clear();
        window.location.href = '/login'; 
}

export default withRouter(Header);

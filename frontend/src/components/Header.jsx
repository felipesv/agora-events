import React from 'react';
import '@stylesComponents/Header.scss';
import brand from '../assets/images/brand.png';
import { isLoggedIn } from '../utils/authUtils';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.removeItem('token');
    location.href = "/";
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <nav className="navbar is-transparent">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={brand} alt="Agora Events" width="112" height="28" />
              </a>
            </div>

            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    { isLoggedIn()
                      ?
                        <React.Fragment>
                          <a className="button is-white" href="/">Home</a>
                          <a className="button is-white" href="/myevents">My Events</a>
                          <a className="button is-white" href="/profile">Profile</a>
                          <a className="button is-primary" onClick={() => this.logOut()}>Logout</a>
                        </React.Fragment>
                      :
                        <React.Fragment>
                          <a className="button is-primary" href="/signup">Sign up</a>
                          <a className="button is-light" href="/signin">Log in</a>
                        </React.Fragment>
                    }
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;

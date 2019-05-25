import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import AuthService from '../auth/auth-service';

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      loggedInUser: nextProps.userInSession,
      name: nextProps.name
    })
  }


  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to={"/"}>
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </Link>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to={'/offers'}>
                My Offers
            </Link>
              <Link className="navbar-item" to={'/orders'}>
                Orders
            </Link>
              <Link className="navbar-item" to={'/buy'}>
                Buy
            </Link>

            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">


              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  Hi, {this.state.name}
                </div>
                <div className="navbar-item">
                  <div className="buttons">

                    <Link className="button is-warning" to={'/edit-profile'}>Edit Profile </Link>
                    <button className="button is-danger" onClick={() => this.logoutUser()}>Logout</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    } else {
      return (

        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <NavLink className="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink className="button is-light" to="/login">
                  Log in
          </NavLink>
              </div>
            </div>
          </div>
        </nav>

      )
    }
  }
}


export default NavBar;
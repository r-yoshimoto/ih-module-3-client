import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AuthService from './components/auth/auth-service';
import NavBar from './components/navbar/NavBar';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Joc from './components/Joc';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null
    }
    this.service = new AuthService();
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj
    })
  }


  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <section>
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
          <Route exact path="/" render={() => <Joc />} />
          </Switch>
        </section>
      );
    } else {
      return (
        <section>
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <SignUp getUser={this.getTheUser}/>}/>
              <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            </Switch>
        </section>
      );
}
}
}

export default App;

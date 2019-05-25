import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import AuthService from './components/auth/auth-service';
import NavBar from './components/navbar/NavBar';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Confirm from './components/auth/Confirm';
import Joc from './components/Joc';
import OfferList from './components/offers/OfferList';
import OfferDetails from './components/offers/OfferDetails';
import OrderList from './components/orders/OrderList';
import OrderDetails from './components/orders/OrderDetails';

import Profile from './components/auth/EditProfile'
import BuyList from './components/offers/BuyList';
import PleaseLogin from './components/offers/PleaseLogin';


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null,
    }
    this.service = new AuthService();
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response,
            name: response.fullName.split(" ")[0]
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
    if (this.state.loggedInUser) {
      return (
        <section>
          <NavBar userInSession={this.state.loggedInUser} name={this.state.name} getUser={this.getTheUser} />
          <Switch>
            <Route exact path="/" component={Joc} />
            <Route exact path="/edit-profile" render={() => <Profile loggedInUser={this.state.loggedInUser} getUser={this.getTheUser}/>} />
            <Route path='/offers/:id' render={(props) => <OfferDetails loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path='/offers' render={(props) => <OfferList loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path='/buy' render={(props) => <BuyList loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path='/orders/:id' render={(props) => <OrderDetails loggedInUser={this.state.loggedInUser} {...props} />} />
            <Route path='/orders' render={(props) => <OrderList loggedInUser={this.state.loggedInUser} {...props} />}  />
          </Switch>
        </section>
      );
    } else {
      return (
        <section>
          <NavBar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path='/signup' render={() => <SignUp getUser={this.getTheUser} />} />
            <Route exact path='/confirm/:token' render={(props) => <Confirm getUser={this.getTheUser} {...props} />} />
            <Route exact path='/login' render={(props) => <Login getUser={this.getTheUser} {...props} />} />
            <Route path='/offers/:id' component={PleaseLogin}  />
            <Route path='/buy' component={BuyList} />

          </Switch>
        </section>
      );
    }
  }
}

export default App;

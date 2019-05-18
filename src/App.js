import React, { Component } from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/auth-service';
import AddOffer from './components/projects/AddOffer';
import OfferList from './components/projects/OfferList';
import Navbar from './components/navbar/Navbar';
import OfferDetails from './components/projects/OfferDetails';
// import TaskDetails from './components/tasks/TaskDetails'; // <== import the TaskDetails component
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
  render() {
    {this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/offers/:id' component={OfferDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/offers' component={OfferList} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
              <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={OfferDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={OfferList} />
            </Switch>
        </div>
      );
    }
  }
}
export default App;

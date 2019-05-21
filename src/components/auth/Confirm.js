import React, { Component } from 'react';
import AuthService from './auth-service';
import { Redirect } from 'react-router-dom';
import Login from './Login';


class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailToken: props.match.params.token
    };
    this.service = new AuthService();
  }

  componentWillReceiveProps() {
    const { emailToken } = this.state;
    this.service.confirmEmail(emailToken)
      .then(response => {
        console.log(response)
        this.setState({
          message: `${response.message}`
        })
        
        
      })
      .catch(error => {
        this.setState({
          message: `${error.response.data.message}`
        })
    })
  }

  render() {

    if (this.state.message) {
       return (
         
        <Redirect to={{
          pathname: '/login',
          state: { message: this.state.message }
      }}
/>
        )
    
    } else {
      return (<h1>Loading</h1>)
    }

  }
}

export default Confirm;
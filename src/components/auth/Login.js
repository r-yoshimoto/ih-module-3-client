import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', message: this.props.location.state ? this.props.location.state.message : null };
    this.service = new AuthService();
  }

  
  handleResend = (e) => {
      e.preventDefault();
      const { token } = this.state;
      this.service.resendConfirmation(token)
      .then(response => {
        this.setState({
          token: null,
          message: `${response.message}` 
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({
        message: `${error.response.data.message}`})
      });
    }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.service.login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", loggedInUser: true  });
        this.props.getUser(response.userDetail)
      })
      .catch(error => {
        this.setState({
        token: error.response.data.token ? `${error.response.data.token}` : null,
        message: `${error.response.data.message}`
      })
  })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    if(this.state.loggedInUser) {
return (
      <Redirect to={{
        pathname: '/'
    }}
/>
)
    }
    else {
    return (

      <section className='section'>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <div className="field">
            <label className="label">email</label>
            <div className="control">
              <input className="input" type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
            </div>
          </div>

          {
            this.state.message && !!this.state.token &&
            (<article className="message is-warning">
              <div className="message-header">
                <p>System Message</p>
              </div>
              <div className="message-body">
                <strong>{this.state.message} <a href="#" onClick={this.handleResend}>Click here to resend.</a></strong>
              </div>
            </article>)
          }
          {
            this.state.message && !this.state.token &&
            (<article className="message is-warning">
              <div className="message-header">
                <p>System Message</p>
              </div>
              <div className="message-body">
                <strong>{this.state.message}</strong>
              </div>
            </article>)
          }

          <div className="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Login</button>
            </div>
            <div className="control">
              <button type='reset' className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
        <div className="section">
          <h6 className="subtitle is-6">
            Don't have account?
            <br />
            <Link className='button' to={"/signup"}>
              Signup
          </Link>
          </h6>
        </div>
      </section>
    )
  }
  }
}
export default Login;
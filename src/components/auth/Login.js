import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link, Redirect } from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.service.login(email, password)
      .then(response => {
        this.setState({ email: "", password: "" });
        this.props.getUser(response)
        return <Redirect to={{
          pathname: '/'
        }} />
      })
      .catch(error => 
        this.setState({
        message: `${error.response.data.message}`
      }))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return (
      <section className='section'>
        <form onSubmit={this.handleFormSubmit}>
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
            this.state.message &&
            (<article className="message is-warning">
              <div className="message-header">
                <p>System Message</p>
                <button className="delete" aria-label="delete"></button>
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
export default Login;
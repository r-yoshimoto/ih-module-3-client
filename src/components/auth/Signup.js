import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      message: null
    };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const fullName = this.state.fullName;
    const password = this.state.password;
    const email = this.state.email;

    this.service.signUp(fullName, password, email)
      .then(newUser => {
        this.setState({
          fullName: "",
          password: "",
          email: "",
        });
        this.props.getUser(newUser)
      })
      .catch(error => {
        // console.log(`no dounut for you ${error}`, error.response.data)
        this.setState({
          message: `${error.response.data.message}`
        })
      })
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
            <label className="label">E-mail</label>
            <div className="control">
              <input className="input" type="text" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
            </div>
          </div>

          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input className="input" type="text" name="fullName" value={this.state.fullName} onChange={e => this.handleChange(e)} />
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
          <div classNameName="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Sign up</button>
            </div>
            <div className="control">
              <button type='reset' className="button is-text">Cancel</button>
            </div>
          </div>
        </form>
        <div className="section">
          <h6 className="subtitle is-6">
            Do you have an account?
            <br />
            <Link className='button' to={"/login"}>
              Login
          </Link>
          </h6>
        </div>
      </section>
    )
  }
}

export default SignUp;
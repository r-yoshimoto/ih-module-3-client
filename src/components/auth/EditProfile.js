import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';


class Profile extends Component {
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
                {
            this.state.message &&
            (<article className="message is-warning">
              <div className="message-header">
                <p>System Message</p>
              </div>
              <div className="message-body">
                <strong>{this.state.message}</strong>
              </div>
            </article>)
          }
          
        <form onSubmit={this.handleFormSubmit}>

          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input className="input" type="text" name="fullName" value={this.state.fullName} onChange={e => this.handleChange(e)} />
            </div>
          </div>

          <div classNameName="field is-grouped">
            <div className="control">
              <button type='submit' className="button is-link">Save Changes</button>
            </div>
          </div>
        </form>
        </section>
    )
  }
}

export default Profile;
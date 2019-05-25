import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
      withCredentials: true
    });
  }

  signUp = (fullName, password, email) => {
    return this.service.post('/signup', { fullName, password, email })
      .then(response => response.data)
      // .catch(error => console.log(error))
  }

  resendConfirmation = (token) => {
    return this.service.get(`/confirm/resend/${token}`)
    .then(response => response.data)
  }

  editProfile = (fullName) => {
    return this.service.post('/editprofile', { fullName })
    .then(response => response.data)
  }

  confirmEmail = (token) => {
    return this.service.get(`/confirm/${token}`)
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

export default AuthService;
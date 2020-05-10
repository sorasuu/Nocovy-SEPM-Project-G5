import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"
const ColorLinearProgress = withStyles({
  colorPrimary: {
    background: '#ffff'
  },
  barColorPrimary: {
    background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
  }
})(LinearProgress);

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  logging: false, authError: '',
  isForget: false,
}
class SignIn extends Component {
  state = initialState;

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }
    
    if (!this.state.password){
      passwordError = "Password cannot be blank"
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }

    return true;
  }

  handleForget = () =>{
    this.setState({isForget: !this.state.isForget})
    
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ logging: true })
    const isValid = this.validate();
    if (isValid) {
      // console.log(this.state);
      this.setState(initialState);
    }
    this.props.signIn(this.state)

  }
  handleResetPassword = () => {

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authError !== prevState.authError) {
      if (nextProps.authError === "Incorrect Email or Password") {
      }
      return { authError: nextProps.authError, logging: false };
    }
    else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.authError !== this.props.authError) {
      if (this.props.authError !== undefined || this.props.authError !== null) {
        this.setState({ logging: false })
      }
    }
  }
  render() {
    
    const { authError, auth } = this.props;
    console.log(this.props.auth)
    if (auth.uid) return <Redirect to='/' />
    return (
      
      <div className="base-container">
        <Container style={{ marginTop: "2%", width: "500px" }}>
          <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
            <div className="header">Login</div>
            <div className="image">
              <img src="handshake.png"></img>
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id='email'
                  placeholder='Enter your Email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 11, color: "red" }}>
                  {this.state.emailError}
                </div>
              </div>
              {this.state.isForget === false ? 
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id='password'
                  placeholder='Enter your password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <div style={{ fontSize: 11, color: "red" }}>
                  {this.state.passwordError}
                </div>an
                <a onClick={this.handleForget}>Forget Password?</a>
              </div>: <button onClick={this.handleForget}>Back</button>}
            </div>
            
            {this.state.isForget === false ? 
            <div className="input-field">
              <NoSsr>
                <StyledButton onClick={this.handleSubmit}>Login</StyledButton>
              </NoSsr>
              {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null}
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>: 
            <div className="input-field">
              <NoSsr>
                <StyledButton onClick={this.handleResetPassword}>Confirm</StyledButton>
              </NoSsr>
              </div> }
          </form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

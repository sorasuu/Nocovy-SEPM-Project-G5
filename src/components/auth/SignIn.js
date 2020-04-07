import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
const ColorLinearProgress = withStyles({
  colorPrimary: {
    background: '#ffff'
  },
  barColorPrimary: {
    background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
  }
})(LinearProgress);
class SignIn extends Component {
  state = {
    email: '',
    password: '',
    logging: false, authError: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ logging: true })
    this.props.signIn(this.state)

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.authError !== prevState.authError) {
      if (nextProps.authError === "Login failed") {
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
    if (auth.uid) return <Redirect to='/' />
    return (
      <div>

        <Container style={{ marginTop: "2%" }}>
          <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
            <h5 className="grey-text text-darken-3" style={{ marginBottom: "3%" }}>Sign In</h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id='email' onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input type="password" id='password' onChange={this.handleChange} />
            </div>
            <div className="input-field">
              <NoSsr>
                <StyledButton onClick={this.handleSubmit}>Login</StyledButton>
              </NoSsr>
              {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null}
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
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

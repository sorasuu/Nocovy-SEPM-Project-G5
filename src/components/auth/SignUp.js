import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"

import FormSignUp from './FormSignUp'
import FormCertificate from './FormCertificate'
import Confirm from './Confirm'
import Sucess from './Success'

const ColorLinearProgress = withStyles({
  colorPrimary: {
    background: '#ffff'
  },
  barColorPrimary: {
    background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
  }
})(LinearProgress);

class SignUp extends Component {
  state = {
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    phonenumber: '',
    phonenumberError: '',
    bio: ''
  }
 
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }


  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }
  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   })
  // }
  handleChange = input => e => {
    this.setState({ [input]: e.target.value })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  // validate = () => {
  //   let emailError = "";
  //   let passwordError = "";
  //   let phonenumberError= "";

  //   if (!this.state.email.includes("@")) {
  //     emailError = "Invalid Email";
  //   }

  //   if (!this.state.password) {
  //     passwordError = "Password cannot be blank"
  //   }
  //   if(!this.state.phonenumber){
  //     phonenumberError = "Phone number cannot be black"
  //   }
  //   if (emailError || passwordError) {
  //     this.setState({ emailError, passwordError });
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    const { step } = this.state;
    const { email, password, phonenumber, firstName, lastName, bio } = this.state;
    const values = { email, password, phonenumber, firstName, lastName, bio }


    switch (step) {
      case 1:
        return (
          <FormSignUp
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 2:
        return (
          <FormCertificate
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        )
      case 3:
        return <Confirm
          nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
        />
      case 4:
        return <h1>Success</h1>
    }

  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

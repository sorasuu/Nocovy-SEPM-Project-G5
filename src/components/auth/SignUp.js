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
import Success from './Success'

class SignUp extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',

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
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const { step, firstName, lastName, email, password, phoneNumber, bio } = this.state;
        const { auth, authError } = this.props;
        const values = { firstName, lastName, email, password, phoneNumber, bio }
        if (auth.uid) return <Redirect to='/' />

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
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleSubmit={this.handleSubmit}
                        values={values}
                    />
                )
            case 4:
                return (
                   <Success
                       prevStep={this.prevStep}
                   />
                )
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
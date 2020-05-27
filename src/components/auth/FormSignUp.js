import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles, InputBase } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"

// const ColorLinearProgress = withStyles({
//     colorPrimary: {
//         background: '#ffff'
//     },
//     barColorPrimary: {
//         background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
//     }
// })(LinearProgress);
const initialState = {
    firstNameError:'',
    lastNameError:'',
    emailError: '',
    passwordError: '',
    rePasswordError: '',
    phonenumberError: '',
    logoImgError:'',
    uploading: false
}

class FormSignUp extends Component {

    state = initialState;

    validate = () => {
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';
        let rePasswordError = '';
        let phonenumberError = '';
        let logoImgError = '';

        if (!this.props.values.firstName) {
            firstNameError = "First name cannot be blank"
        }

        if (!this.props.values.lastName) {
            lastNameError = "Last name cannot be blank"
        }

        if (!this.props.values.email.includes("@")) {
            emailError = "Invalid Email";
        }

        if (!this.props.values.password) {
            passwordError = "Password cannot be blank"
        }

        if (!this.props.values.rePassword || this.props.values.rePassword !== this.props.values.password ){
            rePasswordError = "Password does not match"
        }

        if (!this.props.values.phoneNumber) {
            phonenumberError = "Phone number cannot be blank"
        }

        if(this.props.values.image === ''){
            logoImgError = 'Avatar cannot be blank'
        }

        if (firstNameError || lastNameError || emailError || passwordError || rePasswordError || phonenumberError ) {
            this.setState({ firstNameError, lastNameError, emailError, passwordError, rePasswordError, phonenumberError });
            return false;
        }
        return true;

    }


    continue = e => {
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);

            e.preventDefault();
            this.setState({ uploading: true });
            this.props.handleUploadAvatar(e);
            this.props.nextStep();
        }
    }



    render() {
        const { auth, authError, values, handleChange, handleChangeAvatar } = this.props;
        console.log(this.state)
        // if (auth.uid) return <Redirect to='/' />

        return (



            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth"
                        // onSubmit={this.handleSubmit} 
                        style={{ padding: "2%" }}>

                        <div className="header">Sign Up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>

                        <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>
                            <div className="form-group">
                            <label htmlFor="firstName">First name</label>
                                <div className="input-field">                                   
                                    <input type="text" id='firstName' placeholder="Enter your first name" onChange={handleChange('firstName')} defaultValue={values.firstName} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.firstNameError} </div>
                                </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                                <div className="input-field">
                                    <input type="text" id='lastName' placeholder="Enter your last name" onChange={handleChange('lastName')} defaultValue={values.lastName} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.lastNameError} </div>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="email">Email</label>
                                <div className="input-field">
                                    <input type="email" id='email' placeholder="Enter your email" onChange={handleChange('email')} defaultValue={values.email} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.emailError} </div>
                                </div>
                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="password">Password</label>
                                <div className="input-field">
                                    <input type="password" id='password' placeholder="Enter your password" onChange={handleChange('password')} defaultValue={values.password} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.passwordError} </div>
                                </div>
                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="rePassword">Re-enter Password</label>
                                <div className="input-field">
                                    <input type="password" id='rePassword' placeholder="Re-enter your password" onChange={handleChange('rePassword')} defaultValue={values.rePassword} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.rePasswordError} </div>
                                </div>
                                
                            </div>
                            <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                                <div className="input-field">
                                    <input type="text" pattern="[0-9]*" y id='phoneNumber' placeholder="Enter your phone number" onChange={handleChange('phoneNumber')} defaultValue={values.phoneNumber} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.phonenumberError} </div>
                                </div>
                               
                            </div>

                            <div className="form-group">
                                <label htmlFor="image" >Avatar</label>
                                <br />
                                <input
                                    defaultValue={values.image}
                                    onChange={handleChangeAvatar}
                                    type="file"
                                    id='logo'

                                />
                                <div style={{ fontSize: 11, color: "red" }}> {this.state.logoImgError} </div>
                            </div>

                            <div className="input-field" style={{ textAlign: 'center'}}>
                                <NoSsr>
                                    <StyledButton onClick={this.continue}>Continue</StyledButton>
                                </NoSsr>

                                {/* {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
                                <div className="center red-text">
                                    {this.state.authError ? <p>{this.state.authError}</p> : null}
                                </div>
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}


export default FormSignUp

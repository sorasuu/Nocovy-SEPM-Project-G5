import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
// import { List, ListItem } from 'material-ui/List'
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
    passwordError: '',
    // uploading: false
}

export class FormCertificate extends Component {

    state = initialState;

    validate = () => {
        let passwordError = '';

        if (!this.props.values.password
            // == { password }
        ) {
            passwordError = "Password does not match";
        }

        if (passwordError) {
            this.setState({ passwordError })
            return false;
        }
        return true;
    }

    continue = e => {
        const isValid = this.validate();
        if (isValid) {
            this.setState(initialState);
            e.preventDefault();
            this.props.handleSubmit(e);
            this.props.nextStep();
        }

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values: { firstName, lastName, email, password, phoneNumber, bio, img, url, businessName, type, businessDesc, businessAddress, businessWebsite }, authError, auth } = this.props;
        const { values, handleChange } = this.props;
        // if (auth.uid) return <Redirect to='/' />
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth"
                        // onSubmit={this.handleSubmit} 
                        style={{ padding: "2%" }}>
                        <div className="header">Confirm sign up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form" style={{ textAlign: 'left', alignSelf: 'stretch' }}>


                            <div className="form-group">
                                <label htmlFor="firstName" >First Name</label>
                                <p>{firstName}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" >Last Name</label>
                                <p>{lastName}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" >Email</label>
                                <p>{email}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" >Password</label>
                                {/* <p>{password}</p> */}
                                {/* <div className="input-field">
                                    <input type="password" id='password' placeholder="Re-Enter your password" onChange={handleChange('password')} defaultValue={values.password} />

                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.passwordError} </div>
                                </div> */}
                                <p>********</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phonenumber" >Phone Number</label>
                                <p>{phoneNumber}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessName" >Business Name</label>
                                <p>{businessName}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessType" >Business Type</label>
                                <p>{type}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessAddress" >Business Address</label>
                                <p>{businessAddress}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessWebsite" >Business Website</label>
                                <p>{businessWebsite}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessDesc" >Business Description</label>
                                <p>{businessDesc}</p>
                            </div>
                        </div>


                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Confirm and Continue</StyledButton>
                            </NoSsr>


                            {/* {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
                            <div className="center red-text">
                                    {this.state.authError ? <p>{this.state.authError}</p> : null}
                                </div>
                        </div>

                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.back}>Back</StyledButton>
                            </NoSsr>

                        </div>

                    </form>
                </Container>
            </div>
        )
    }
}

export default FormCertificate

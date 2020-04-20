import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
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

export class FormSignUp extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const { auth, authError, values, handleChange } = this.props;
        // if (auth.uid) return <Redirect to='/' />
        return (

            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white" onSubmit={this.handleSubmit}>
                        <h5 className="header">Sign Up</h5>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id='firstName' onChange={handleChange('firstName')} defaultValue={values.firstName} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input tnkype="text" id='lastName' onChange={handleChange('lastName')} defaultValue={values.lastName} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' onChange={handleChange('email')} defaultValue={values.email} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id='password' onChange={handleChange('password')} defaultValue={values.password} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" pattern="[0-9]*" y id='phoneNumber' onChange={handleChange('phoneNumber')} defaultValue={values.phoneNumber} />
                        </div>

                        {/* <div className="input-field">
                            <button className="btn lighten-1 z-depth-0" color="#39B04B" onClick={this.continue}>Continue</button>
                            <div className="center red-text">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div> */}
                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Continue</StyledButton>
                            </NoSsr>

                            {/* {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
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
// const mapStateToProps = (state) => {
//     return {
//         auth: state.firebase.auth,
//         authError: state.auth.authError
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         signUp: (creds) => dispatch(signUp(creds))
//     }
// }

export default FormSignUp

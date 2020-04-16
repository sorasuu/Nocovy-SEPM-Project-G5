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
                    <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
                        <div className="header">Sign up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form">


                            <div className="form-group">
                                <label htmlFor="firstName" >First Name</label>
                                <input
                                    // type="firstName"
                                    id='firstName'
                                    placeholder='Enter your first name'
                                    //   value={this.state.firstName}
                                    onChange={this.handleChange}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    // type="lastName"
                                    id='lastName'
                                    placeholder='Enter your last name'
                                    //   value={this.state.lastName}
                                    onChange={this.handleChange}
                                />

                            </div>
                            <label htmlFor="email">Email</label>
                            <input
                                // type="email"
                                id='email'
                                placeholder='Enter your Email'
                                //   value={this.state.email}
                                onChange={this.handleChange}
                            />
                            {/* <div style={{ fontSize: 11, color: "red" }}>
                  {this.state.emailError}
                </div> */}


                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    // type="password"
                                    id='password'
                                    placeholder='Enter your password'
                                    //   value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                {/* <div style={{ fontSize: 11, color: "red" }}>
                  {this.state.passwordError}
                </div> */}
                            </div>

                            {/* <div className="form-group">
                                <label htmlFor="password">Re-enter Password</label>
                                <input
                                    // type="password"
                                    id='password'
                                    placeholder='Re-enter your password'
                                    //   value={this.state.password}
                                    onChange={this.handleChange}
                                />
                         
                            </div> */}

                            <div className="form-group">
                                <label htmlFor="phonenumber">Phone Number</label>
                                <input
                                    // type="phonenumber"
                                    id='phoneNumber'
                                    placeholder='Enter your phone number'
                                    //   value={this.state.phoneNumber}
                                    onChange={this.handleChange}
                                />

                            </div>



                        </div>


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

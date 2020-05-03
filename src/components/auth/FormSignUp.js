import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
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

class FormSignUp extends Component {
    state = {
        uploading: false
    }

    continue = e => {
        e.preventDefault();
        this.setState({ uploading: true });
        this.props.handleUploadAvatar(e);
        this.props.nextStep();
    }



    render() {
        const { auth, authError, values, handleChange, handleChangeAvatar } = this.props;
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

                        <div className="form">
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" id='firstName' onChange={handleChange('firstName')} defaultValue={values.firstName} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input tnkype="text" id='lastName' onChange={handleChange('lastName')} defaultValue={values.lastName} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id='email' onChange={handleChange('email')} defaultValue={values.email} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id='password' onChange={handleChange('password')} defaultValue={values.password} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="text" pattern="[0-9]*" y id='phoneNumber' onChange={handleChange('phoneNumber')} defaultValue={values.phoneNumber} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="image" >Avatar</label>
                                <br />
                                <input
                                    defaultValue={values.image}
                                    onChange={handleChangeAvatar}
                                    type="file"
                                    id='avatar'

                                />

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

                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}


export default FormSignUp

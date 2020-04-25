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

export class FormCertificate extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
      }

    continue = e => {
        e.preventDefault();
        //process the form
        //send the data to backend
        //email and phone validation here

        this.handleSubmit();
        this.props.nextStep();

    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values: { firstName, lastName, email, password, phoneNumber, bio } } = this.props;
        // if (auth.uid) return <Redirect to='/' />
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
                        <div className="header">Confirm sign up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form">


                            <div className="form-group">
                                <label htmlFor="firstName" >First Name</label>
                                {/* {console.log(firstName)} */}
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
                                <p>{password}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phonenumber" >Phone Number</label>
                                <p>{phoneNumber}</p>
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio" >Certificate</label>
                                {/* Certificate display goes here */}
                            </div>

                        </div>


                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Confirm and Continue</StyledButton>
                            </NoSsr>
                            

                            {/* {this.state.logging ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
                            {/* <div className="center red-text">
                                {authError ? <p>{authError}</p> : null}
                            </div> */}
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

export default FormCertificate

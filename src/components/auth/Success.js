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

export class Success extends Component {
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth" onSubmit={this.handleSubmit} style={{ padding: "2%" }}>
                        <div className="header">Success</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form">


                            <div className="form-group">
                            <div>You should get an email and phone for confirmation soon</div>
                            
                        
                            </div>
                        
                        </div>

                        <div className="input-field">
                            <NoSsr>
                                <StyledButton href="/signin">Done</StyledButton>
                            </NoSsr>

                        </div>

                    </form>
                </Container>
            </div>
        )
    }
}

export default Success

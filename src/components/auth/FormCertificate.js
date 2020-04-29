import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"
import storageRef from '../../index';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        background: '#ffff'
    },
    barColorPrimary: {
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
    }
})(LinearProgress);

export class FormCertificate extends Component {
    state={
        uploading:false
    }
    continue = e => {
        e.preventDefault();
        this.setState({uploading:true})
        this.props.handleUpload(e)  
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

  
    render() {
        const { auth, authError, values,handleChange } = this.props;
        // if (auth.uid) return <Redirect to='/' />
        // console.log(this.state.uid)
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "500px" }}>
                    <form className="white auth"
                    //  onSubmit={this.handleSubmit} 
                     style={{ padding: "2%" }}>
                        <div className="header">Sign up</div>
                        <div className="image">
                            <img src="handshake.png"></img>
                        </div>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="image" >Certificate(s)</label>
                                <br/>
                                <input
                                    type="file"
                                    id='image'
                                    defaultValue={values.image}
                                    onChange={handleChange('image')}
                                />
                            </div>
                        </div>


                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue }>Continue</StyledButton>
                            </NoSsr>

                            {this.state.uploading ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null}
                            <div className="center red-text">
                                {authError ? <p>{authError}</p> : null}
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

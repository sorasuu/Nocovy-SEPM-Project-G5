import React, { Component } from 'react'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"
import {DropzoneArea} from 'material-ui-dropzone'
const ColorLinearProgress = withStyles({
    colorPrimary: {
        background: '#ffff'
    },
    barColorPrimary: {
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)"
    }
})(LinearProgress);

export class FormCertificate extends Component {
    state = {
        uploading: false
    }
    continue = e => {
        e.preventDefault();
        this.setState({ uploading: true });
        this.props.handleUpload(e);
        // this.props.nextstep();
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    render() {
        const { auth, authError, values,handleChange, handleChangeImg } = this.props;
        // const file ={
        //     image: images[i],
        //     path: '/images/cerificates'
        // }

        // this.props.uploadToStorage(file)

        // if (auth.uid) return <Redirect to='/' />
        // console.log(this.state.uid)

        // if(url!==undefined&& url!==null){
        //     if (url.path==='/images/cerificates/'){
        //         cerurls=cerurls.add(url.url)

        //     }
        //     else if(url.path==='/images/certificates/'){
        //         logo=url.url
        //     }
        // }
        return (
            <div className="base-container">
                <Container style={{ marginTop: "2%", width: "550px" }}>
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
                                <br />
                                <DropzoneArea
                                    defaultValue={values.images}
                                    onChange={handleChangeImg}
                                    acceptedFiles={['image/*']}
                                    maxFileSize={500000}
                                    filesLimit={4}
                                    dropzoneText={'Upload your certificates here'}
                                />
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessName">Business Name</label>
                                    <input type="text" id='businessName' onChange={handleChange('businessName')} defaultValue={values.businessName} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessGenre">Business Genre</label>
                                    <input type="text" id='businessGenre' onChange={handleChange('businessGenre')} defaultValue={values.businessGenre} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessDesc">Business Description</label>
                                    <input type="text" id='businessDesc' onChange={handleChange('businessDesc')} defaultValue={values.businessDesc} />
                                </div>
                            </div>
                        </div>


                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Continue</StyledButton>
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

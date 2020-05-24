import React, { Component } from 'react'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"
import { DropzoneArea } from 'material-ui-dropzone'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const initialState = {
    businessNameError: '',
    businessTypeError: '',
    businessAddressError: '',
    businessDescError: '',
    uploading: false
}


class FormCertificate extends Component {
    state = initialState;

    validate = () => {
        let businessNameError = '';
        let businessTypeError = '';
        let businessAddressError = '';
        let businessDescError = '';

        if (!this.props.values.businessName) {
            businessNameError = "Business name cannot be blank"
        }

        if (!this.props.values.businessType) {
            businessTypeError = "Business type cannot be blank"
        }

        if (!this.props.values.businessAddress) {
            businessAddressError = "Business address cannot be blank"
        }

        if (!this.props.values.businessDesc) {
            businessDescError = "Business description cannot be blank"
        }

        if (businessNameError || businessTypeError || businessAddressError || businessDescError) {
            this.setState({ businessNameError, businessTypeError, businessAddressError, businessDescError })
            return false;
        }

        return true;
    }
    
    continue = e => {
        const isValid = this.validate()
        if (isValid) {
            this.setState(initialState)

            e.preventDefault();
            this.setState({ uploading: true })
            this.props.handleUpload(e)
            this.props.nextStep();

        }
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }


    render() {
        const { auth, authError, values, handleChange, handleChangeImg } = this.props;

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
                                <div style={{ fontSize: 11, color: "red" }}> {this.state.businessNameError} </div>
                            </div>
                            <div className="form-group" style={{textAlign: 'left', alignSelf: 'stretch'}}>
                                <label htmlFor="businessName" style={{ fontSize:"16px"}}>Business Type</label>
                                {" "}{" "}{" "}{" "}{" "}{" "}
                                <FormControl variant="outlined" className="form-group">
                                <InputLabel id="businessType"></InputLabel>
                                    <Select
                                        labelId="businessType"
                                        id="businessType"
                                        defaultValue={" "}
                                        value={values.businessType}
                                        style={{minWidth:"150px"}}
                                        onChange={handleChange('businessType')}
                                    >

                                        <MenuItem value={"supplier"}>Supplier</MenuItem>
                                        <MenuItem value={"retailer"}>Retailer</MenuItem>
                                        <MenuItem value={"customer"}>Customer</MenuItem>

                                    </Select>
                                </FormControl>
                                <div style={{ fontSize: 11, color: "red" }}> {this.state.businessTypeError} </div>
                            </div>
                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessAddress">Business Address</label>
                                    <input type="text" id='businessAddress' onChange={handleChange('businessAddress')} defaultValue={values.businessDesc} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.businessAddressError} </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessWebsite">Business Website (optional)</label>
                                    <input type="text" id='businessWebsite' onChange={handleChange('businessWebsite')} defaultValue={values.businessWebsite} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-field">
                                    <label htmlFor="businessDesc">Business Description</label>
                                    <input type="text" id='businessDesc' onChange={handleChange('businessDesc')} defaultValue={values.businessDesc} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.businessDescError} </div>
                                </div>
                            </div>
                        </div>


                        <div className="input-field">
                            <NoSsr>
                                <StyledButton onClick={this.continue}>Continue</StyledButton>
                            </NoSsr>

                            {/* {this.state.uploading ? <ColorLinearProgress style={{ marginBottom: "2%", marginTop: "2%", padding: "5px" }} /> : null} */}
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

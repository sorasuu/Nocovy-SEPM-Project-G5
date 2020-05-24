import React, { Component } from 'react'
import { Container, NoSsr, LinearProgress, withStyles, InputBase } from '@material-ui/core'
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
        let typeError = '';
        let businessAddressError = '';
        let businessDescError = '';

        if (!this.props.values.businessName) {
            businessNameError = "Business name cannot be blank"
        }

        if (!this.props.values.type) {
            typeError = "Business type cannot be blank"
        }

        if (!this.props.values.businessAddress) {
            businessAddressError = "Business address cannot be blank"
        }

        if (!this.props.values.businessDesc) {
            businessDescError = "Business description cannot be blank"
        }

        if (businessNameError || typeError || businessAddressError || businessDescError) {
            this.setState({ businessNameError, typeError, businessAddressError, businessDescError })
            return false;
        }

        return true;
    }


    continue = e => {
        const isValid = this.validate()
        console.log('asdsad')
        if (isValid) {
            this.setState(initialState)
            console.log('asdsad')
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
                            <label htmlFor="businessName">Business Name</label>
                                <div className="input-field">
                                    <input type="text" id='businessName' placeholder="Enter business name" onChange={handleChange('businessName')} defaultValue={values.businessName} />
                                </div>
                                <div style={{ fontSize: 11, color: "red" }}> {this.state.businessNameError} </div>
                            </div>
                            <div className="form-group" style={{textAlign: 'center', alignSelf: 'stretch'}}>
                            <label htmlFor="businessName">Business Type</label>
                            <br/>
                                <FormControl variant="outlined" className="form-group">
                                <InputLabel id="businessType"></InputLabel>
                                    <Select
                                        labelId="businessType"
                                        id="type"
                                        defaultValue={" "}
                                        value={values.type}
                                        style={{minWidth:"200px"}}
                                        onChange={handleChange('type')}
                                    >

                                        <MenuItem value={"supplier"}>Supplier</MenuItem>
                                        <MenuItem value={"retailer"}>Retailer</MenuItem>
                                        <MenuItem value={"customer"}>Customer</MenuItem>

                                    </Select>
                                </FormControl>
                                <div style={{ fontSize: 11, color: "red" }}> {this.state.typeError} </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="businessAddress">Business Address</label>
                                <div className="input-field">
                                    <input type="text" id='businessAddress' placeholder="Enter business address" onChange={handleChange('businessAddress')} defaultValue={values.businessDesc} />
                                    <div style={{ fontSize: 11, color: "red" }}> {this.state.businessAddressError} </div>
                                </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="businessWebsite">Business Website (optional)</label>
                                <div className="input-field">                                    
                                    <input type="text" id='businessWebsite' placeholder="Enter business website (optional)" onChange={handleChange('businessWebsite')} defaultValue={values.businessWebsite} />
                                </div>
                            </div>

                            <div className="form-group">
                            <label htmlFor="businessDesc">Business Description</label>
                                <div className="input-field">
                                    <input type="text" id='businessDesc' placeholder="Enter business description" onChange={handleChange('businessDesc')} defaultValue={values.businessDesc} />
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

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import { Container, NoSsr, LinearProgress, withStyles } from '@material-ui/core'
import StyledButton from '../layout/StyledButton'
import "./style.css"
import storageRef from '../../index';
import FormSignUp from './FormSignUp'
import FormCertificate from './FormCertificate'
import Confirm from './Confirm'
import Success from './Success'
import { v4 as uuidv4 } from 'uuid';
import {uploadToStorage} from '../store/actions/uploadAction'
class SignUp extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        image: null,
        cetificate: '',
        progress: 0,

    }
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = input => e => {
        e.preventDefault();
        this.setState({ [input]: e.target.value })
        if (e.target.files) {
                const image = e.target.files[0];
                this.setState(() => ({image}));
                console.log(image)
        }
        

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    handleUpload = (e) => {
        e.preventDefault();
        const {image} = this.state;
        if(image!== undefined&& image!== null){
            // need a image and a path
            const file={
                image,
                path: '/images/certificates/'
            }
            // new upload
            this.props.uploadToStorage(file)
            
            
        }
    }
    // update state
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.certificate!==this.props.certificate) {
            console.log('welp that work')
          this.setState({certificate:this.props.certificate})
        }
        if (prevProps.progress!==this.props.progress) {
            console.log('loading work')
          this.setState({progress:this.props.progress})
          if (this.props.progress==='100'||this.props.progress===100){
            this.nextStep();
        }
        }
        // console.log('??',this.props.certificate)
      }
      static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.cetificate!==prevState.cetificate){
          return { cetificate: nextProps.cetificate};
       }
       else if (nextProps.progress!==prevState.progress){
        return { progress: nextProps.progress};
       }
       else return null;
     }

    render() {
        const { step, firstName, lastName, email, password, phoneNumber,image,url,progress} = this.state;
        const { auth, authError } = this.props;
        const values = { firstName, lastName, email, password, phoneNumber,image,url,progress }
        if (auth.uid) return <Redirect to='/' />

        switch (step) {
            case 1:
                return (
                    <FormSignUp
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <FormCertificate
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleUpload={this.handleUpload}
                        values={values}

                    />
                )
            case 3:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleSubmit={this.handleSubmit}
                        values={values}
                    />
                )
            case 4:
                return (
                   <Success
                       prevStep={this.prevStep}
                   />
                )
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        //get payload
        certificate: state.uploadReducer.url,
        progress: state.uploadReducer.progress,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        uploadToStorage:(file)=>dispatch(uploadToStorage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
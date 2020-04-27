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
class SignUp extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        image: null,
        url: '',
        progress: 0,
        token: uuidv4(),

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
        const {image,token} = this.state;
        if(image!== undefined&& image!== null){
        const uploadTask = storageRef.ref(`images/certificates/${image.name+token}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progress function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({progress});
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
      () => {
          // complete function ....
          storageRef.ref('images/certificates').child(image.name+token).getDownloadURL().then(url => {
              console.log(url);
              this.setState({url});
              this.nextStep()
          })
      });}
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
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
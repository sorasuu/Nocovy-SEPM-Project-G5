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
        images: [],
        cetificate: [],
        progress: 0,
        businessName: '',
        businessGenre: '',
        businessDesc:''

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
        // if (e.target.files) {
        //     const images= []
        //           images.push(e.target.files);
                  
        //         this.setState({images:images});
        //         console.log(images)
        // }
        

    }
    handleChangeImg(files){
        console.log(files)
        this.setState({
          images: files
        });
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    handleUpload = (e) => {
        e.preventDefault();
        
        const {images} = this.state;
        console.log(images)
        if(images!== undefined&& images!== null){
            // need a image and a path
            var i;
            for (i in images){

            const file={
               image: images[i],
                path: '/images/certificates/'
            }
            // new upload
            this.props.uploadToStorage(file)
        }
            
        }
    }
    // update state
    componentDidUpdate(prevProps, prevState) {
        console.log(this.props)
        if (prevProps.certificate!==this.props.certificate) {
            console.log('welp that work')
          this.setState({certificate:this.props.certificate})
        }
        if (prevProps.progress!==this.props.progress) {
            console.log('loading work')
          this.setState({progress:this.props.progress})
        }
        if(this.props.certificate.length=== this.state.images.length&& this.props.certificate.length>0&&this.state.step===2){
            this.nextStep();}
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
                        handleChangeImg={this.handleChangeImg.bind(this)}
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
var cerurls = new Set()
const mapStateToProps = (state) => {
    console.log(state)
    const url = state.uploadReducer.url ? state.uploadReducer.url:null
    var logo= null
    
    if(url!==undefined&& url!==null){
    if (url.path==='/images/certificates/'){
        cerurls=cerurls.add(url.url)
    }else if(url.path==='/images/certificates/'){
        logo =url.url
    }
}
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        //get payload
        certificate: Array.from(cerurls),
        progress: state.uploadReducer.progress,
        logo: logo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        uploadToStorage:(file)=>dispatch(uploadToStorage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

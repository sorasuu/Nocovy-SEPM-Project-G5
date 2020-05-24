import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../store/actions/authActions'
import "./style.css"
import FormSignUp from './FormSignUp'
import FormCertificate from './FormCertificate'
import Confirm from './Confirm'
import Success from './Success'
import { uploadToStorage } from '../store/actions/uploadAction'

class SignUp extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        logoImg:null,
        images: [],
        cetificate: [],
        progress: 0,
        businessName: '',
        businessGenre: '',
        businessDesc: ''

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
    }
    handleChangeImg(files) {
        this.setState({
            images: files
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const userInfo={
            ...this.state,
            logo: this.props.logo
        }
        console.log(userInfo)
        this.props.signUp(userInfo);
    }
    handleUpload = (e) => {
        e.preventDefault();

        const { images } = this.state;
        console.log(images)
        if (images !== undefined && images !== null) {
            // need a image and a path
            var i;
            for (i in images) {

                const file = {
                    image: images[i],
                    path: '/images/certificates/'
                }
                // new upload
                this.props.uploadToStorage(file)
            }

        }
    }

    handleChangeAvatar=(e)=> {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({logoImg:image});
          }
    }

    handleUploadAvatar = (e) => {
        e.preventDefault();
        const { logoImg } = this.state;
        if (logoImg !== undefined && logoImg !== null) {
            // need a image and a path
                const file = {
                    image: logoImg,
                    path: '/images/logo/'
                }
                // new upload
                this.props.uploadToStorage(file)
            

        }
    }
    // update state
    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props)
        if (prevProps.certificates !== this.props.certificates) {
            console.log('cetificate')
            this.setState({ certificates: this.props.certificates })
        }

        if (prevProps.progress !== this.props.progress) {
            console.log('loading work')
            this.setState({ progress: this.props.progress })
        }
        if (this.props.certificates.length === this.state.images.length && this.props.certificates.length >= 1 && this.state.step === 2) {
            this.nextStep();
        }
        // console.log('??',this.props.certificate)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.cetificate !== prevState.cetificate) {
            return { cetificate: nextProps.cetificate };
        }
        else if (nextProps.progress !== prevState.progress) {
            return { progress: nextProps.progress };
        }
        else return null;
    }

    render() {
        const { step, firstName, lastName, email, password, phoneNumber, images, url, progress } = this.state;
        const { auth, authError } = this.props;
        const values = { firstName, lastName, email, password, phoneNumber, images, url, progress }
        if (auth.uid) return <Redirect to='/' />
        switch (step) {
            case 1:
                return (
                    <FormSignUp
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        handleChangeAvatar={this.handleChangeAvatar}
                        handleUploadAvatar={this.handleUploadAvatar}
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
const mapStateToProps = (state,ownProps) => {
    // console.log(state)
    // console.log(ownProps)
    const url = state.uploadReducer.url ? state.uploadReducer.url : null
    var logo = null

    if (url !== undefined && url !== null) {
        if (url.path === '/images/certificates/') {
            cerurls = cerurls.add(url.url)
        } 
        if (url.path === '/images/logo/') {

            logo = url.url
            sessionStorage.setItem("logo", logo);
        }
    }
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        //get payload
        certificates: Array.from(cerurls),
        progress: state.uploadReducer.progress,
        logo: sessionStorage.getItem("logo")
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds)),
        uploadToStorage: (file) => dispatch(uploadToStorage(file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
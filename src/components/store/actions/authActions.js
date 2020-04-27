import firebase from 'firebase/app';
// import firestore from '../../../index' 
export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}

export const signOut = () => {
  return (dispatch, getState) => {


    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email, 
      newUser.password
    ).then(resp => {
      return firebase.firestore().collection('users').doc(resp.user.uid).set({
        displayName: newUser.firstName +" "+newUser.lastName,
        email:  newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phoneNumber: newUser.phoneNumber,
        // image: newUser.image,
        certificate: newUser.certificate,
      });
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' });
      // var user = firebase.auth().currentUser;
      // user.sendEmailVerification().then(function() {
      // console.log("Email Sent")
      // }).catch(function(error) {
      // console.log("Email Sent failed ",error)
      // });
    })
    .catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}

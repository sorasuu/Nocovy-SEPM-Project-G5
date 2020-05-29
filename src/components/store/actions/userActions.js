import firebase from 'firebase/app';

export const editUser = (user) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('users').doc(user.id).set({
        ...user,
      }, {merge: true}).then(() => {
        dispatch({ type: 'EDIT_USER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_USER_ERROR' }, err);
      });
    }
  };
  

export const displayRetailer = (id) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('users').doc(id)
      .then(()=>{
      dispatch({type: 'READ_RETAILER_SUCCESS'});
      }).catch(err =>{
        dispatch({type:"READ_RETAILER_ERROR"}, err);
      });
    }
  }

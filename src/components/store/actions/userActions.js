
import firebase from 'firebase/app';
import firestore from '../../../index' 

export const editUser = (user) => {
    return (dispatch, getState) => {
      firestore.collection('users').doc(user.id).set({
        ...user,
      }).then(() => {
        dispatch({ type: 'EDIT_USER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_USER_ERROR' }, err);
      });
    }
  };
import firebase from 'firebase/app';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';


export const approveUser = (id) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('users').doc(id).update({
        pending:false,
        verify: true,
      }).then(() => {
        dispatch({ type: 'APPROVE_USER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'APPROVE_USER_ERROR' }, err);
      });
    }
  };
  export const declineUser = (id) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('users').doc(id).update({
        pending:false,
        verify: false,
        cancel:true,
      }).then(() => {
        dispatch({ type: 'DECLINE_USER_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'DECLINE_USER_ERROR' }, err);
      });
    }
  };

  
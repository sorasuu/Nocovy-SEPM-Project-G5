import firebase from 'firebase/app';

export const createTransaction = (transaction) => {
    return (dispatch, getState ) => {
      const profile = getState().firebase.profile;
      const author = getState().firebase.auth;
      firebase.firestore().collection('transactions').add({
        ...transaction,
        buyerName: profile.displayName,
        buyerId: author.uid,
        buyerEmail: author.email,
        buyerPhotoURL: author.photoURL,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_TRANSACTION_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_TRANSACTION_ERROR' }, err);
      });
    }
  };
  
export const editTransaction = (transaction) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('transactions').doc(transaction.id).set({
        ...transaction,
      }).then(() => {
        dispatch({ type: 'EDIT_TRANSACTION_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_TRANSACTION_ERROR' }, err);
      });
    }
  };
export const deleteTransaction = (transaction) => {
return (dispatch, getState) => {
  firebase.firestore().collection('transactions').doc(transaction.id).delete()
    .then(() => {
    dispatch({ type: 'DELETE_TRANSACTION_SUCCESS' });
    }).catch(err => {
    dispatch({ type: 'DELETE_TRANSACTION_ERROR' }, err);
    });
    }
  };
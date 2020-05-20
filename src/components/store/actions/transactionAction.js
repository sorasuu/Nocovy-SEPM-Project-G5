import firebase from 'firebase/app';


export const createCheckout = (orders) => {
    return (dispatch, getState ) => {
      
      const author = getState().firebase.auth;
      firebase.firestore().collection('users').doc(author.uid).collection('orders').add({
        orders:orders,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_TRANSACTION_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_TRANSACTION_ERROR' }, err);
      });
    }
  };
  

export const createRequest = (requests) => {
return (dispatch, getState) => {
  const supplier = getState().firebase.auth;
  firebase.firestore().collection('requests').add(
{
  pending:true,
  confirmed : false,
  products:requests.orders,
  retailerId: requests.retailerId,
  supplierId: supplier.uid,
  
}
  )
    .then(() => {
    dispatch({ type: 'DELETE_TRANSACTION_SUCCESS' });
    }).catch(err => {
    dispatch({ type: 'DELETE_TRANSACTION_ERROR' }, err);
    });
    }
  };
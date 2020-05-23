import firebase from 'firebase/app';
import {registerRetailers} from './productAction'

export const createCheckout = (orders) => {
  return (dispatch, getState) => {
    const author = getState().firebase.auth;
    firebase.firestore().collection('users').doc(author.uid).collection('orders').add({
      orders: orders,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ORDER_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_CHECK_ERROR' }, err);
    });
  }
};

export const createSingleRequest = (requests) => {
  return (dispatch, getState) => {
    const supplier = getState().firebase.auth;
    firebase.firestore().collection('requests').doc(requests.product.id+requests.retailerId).set(
      {pending:true,
        confirmed: false,
        productId: [requests.product.id],
        retailerId: requests.retailerId,
        supplierId: supplier.uid,
        createdAt: new Date()
      }
    )
      .then(() => {
        dispatch({ type: 'CREATE_SINGLE_REQUEST' });
      }).catch(err => {
        dispatch({ type: 'CREATE_SINGLE_REQUEST_ERROR' }, err);
      });
  }
};
export const createListRequest = (requests) => {
  return (dispatch, getState) => {
    const supplier = getState().firebase.auth;
    firebase.firestore().collection('requests').add(
      {
        pending: true,
        confirmed: false,
        products: requests.products,
        retailerId: requests.retailerId,
        supplierId: supplier.uid,
        createdAt: new Date()
      }
    )
      .then(() => {
        dispatch({ type: 'CREATE_LIST_REQUEST' });
      }).catch(err => {
        dispatch({ type: 'CREATE_LIST_REQUEST_ERROR' }, err);
      });
  }
};
export const declineRequest = (requests) => {
  return (dispatch, getState) => {
    firebase.firestore().collection('requests').doc(requests.id).update(
      {
        confirmed: false,
        pending: false,
      }
    )
      .then(() => {
        dispatch({ type: 'DECLINE_REQUEST' });
      }).catch(err => {
        dispatch({ type: 'DECLINE_ERROR' }, err);
      });
  }
};

export const acceptRequest = (requests) => {
  return (dispatch, getState) => {
    const author = getState().firebase.auth;
    console.log(requests)
    firebase.firestore().collection('requests').doc(requests.id).update(
      {
        confirmed: true,
        pending: false,
      }
    )
      .then(() => {
       
        dispatch({ type: 'ACCPEPT_REQUEST' });
        
      }).catch(err => {
        dispatch({ type: 'ACCPEPT_REQUEST_ERROR' }, err);
      });
  }
};
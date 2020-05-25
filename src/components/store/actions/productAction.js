import firebase from 'firebase/app';
import { number } from 'prop-types';


export const createProduct = (product) => {
    return (dispatch, getState ) => {

      const author = getState().firebase.auth;
      firebase.firestore().collection('products').add({
        ...product,
        authorEmail: author.email,
        retailerId:[],
        createdAt: new Date()
      }).then(() => {
       
        dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PRODUCT_ERROR' }, err);
      });
    }
  };
  
export const deliverProductToCart = (carts)=>{
  return(dispatch)=>{
    var cartfromlocal = JSON.parse(localStorage.getItem('cart'));
    var numberOfItem;
    if(cartfromlocal===undefined||cartfromlocal===null||cartfromlocal===[]){
      numberOfItem=0
    }else{
      numberOfItem= cartfromlocal.length

    }
    const cart = {count:numberOfItem, products:cartfromlocal}
    console.log('redux cart',cart)
    dispatch({type:'PRODUCT_TO_CART',payload:cart})

  }
}
export const registerRetailers = (id) => {
  
  return (dispatch, getState) => {
    const author = getState().firebase.auth;
    firebase.firestore().collection('products').doc(id).update({
      retailerId:firebase.firestore.FieldValue.arrayUnion(author.uid)
    }).then(() => {
      dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'EDIT_PRODUCT_ERROR' }, err);
    });
  }
};
export const editProduct = (product) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('products').doc(product.id).set({
        ...product,
      }, {merge: true}).then(() => {
        dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_PRODUCT_ERROR' }, err);
      });
    }
  };
  export const editDetails = (details) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('products').doc(details.id).update({
        detail: details.details
      }).then(() => {
        dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_PRODUCT_ERROR' }, err);
      });
    }
  };
export const deleteProduct = (id) => {
return (dispatch, getState) => {
  firebase.firestore().collection('products').doc(id).delete()
    .then(() => {
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS' });
    }).catch(err => {
    dispatch({ type: 'DELETE_PRODUCT_ERROR' }, err);
    });
    }
  };
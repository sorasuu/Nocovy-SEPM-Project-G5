import firebase from 'firebase/app';
import { number } from 'prop-types';


export const createProduct = (product) => {
    return (dispatch, getState ) => {
      const profile = getState().firebase.profile;
      const author = getState().firebase.auth;
      firebase.firestore().collection('products').add({
        ...product,
        authorName: profile.displayName,
        // authorId: author.uid,
        authorEmail: author.email,
        // authorPhotoURL: author.photoURL,
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

export const editProduct = (product) => {
    return (dispatch, getState) => {
      firebase.firestore().collection('products').doc(product.id).set({
        ...product,
      }).then(() => {
        dispatch({ type: 'EDIT_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_PRODUCT_ERROR' }, err);
      });
    }
  };
export const deleteProduct = (product) => {
return (dispatch, getState) => {
  firebase.firestore().collection('products').doc(product.id).delete()
    .then(() => {
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS' });
    }).catch(err => {
    dispatch({ type: 'DELETE_PRODUCT_ERROR' }, err);
    });
    }
  };
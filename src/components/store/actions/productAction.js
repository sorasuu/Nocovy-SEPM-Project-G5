import firebase from 'firebase/app';


export const createProduct = (product) => {
    return (dispatch, getState ) => {
      const profile = getState().firebase.profile;
      const author = getState().firebase.auth;
      firebase.firestore().collection('products').add({
        ...product,
        authorName: profile.displayName,
        authorId: author.uid,
        authorEmail: author.email,
        authorPhotoURL: author.photoURL,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PRODUCT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PRODUCT_ERROR' }, err);
      });
    }
  };
  
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
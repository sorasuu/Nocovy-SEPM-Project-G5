import firebase from 'firebase/app';


export const createProduct = (product) => {
    return (dispatch, getState ) => {

      const author = getState().firebase.auth;
      firebase.firestore().collection('products').add({
        ...product,
        authorEmail: author.email,
        createdAt: new Date()
      }).then(() => {
        firebase.firestore().collection('categories').doc('productcategories').set({
          categories: firebase.firestore.FieldValue.arrayUnion(product.category)
        })
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
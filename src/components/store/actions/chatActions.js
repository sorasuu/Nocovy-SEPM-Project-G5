import firebase from 'firebase/app';
import firestore from '../../../index' 

export const createChat = (chat) => {
    return (dispatch, getState ) => {
      const profile = getState().firebase.profile;
      const author = getState().firebase.auth;
      firestore.collection('chats').add({
        ...chat,
        senderName: profile.displayName,
        senderId: author.uid,
        senderEmail: author.email,
        senderPhotoURL: author.photoURL,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_CHAT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_CHAT_ERROR' }, err);
      });
    }
  };
  
export const editChat = (chat) => {
    return (dispatch, getState) => {
      firestore.collection('chats').doc(chat.id).set({
        ...chat,
      }).then(() => {
        dispatch({ type: 'EDIT_CHAT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_CHAT_ERROR' }, err);
      });
    }
  };
export const deleteChat = (chat) => {
return (dispatch, getState) => {
    firestore.collection('chats').doc(chat.id).delete()
    .then(() => {
    dispatch({ type: 'DELETE_CHAT_SUCCESS' });
    }).catch(err => {
    dispatch({ type: 'DELETE_CHAT_ERROR' }, err);
    });
    }
  };
import firebase from 'firebase/app';
import history from '../../utils/history'
export const createChatSession = (chat) => {
    return (dispatch, getState ) => { 
      console.log('run')
      firebase.firestore().collection('chats').doc(chat.id).set({
        ...chat,
        createdAt: new Date(),
        lastMod: new Date()
      }).then(() => {
        history.push('/chat/'+chat.id)
        window.location.reload();
        dispatch({ type: 'CREATE_CHAT_SUCCESS'});

      }).catch(err => {
        dispatch({ type: 'CREATE_CHAT_ERROR' }, err);
      });
    }
  };
export const changeChatSession = (chatid)=>{
return(dispatch, getState)=>{
  dispatch({ type: 'CHANGECHATSESSION', payload:chatid });
}
}
export const sendMessage = (chat) => {
  console.log('send')
    return (dispatch, getState) => {
      const author = getState().firebase.auth;
      console.log(chat.message)
      firebase.firestore().collection('chats').doc(chat.id).update({
        lastByUser: author.uid,
        lastchat: chat.message.context,
        lastMod: new Date()
      }).then(() => {
        firebase.firestore().collection('chats').doc(chat.id).collection('chatDetail').add({
          ...chat.message,
          sender:author.uid,
          created: new Date()
        }).then(() => {
          dispatch({ type: 'CHAT_SUCCESS' });
        }).catch(err => {
          dispatch({ type: 'CHAT_ERROR' }, err);
        });
        dispatch({ type: 'EDIT_CHAT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'EDIT_CHAT_ERROR' }, err);
      });

      
    }
  };

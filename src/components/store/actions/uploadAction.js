import React from 'react'
import storageRef  from '../../../index' 
import { v4 as uuidv4 } from 'uuid';
export const uploadToStorage = (file) => {
    return (dispatch, getState) => {
      const token = uuidv4();
      const uploadTask = storageRef.ref(`${file.path+file.image.name+token}`).put(file.image);
        uploadTask.on('state_changed', 
        (snapshot) => {
          // progress function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          dispatch({ type: 'UPLOADING', payload: progress });
        }, 
        (error) => {
             // error function ....
          console.log(error);
        }, 
      () => {
          // complete function ....
          storageRef.ref(file.path).child(file.image.name+token).getDownloadURL().then(url => {
              console.log(url);

            dispatch({ type: 'UPLOAD_SUCCESS', payload: url });
          }).catch(err => {
            dispatch({ type: 'UPLOAD_ERROR' }, err);
          })
   
      });
    }
  };
  
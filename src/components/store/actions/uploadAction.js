import React from 'react'
import storageRef  from '../../../index' 

export const uploadToStorage = (file) => {
    return (dispatch, getState) => {
        var metadata = {
            contentType: file.metadata,
          };
       const uploadTask = storageRef.child(file.path).put(file.file,metadata).then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
          });
        dispatch({ type: 'UPLOAD_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'UPLOAD_ERROR' }, err);
      });
    }
  };
  
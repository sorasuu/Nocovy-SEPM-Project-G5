const initState = {}

const uploadReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOADING':
      console.log('uploading');
      return {...state, progress : action.payload};
    case 'UPLOAD_SUCCESS':
      console.log('create file success');
      return {...state, url : action.payload};
    case 'UPLOAD_ERROR':
      console.log('create file error');
      return state;
    default:
      return state;
  }
};

export default uploadReducer;
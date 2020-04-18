const initState = {}

const uploadReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOAD_SUCCESS':
      console.log('create file success');
      return state;
    case 'UPLOAD_ERROR':
      console.log('create file error');
      return state;
    default:
      return state;
  }
};

export default uploadReducer;
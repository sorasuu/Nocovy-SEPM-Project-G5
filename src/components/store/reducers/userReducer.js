const initState = {}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    // case 'EDIT_USER_SUCCESS':
    //   console.log('create user success');
    //   return state;
    case 'EDIT_USER_SUCCESS':
      console.log('create user success');
      return state;
    case 'EDIT_USER_ERROR':
      console.log('create user error');
      return state;
    default:
      return state;
  }
};

export default userReducer;
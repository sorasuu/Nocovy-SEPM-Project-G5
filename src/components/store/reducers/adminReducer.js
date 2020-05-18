const initState = {}

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case 'APPROVE_USER_SUCCESS':
      console.log('approved');
      return state;
    case 'DECLINE_USER_SUCCESS':
      console.log('create file success');
      return state;
    case 'CREATE_EMAIL_SUCCESS':
      console.log('email sent');
      return state;
    case 'CREATE_EMAIL_ERROR':
      console.log('email error');
      return state;
    case 'APPROVE_USER_ERROR':
      console.log('approve error');
      return state;
    case 'DECLINE_USER_ERROR':
      console.log('decline error');
      return state;
    default:
      return state;
  }
};

export default adminReducer;
const initState = {}

const transactionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TRANSACTION_SUCCESS':
        console.log('create transaction success');
        return state;
    case 'CREATE_TRANSACTION_ERROR':
        console.log('create transaction error');
        return state;
    case 'EDIT_TRANSACTION_SUCCESS':
        console.log('edit transaction success');
        return state;
    case 'EDIT_TRANSACTION_ERROR':
        console.log('edit transaction error');
        return state;
    case 'DELETE_TRANSACTION_SUCCESS':
        console.log('delete transaction success');
        return state;
    case 'DELETE_TRANSACTION_ERROR':
        console.log('delete transaction error');
        return state;
    default:
        return state;
  }
};

export default transactionReducer;
const initState = {}

const transactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_ORDER_SUCCESS':
            console.log('create order success');
            return state;
        case 'CREATE_CHECK_ERROR':
            console.log('create transaction error');
            return state;
        case 'CREATE_SINGLE_REQUEST':
            console.log('edit transaction success');
            return state;
        case 'CREATE_SINGLE_REQUEST_ERROR':
            console.log('edit transaction error');
            return state;
        case 'CREATE_LIST_REQUEST':
            console.log('delete transaction success');
            return state;
        case 'CREATE_LIST_REQUEST_ERROR':
            console.log('delete transaction error');
            return state;
        case 'ACCPEPT_REQUEST':
            console.log('delete transaction success');
            return state;
        case 'ACCPEPT_REQUEST_ERROR':
            console.log('delete transaction error');
            return state;
        case 'DECLINE_REQUEST':
            console.log('delete transaction success');
            return state;
        case 'DECLINE_ERROR':
            console.log('delete transaction error');
            return state;
        default:
            return state;
    }
};

export default transactionReducer;
const initState = {}

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PRODUCT_SUCCESS':
        console.log('create product success');
        return state;
    case 'CREATE_PRODUCT_ERROR':
        console.log('create product error');
        return state;
    case 'EDIT_PRODUCT_SUCCESS':
        console.log('edit product success');
        return state;
    case 'EDIT_PRODUCT_ERROR':
        console.log('edit product error');
        return state;
    case 'DELETE_PRODUCT_SUCCESS':
        console.log('delete product success');
        return state;
    case 'DELETE_PRODUCT_ERROR':
        console.log('delete product error');
        return state;
    default:
        return state;
  }
};

export default productReducer;
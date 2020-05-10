const initState = {}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CHAT_SUCCESS':
            console.log('created chat session');
            return state;
        case 'CREATE_CHAT_ERROR':
            console.log('create chat error');
            return state;
        case 'CHANGECHATSESSION':
            console.log('change chat as');
            return { ...state, chatId: action.payload };
        case 'CHAT_SUCCESS':
            console.log('sent message');
            return state;
        case 'CHAT_ERROR':
            console.log('create message error');
            return state;
        default:
            return state;
    }
};

export default chatReducer;
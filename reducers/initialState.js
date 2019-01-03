

const initState = ( state = [], action) => {

    switch (action.type) {
        case 'LOAD_STUDENT':
            return {
                ...state,
                studentsList: action.payload
            };
        case 'LOAD_HOME':
            return {
                ...state,
                homeList: action.payload
            };
        case 'LOAD_HOME_AND_USERS':
            return {
                ...state,
                homeAndUsers: action.payload
            };
        case 'SET_TITLE_GROUP':
            return {
                ...state,
                header: action.payload.name
            };
        default: return state
    }
};

export default initState;
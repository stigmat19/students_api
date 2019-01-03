const initialState = [
    'Smells like spirit',
    'Enter Sandman'
];

const playlist = (state = initialState, action) => {
    if (action.type === 'ADD_TRACK') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
};


export default playlist;

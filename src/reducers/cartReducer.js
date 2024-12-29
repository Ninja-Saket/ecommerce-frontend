let initialState = []

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_TO_CART": 
            return action.payload;
        default:
            return state;
    }
}

export default cartReducer
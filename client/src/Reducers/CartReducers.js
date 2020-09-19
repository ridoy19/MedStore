export const initialState = {
    items: [],
    quantity: 0,
    total: 0
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            // Code for adding item to cart

            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'REMOVE_ITEM_FROM_CART':
            // Code for remove item from cart
            return { state };
        case 'REMOVE_CART':
            // Code for removing all item from cart
            break;
        case 'FETCH_ITEMS_FROM_CART':
                // Code for remove item from cart
                return {
                    ...state,
                    items: action.payload,
                  }
        default:
            return state;
    }
}

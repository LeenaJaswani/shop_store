
const Storage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
}

export const CartReducer = (state, action) => {
    let index = -1;
    if (action.payload) {
        index = state.cartItems.findIndex(x => x.id === action.payload.id);
    }

    switch (action.type) {
        case "ADD":
        case "INCQTY": {
            let newItems;
            if (index === -1) {
                newItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            } else {
                newItems = state.cartItems.map((item, idx) =>
                    idx === index ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            Storage(newItems);
            return { ...state, cartItems: newItems };
        }

        case "REMOVE": {
            const newItems = state.cartItems.filter((_, idx) => idx !== index);
            Storage(newItems);
            return { ...state, cartItems: newItems };
        }

        case "DECQTY": {
            const newItems = state.cartItems.map((item, idx) =>
                idx === index ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            );
            Storage(newItems);
            return { ...state, cartItems: newItems };
        }

        case "CLEAR": {
            Storage([]);
            return { ...state, cartItems: [] };
        }

        default:
            return state;
    }
};

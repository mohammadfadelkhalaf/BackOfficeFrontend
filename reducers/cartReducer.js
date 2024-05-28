const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CART_DATA_SUCCESS':
        return {
          ...state,
          cartItems: action.payload,
          loading: false,
          error: null,
        };
      case 'ADD_TO_CART_SUCCESS':
        return {
          ...state,
          cartItems: action.payload,
          loading: false,
          error: null,
        };
      case 'REMOVE_FROM_CART_SUCCESS':
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.itemId
          ),
          loading: false,
          error: null,
        };
      // Add other cases for removing items, updating quantity, etc. if needed
      default:
        return state;
    }
  };
  
  export default cartReducer;
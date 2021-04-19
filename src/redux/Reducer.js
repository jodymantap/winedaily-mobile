import {combineReducers} from 'redux';

const initialState = {
  cartTotal: 0,
  isLogin: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'login': {
      return {
        ...state,
        isLogin: true,
        dataUser: action.payload,
      };
    }
    case 'addtocart':
      return {
        ...state,
        cartTotal: state.cartTotal + 1,
      };
    default:
      return state;
  }
};

export default combineReducers({auth});

import {LOGIN_USER,REGISTER_USER,LOGOUT_USER, AUTH_USER,ADD_TO_CART,GET_CART_DETAILS,REMOVE_CART_ITEM} from  '../Actions/types';

export default function(state={},action){
    // console.log('hi')

    switch(action.type){
        case LOGIN_USER:
            return {...state,loginUser:action.payload}

        case REGISTER_USER:
            return {...state,registerUser:action.payload}

        case AUTH_USER:
            return {...state,userData:action.payload}

        case LOGOUT_USER:
            return {...state}
        
        case ADD_TO_CART:
            return  {...state,cartInfo:action.payload}

        case GET_CART_DETAILS:
            return {...state,cartDetails:action.payload}

        case REMOVE_CART_ITEM:
            return {...state,
                cartDetails: action.payload.cartDetails,
                userData: {
                    ...state.userData,
                    
                    data:{
                        ...state.userData.data,
                        cart:action.payload.cart
                    }
                }
            }

    
        default :
            return state;

    }
}
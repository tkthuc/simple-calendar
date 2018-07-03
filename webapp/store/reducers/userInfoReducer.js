import { UPDATE_USER_INFO } from '../actions';


export default function userInfoReducer (state = {}, action) {
    switch (action.type) {
        case UPDATE_USER_INFO :             
            return {...state, ...action.userInfo};
        default:
            return state;
    }
}
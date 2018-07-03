import { UPDATE_SELECTED_DATE } from '../actions';


export default function todosReducer (state = { todos: {}, date: "" }, action) {
    switch (action.type) {
        case UPDATE_SELECTED_DATE :             
            return {...state, ...action.data};
        default:
            return state;
    }
}
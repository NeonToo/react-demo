/**
 * Created by I326950 on 6/28/2017.
 */
import { combineReducers } from 'redux';

function isLoading(state = false, action) {
    switch(action.type) {
        case "IS_LOADING":
            return action.isLoading;
        default:
            return state;
    }
}

const reducers = combineReducers({
    isLoading
});

export default reducers;
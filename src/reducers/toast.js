/**
 * Created by I326950 on 7/4/2017.
 */
import {ActionTypes} from './../actions';

const initialToast = {
    icon: 'weui-loading'
};

function toast(state = initialToast, action) {
    switch(action.type) {
        case ActionTypes.SET_TOAST:
            console.log("Dialog in dialog reducer: " + action.toast);
            return Object.assign({}, state, action.toast);
        default:
            return state;
    }
}

export default toast;
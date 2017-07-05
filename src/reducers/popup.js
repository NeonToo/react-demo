/**
 * Created by I326950 on 7/4/2017.
 */
import {ActionTypes, PopupComponents} from './../actions';

const initialPopup = {
    show: false,
    component: PopupComponents.TOAST
};

function popup(state = initialPopup, action) {
    switch (action.type) {
        case ActionTypes.IS_SHOWING:
            console.log("Show in popup reducer: " + action.isShowing);
            return {
                ...state,
                show: action.isShowing
            };
        case ActionTypes.SET_TOAST:
            console.log('Toast in popup reducer: ' + action.toast);
            return {
                ...state,
                component: PopupComponents.TOAST
            };
        case ActionTypes.SET_DIALOG:
            console.log('Dialog in popup reducer: ' + action.dialog.title);
            return {
                ...state,
                component: PopupComponents.DIALOG
            };
        case ActionTypes.SET_POPUP:
            console.log("Show in popup reducer: " + action.popup);
            return Object.assign({}, state, action.popup);
        default:
            return state;
    }
}

export default popup;
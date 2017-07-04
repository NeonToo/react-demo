/**
 * Created by I326950 on 7/4/2017.
 */
import { PopupComponents } from './../actions';

const initialPopup = {
    show: false,
    component: PopupComponents.TOAST
};

function popup(state = initialPopup, action) {
    switch(action.type) {
        case 'SET_POPUP':
            console.log("Popup in reducer: " + action.popup.show);
            return action.popup;
        default:
            return state;
    }
}

export default popup;
/**
 * Created by I326950 on 7/4/2017.
 */
import {ActionTypes} from './../actions';

const initialDialog = {
    title: '',
    buttons: []
};

function dialog(state = initialDialog, action) {
    switch(action.type) {
        case ActionTypes.SET_DIALOG:
            console.log("Dialog in dialog reducer: " + action.dialog.title);
            return Object.assign({}, state, action.dialog);
        default:
            return state;
    }
}

export default dialog;
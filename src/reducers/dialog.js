/**
 * Created by I326950 on 7/4/2017.
 */

const initialDialog = {
    title: '',
    buttons: []
};

function dialog(state = initialDialog, action) {
    switch(action.type) {
        case 'SET_DIALOG':
            return action.dialog;
        default:
            return state;
    }
}

export default dialog;
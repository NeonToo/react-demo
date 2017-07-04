/**
 * Created by I326950 on 7/4/2017.
 */
const initialToast = {
    icon: 'weui-loading'
};

function toast(state = initialToast, action) {
    switch(action.type) {
        case 'SET_TOAST':
            return action.toast;
        default:
            return state;
    }
}

export default toast;
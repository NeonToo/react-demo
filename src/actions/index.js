/**
 * Created by I326950 on 6/28/2017.
 */
import Toast from './../components/Toast';
import Dialog from './../components/Dialog';

export const PopupComponents = {
    TOAST: Toast,
    DIALOG: Dialog
};

export function setPopup(popup) {
    console.log("Popup in action: " + popup.show);
    return {
        type: "SET_POPUP",
        popup
    }
}

export function setToast(toast) {
    return {
        type: 'SET_TOAST',
        toast
    }
}

export function setDialog(dialog) {
    return {
        type: "SET_DIALOG",
        dialog
    }
}
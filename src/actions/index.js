/**
 * Created by I326950 on 6/28/2017.
 */
import Toast from './../components/Toast';
import Dialog from './../components/Dialog';

export const ActionTypes = {
    IS_SHOWING: 'IS_SHOWING',
    SET_POPUP: 'SET_POPUP',
    SET_TOAST: 'SET_TOAST',
    SET_DIALOG: 'SET_DIALOG',
};

export const PopupComponents = {
    TOAST: Toast,
    DIALOG: Dialog
};

export function isShowing(isShowing) {
    console.log("Show in action: " + isShowing);
    return {
        type: ActionTypes.IS_SHOWING,
        isShowing
    };
}

export function setPopup(popup) {
    console.log("Popup in action: " + popup);
    return {
        type: ActionTypes.SET_POPUP,
        popup
    }
}

export function setToast(toast) {
    console.log("Toast in action: " + toast);
    return {
        type: ActionTypes.SET_TOAST,
        toast
    }
}

export function setDialog(dialog) {
    console.log("Dialog in action: " + dialog.title);
    return {
        type: ActionTypes.SET_DIALOG,
        dialog
    }
}
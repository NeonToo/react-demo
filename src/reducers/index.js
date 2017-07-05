/**
 * Created by I326950 on 6/28/2017.
 */
import { combineReducers } from 'redux';
import popup from './popup';
import toast from './toast';
import dialog from './dialog';

const reducers = combineReducers({
    popup,
    toast,
    dialog
});

export default reducers;
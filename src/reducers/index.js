/**
 * Created by I326950 on 6/28/2017.
 */
import { combineReducers } from 'redux';
import popup from './popup';
import dialog from './dialog';

const reducers = combineReducers({
    popup,
    dialog
});

export default reducers;
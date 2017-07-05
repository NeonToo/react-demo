/**
 * Created by I326950 on 6/28/2017.
 */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// import { syncHistoryWithStore } from 'react-router-redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
import 'weui';
import { setPopup, setToast, setDialog } from './actions';

const store = createStore(reducers);
// const dispatch = store.dispatch;
//
// dispatch(setDialog({
//     title: 'Set Dialog Test',
//     buttons: []
// }));
const state = store.getState();
const popup = state.popup;
const PopupComponent = popup.component;
// const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
    <Provider store={store}>
        <div>
            <PopupComponent show={popup.show}>加载中...</PopupComponent>
            <Router history={history} children={routes} />
        </div>
    </Provider>,
    document.getElementById('root')
);
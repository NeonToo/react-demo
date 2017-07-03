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
import Toast from './components/Toast';

const store = createStore(reducers);
const state = store.getState();
// const history = syncHistoryWithStore(createBrowserHistory(), store);
// console.log(store.getState());

render(
    <Provider store={store}>
        <div>
            <Toast show={state.isLoading}>加载中...</Toast>
            <Router history={history} children={routes} />
        </div>
    </Provider>,
    document.getElementById('root')
);
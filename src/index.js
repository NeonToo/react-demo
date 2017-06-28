/**
 * Created by I326950 on 6/28/2017.
 */
import React from 'react';
import {render} from 'react-dom';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import App from './App';
// import reducers from './reducers';
import WeUI from 'weui';

const rootElement = document.getElementById('root');
// const store = createStore(reducers);
const tabbars = [
    {
        name: "Category",
        path: "/categories"
    },
    {
        name: "Component",
        path: "/components"
    },
    {
        name: "Customer",
        path: "/customers"
    },
    {
        name: "Me",
        path: "/me"
    }
];

render(
    <App items={tabbars} />,
    rootElement
);

// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     rootElement
// );
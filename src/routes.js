/**
 * Created by I326950 on 6/30/2017.
 */
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import App from './containers/App';
import Error from './views/Error';
import Toast from './views/Toast';

const routes = (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/error" component={Error} />
        <Route path="/toast" component={Toast} />
    </Switch>
);

export default routes;
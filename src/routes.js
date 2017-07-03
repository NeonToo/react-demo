/**
 * Created by I326950 on 6/30/2017.
 */
import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import App from './containers/App';
import Error from './views/Error';
import ToastDemo from './views/ToastDemo';
import ButtonDemo from './views/ButtonDemo';
import DialogDemo from './views/DialogDemo';

const routes = (
    <Switch>
        <Route exact path="/" component={App} />
        <Route path="/error" component={Error} />
        <Route path="/toast" component={ToastDemo} />
        <Route path="/button" component={ButtonDemo} />
        <Route path="/dialog" component={DialogDemo} />
    </Switch>
);

export default routes;
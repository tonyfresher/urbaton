import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link, browserHistory } from "react-router-dom";

import App from 'components/app';
import List from 'pages/list';
import Create from 'pages/create';
import Issue from 'pages/issue';

class AppRouter extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Redirect to="/list" />
                    <Route path="/list" component={List} />
                    <Route path="/create" component={Create} />
                    <Route path="/issue/:id" component={Issue} />
                    {/* <Route path="*" component={Error} status={404} /> */}
                </Route>
            </Router>
        );
    }
}

export default AppRouter;

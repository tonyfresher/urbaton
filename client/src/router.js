import React from 'react';
import {
    BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';

import App from './components/app';
import ListPage from './pages/list';
import IssuePage from './pages/issue';
import CreatePage from './pages/create';

class AppRouter extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Redirect exact from="/" to="/list" />
                        <Route path="/list" component={ListPage} />
                        <Route path="/issue/:id" component={IssuePage} />
                        <Route path="/create" component={CreatePage} />
                        {/* <Route path="*" component={Error} status={404} /> */}
                    </Switch>
                </App>
            </Router>
        );
    }
}

export default AppRouter;

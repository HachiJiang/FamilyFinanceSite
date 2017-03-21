import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import RecordPage from './containers/RecordPage';
import BudgetPage from './containers/BudgetPage';
import DashboardPage from './containers/DashboardPage';
import AccountPage from './containers/AccountPage';
import ProfilePage from './containers/ProfilePage';
import NotFoundPage from './containers/NotFoundPage';

export default function createRoutes() {
    return (
        <Route component={ App } >
            <Route path="/" component={ HomePage } />
            <Route path="records" component={ RecordPage } />
            <Route path="budget" component={ BudgetPage } />
            <Route path="dashboards" component={ DashboardPage } />
            <Route path="account" component={ AccountPage } />
            <Route path="profile" component={ ProfilePage } />
            <Route path="*" component={ NotFoundPage } />
        </Route>
    );
}
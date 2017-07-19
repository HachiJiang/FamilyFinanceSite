import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import SummaryPage from './containers/SummaryPage';
import RecordPage from './containers/RecordPage';
import BudgetPage from './containers/BudgetPage';
import DashboardPage from './containers/DashboardPage';
import AccountPage from './containers/AccountPage';
import ProfilePage from './containers/ProfilePage';
import NotFoundPage from './containers/NotFoundPage';

export default function createRoutes() {
    return (
        <Route path="/" component={ App } >
            <IndexRedirect to="summary" />
            <Route path="summary" component={ SummaryPage } />
            <Route path="records" component={ RecordPage } />
            <Route path="budgets" component={ BudgetPage } />
            <Route path="dashboards" component={ DashboardPage } />
            <Route path="accounts" component={ AccountPage } />
            <Route path="settings" component={ ProfilePage } />
            <Route path="*" component={ NotFoundPage } />
        </Route>
    );
}
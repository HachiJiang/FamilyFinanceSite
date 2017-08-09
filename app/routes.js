'use strict';

import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from './containers/App';
import SummaryPage from './containers/SummaryPage';
import RecordPage from './containers/RecordPage';
import BudgetPage from './containers/BudgetPage';
import DashboardPage from './containers/DashboardPage';
import AccountPage from './containers/AccountPage';
import OutcomePage from './containers/OutcomePage';
import IncomePage from './containers/IncomePage';
import ProjectPage from './containers/ProjectPage';
import MemberPage from './containers/MemberPage';
import DebtorPage from './containers/DebtorPage';
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
            <Route path="outcome" component={ OutcomePage } />
            <Route path="income" component={ IncomePage } />
            <Route path="projects" component={ ProjectPage } />
            <Route path="members" component={ MemberPage } />
            <Route path="debtors" component={ DebtorPage } />
            <Route path="settings" component={ ProfilePage } />
            <Route path="*" component={ NotFoundPage } />
        </Route>
    );
}
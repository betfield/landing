/*
---- moved to landing.html template descriptiom ----

Router.configure({
    layoutTemplate: 'landing',
    loadingTemplate: 'splash'
});
*/

import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../react/AppContainer';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route exact path="/" component={AppContainer}/>
    </Router>
);

/*
FlowRouter.route('/', {
    action: function() {
        //BlazeLayout.render("landing");
        ReactLayout.render(App, {
            content: <LandingPage/>
        });
    },
	name: 'landing'
*/
  
    /*
    
    ---- moved to landing.js appReady helper ----

    waitOn: function() {
        // Wait until all data is retreived from the DB before rendering the page
        return Meteor.subscribe('users');
    }
});
*/
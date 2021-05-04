import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import EventDetail from '../views/EventDetail';
import CreateEvent from '../views/CreateEvent';
import MyEvents from '../views/MyEvents';
import NotFound from '../views/NotFound';
import Layout from '../components/Layout';
import Profile from '../views/Profile';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/eventdetail' component={EventDetail} />
        <Route exact path='/createevent' component={CreateEvent} />
        <Route exact path='/myevents' component={MyEvents} />
        <Route exact path='/profile' component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;

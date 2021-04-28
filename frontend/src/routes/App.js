import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {Home} from '../views/Home';
// import Login from '../views/Login';
// import Register from '../views/Register';
import NotFound from '../views/NotFound';
import Layout from '../components/Layout';

const App = () => (
  <Home />
  /*
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
          {
            // <Route exact path='/login' component={Login} />
            // <Route exact path='/Register' component={Register} />
          }
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
  */
);

export default App;

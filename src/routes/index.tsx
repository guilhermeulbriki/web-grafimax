import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Toner from '../pages/toner';
import Maintenance from '../pages/maintenance';
import Errors from '../pages/error';
import SignIn from '../pages/signin';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/toner" exact component={Toner} isPrivate />
    <Route path="/maintenance" exact component={Maintenance} isPrivate />
    <Route path="/error" exact component={Errors} isPrivate />
  </Switch>
);

export default Routes;

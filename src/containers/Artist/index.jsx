import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';

import { routePaths } from '$common/routeConfig';

import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';

const Artist = (props) => {
  // props
  const {
    routes,
    location,
  } = props;

  // store
  const history = useHistory();

  // effects
  useEffect(() => {
    if (location.pathname === routePaths.artist) {
      history.push(routePaths.artistNew);
    }
  }, []);

  // render
  return (
    <Switch>
      {
        routes.map((route, i) => (
          <RouteWithSubRoutes
            key={i}
            {...route}
          />
        ))
      }
    </Switch>
  );
}

export default Artist;

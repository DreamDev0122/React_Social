import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteWithSubRoutes = (route) => {
  // props
   const {
    path,
    component: Comp,
    routes,
    redirect,
  } = route;

  // store
  const token = useSelector((store) => store.authentication.token);

  // render
  return (
    <Route
      path={path}
      render={props => {
        const redirectPath = redirect(token);
        // need to implement redirect functionality since we have artists, managers
        if (redirectPath) {
          return <Redirect to={redirectPath} />;
        }

        return (
          // pass the sub-routes down to keep nesting
          <Comp
            {...props}
            routes={routes}
          />
        )
      }}
    />
  );
}

export default RouteWithSubRoutes;

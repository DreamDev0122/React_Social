import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { routePaths } from '$common/routeConfig';

const ResetPassword = () => {
  // store
  const location = useLocation();
  const history = useHistory();

  // effects
  useEffect(() => {
    const search = queryString.parse(location.search);
    history.replace(routePaths.marketing, { token: search.token });
  }, []);

  // render
  return (
    <div />
  );
};

export default ResetPassword;

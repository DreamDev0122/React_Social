import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '$components/common/AppHeader';
import RouteWithSubRoutes from '$components/common/RouteWithSubRoutes';
import Player from '$components/common/Player';
import SideMenu from '$components/common/SideMenu';

import { routePaths } from '$common/routeConfig';
import { hideModal } from '$redux/features/modal';
import { listPlaylist } from '$redux/features/playlist';

import styles from './index.module.scss';

const Main = (props) => {
  // props
  const {
    routes,
    location,
  } = props;

  // store
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const isSideMenuOpen = useSelector((store) => store.nav.isSideMenuOpen);
  const isMobile = useSelector((store) => store.nav.isMobile);
  const showFooterPlayer = useSelector((store) => store.nav.showFooterPlayer);

  // effects
  useEffect(() => {
    if (location.pathname === routePaths.main) {
      history.push(routePaths.home);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    dispatch(listPlaylist(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(hideModal());
    return () => {
      dispatch(hideModal()); // ensure the modal is hidden
    }
  }, [location.pathname]);

  // render
  return (
    <div className="d-flex vh-100">
      <div className={`d-none d-sm-block ${styles.sideMenuWrapper}`}>
        <SideMenu />
      </div>
      <div className={styles.content}>
        <AppHeader />
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
      </div>
      <div className={`d-block d-sm-none ${styles.sideMenuMobile} ${isMobile && isSideMenuOpen ? styles.sideMenuActive : ''}`}>
        <SideMenu />
      </div>
      {
        showFooterPlayer && (
          <div className={styles.homeFooter}>
            <Player />
          </div>
        )
      }
    </div>
  );
}

export default Main;

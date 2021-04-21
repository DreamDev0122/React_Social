import React from 'react';
import { NavLink, useHistory, generatePath } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Button from '$components/common/Button';

import { routePaths } from '$common/routeConfig';
import { getPermissions } from '$common/utils';

import { showModal } from '$redux/features/modal';

import styles from './index.module.scss';

const playlistIcon = require('$assets/images/icons/playlist-icon.svg');

const SideMenu = () => {
  // store
  const history = useHistory();
  const dispatch = useDispatch();
  const userRole = useSelector((store) => store.authentication.user.user_type);
  const isPublished = useSelector((store) => store.authentication.user.publish);
  const playlists = useSelector((store) => store.playlist.playlists);

  // icons
  const artistIcons = [
    {
      icon: require('$assets/images/icons/add-artist.svg'),
      activeIcon: require('$assets/images/icons/add-artist-active.svg'),
      title: 'Add Artist',
      path: routePaths.newArtist,
      permission: 'admin',
    },
    {
      icon: require('$assets/images/icons/stats.svg'),
      activeIcon: require('$assets/images/icons/stats-active.svg'),
      title: 'Insights',
      path: routePaths.insights,
      permission: 'media',
    },
    {
      icon: require('$assets/images/icons/upload.svg'),
      activeIcon: require('$assets/images/icons/upload-active.svg'),
      title: 'Upload Media',
      path: routePaths.newMediaCategory,
      permission: 'artist',
    },
  ];

  const userIcons = [
    {
      icon: require('$assets/images/icons/favorite.svg'),
      activeIcon: require('$assets/images/icons/favorite-active.svg'),
      title: 'Favorites',
      path: routePaths.favorites,
    },
    {
      icon: require('$assets/images/icons/history.svg'),
      activeIcon: require('$assets/images/icons/history-active.svg'),
      title: 'History',
      path: routePaths.history,
    },
  ];

  const icons = [
    {
      icon: require('$assets/images/icons/home.svg'),
      activeIcon: require('$assets/images/icons/home-active.svg'),
      title: 'Home',
      path: routePaths.home,
    },
    {
      icon: require('$assets/images/icons/recommandation.svg'),
      activeIcon: require('$assets/images/icons/recommandation-active.svg'),
      title: 'Recommendation',
      path: routePaths.recommendation,
    },
    {
      icon: require('$assets/images/icons/calendar.svg'),
      activeIcon: require('$assets/images/icons/calendar-active.svg'),
      title: 'New Release',
      path: routePaths.newRelease,
    },
    {
      icon: require('$assets/images/icons/top-chart.svg'),
      activeIcon: require('$assets/images/icons/top-chart-active.svg'),
      title: 'Top Chart',
      path: routePaths.topChart,
    },
  ];

  const artistAccess = getPermissions('artist', userRole,);

  // handlers
  const handleNewPlaylist = () => {
    dispatch(showModal('PLAYLIST_MODAL'));
  }

  // render
  return (
    <div className={styles.sideMenu}>
      <div className={`text-center ${styles.logoWrapper}`}>
        <p className={styles.headerTitle}>Mkondo</p>
      </div>
      <div className={`d-flex flex-column ${styles.sideMenusWrapper}`}>
        <p className={styles.sideMenuSubtitle}>Browse</p>
        {
          icons.map((item, idx) => (
            <NavLink
              to={item.path}
              className={styles.sideMenuItem}
              activeClassName={styles.sideMenuItemTitle}
              key={`sidemenu-${idx}`}
            >
              <img
                src={history.location.pathname === item.path ? item.activeIcon : item.icon}
                className={styles.sideMenuItemIcon}
              />
              <span>{item.title}</span>
            </NavLink>
          ))
        }
        <div className={`d-flex flex-column artist-menus ${styles.artistMenus}`}>
          <p className={styles.sideMenuSubtitle}>Your Activity</p>
          {
            userIcons.map((item, idx) => {
              const canAccess = !item.permission ? true : getPermissions(item.permission, userRole);
              if (!canAccess) {
                return null;
              }

              return (
                <NavLink
                  to={item.path}
                  className={styles.sideMenuItem}
                  activeClassName={styles.sideMenuItemTitle}
                  key={`sidemenu-${idx}`}
                >
                  <img
                    src={history.location.pathname === item.path ? item.activeIcon : item.icon}
                    className={styles.sideMenuItemIcon}
                  />
                  <span>{item.title}</span>
                </NavLink>
              )
            })
          }
        </div>
        {
          artistAccess && (
            <div className={`d-flex flex-column artist-menus ${styles.artistMenus}`}>
              <p className={styles.sideMenuSubtitle}>Artist Panel</p>
              {
                artistIcons.map((item, idx) => {
                  const canAccess = !item.permission ? true : getPermissions(item.permission, userRole, { isPublished });
                  if (!canAccess) {
                    return null;
                  }

                  return (
                    <NavLink
                      to={item.path}
                      className={styles.sideMenuItem}
                      activeClassName={styles.sideMenuItemTitle}
                      key={`sidemenu-${idx}`}
                    >
                      {
                        <img
                          src={history.location.pathname === item.path ? item.activeIcon : item.icon}
                          className={styles.sideMenuItemIcon}
                        />
                      }
                      <span>{item.title}</span>
                    </NavLink>
                  )
                })
              }
            </div>
          )
        }
        <div className={`d-flex flex-column artist-menus ${styles.artistMenus}`}>
          <p className={styles.sideMenuSubtitle}>Your Playlists</p>
          <div className="m-4 ">
            <Button
              onClick={handleNewPlaylist}
            >
              New Playlist
          </Button>
          </div>
          {
            playlists.map((item, idx) => (
              <NavLink
                key={`side-menu-playlist-${idx}`}
                to={generatePath(routePaths.playlist, { id: item.playlist_id })}
                className={styles.sideMenuItem}
                activeClassName="active"
                key={`sidemenu-playlist-${idx}`}
              >
                <img
                  src={playlistIcon}
                  className={styles.sideMenuItemIcon}
                />
                <span>{item.name}</span>
              </NavLink>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SideMenu;

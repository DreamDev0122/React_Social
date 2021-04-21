import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';

import DropDown from '$components/common/DropDown';
import TextInput from '$components/common/TextInput';
import SearchResult from '$components/common/SearchResult';
import HamburgerMenu from '$components/nav/HamburgerMenu';

import { handleFetch } from '$common/requestUtils';
import { routePaths } from '$common/routeConfig';

import { logout } from '$redux/features/authentication';
import { hideModal } from '$redux/features/modal';
import { querySearch } from '$redux/features/nav';

import styles from './index.module.scss';

const defaultAvatar = require('$assets/images/profile-user.svg');

const headerMenus = [
  { name: 'account', title: 'My Account', },
  { name: 'logout', title: 'Log Out', style: styles.optSecondary},
];

const AppHeader = (props) => {
  // props
  const { showSearch } = props;

  //state
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('');

  // store
  const userName = useSelector((store) => store.authentication.user.full_name);
  const avatar = useSelector((store) => store.authentication.user.avatar_url);
  const token = useSelector((store) => store.authentication.token);
  const modalActive = useSelector((store) => store.modal.type);
  const isMobile = useSelector((store) => store.nav.isMobile);
  const forceClearSearch = useSelector((store) => store.nav.forceClearSearch);
  const dispatch = useDispatch();
  const history = useHistory();

  // effects
  useEffect(async () => {
    if (!avatar) {
      return;
    }

    const res = await handleFetch('GET', `media/presigned-get-url?file_name=${avatar}`, null, token);
    setUrl(res.response);
  }, [avatar]);

  useEffect(() => {
    if (!forceClearSearch) {
      return;
    }

    setSearch('');
  }, [forceClearSearch]);

  // This remains same across renders
	// highlight-starts
	const debouncedSave = useRef(debounce(nextValue => dispatch(querySearch(nextValue)), 1000)).current;
	// highlight-ends

  // handler
  const handleChange = (name, value) => {
    setSearch(value);
		// Even though handleChange is created on each render and executed
		// it references the same debouncedSave that was created initially
		debouncedSave(value);
  }

  const handleSelect = (name) => {
    if (name === 'logout') {
      dispatch(logout());
      return;
    }

    history.push(routePaths.profile);
  }

  const handleFocus = () => { // a hacky way to hideModal
    dispatch(hideModal());
  }

  const handleClear = () => {
    setSearch('');
  }

  // render
  return (
    <>
      <div className={`d-flex ${styles.appHeaderWrapper} ${modalActive ? styles.searchInactive : ''} ${isMobile ? styles.mobile : ''}`}>
        <div className={`d-block d-sm-none ${styles.menuWrapper}`}>
          <HamburgerMenu />
        </div>
        {
          showSearch && (
            <TextInput
              name="search"
              placeholder="Search"
              value={search}
              onChange={handleChange}
              customWrapperClass={styles.appHeaderInput}
              icon={search ? "cancel" : "search"}
              onIconClick={handleClear}
              onFocus={handleFocus}
            />
          )
        }
        <DropDown
          options={headerMenus}
          handleSelect={handleSelect}
        >
          <div className={`d-flex align-items-center ${styles.appHeaderName}`}>
            <span className="d-none d-sm-block">{userName || 'Name'}</span>
            <img
              src={url || defaultAvatar}
              className={styles.appHeaderAvatar}
              alt=""
            />
          </div>
        </DropDown>
      </div>
      {
        search && (
          <SearchResult />
        )
      }
    </>
  );
}

AppHeader.defaultProps = {
  showSearch: true,
}

AppHeader.propTypes = {
  showSearch: PropTypes.bool,
}

export default AppHeader;

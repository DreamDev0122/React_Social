import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { showModal, hideModal } from '$redux/features/modal';
import { reloadUser } from '$redux/features/authentication';
import { listPlaylist, clearPlaylist } from '$redux/features/playlist';
import { clearMedia } from '$redux/features/media';
import { clearArtist } from '$redux/features/artist';
import { getHistory, searchUsers } from '$redux/features/user';

const Monitor = () => {
  // store
  const dispatch = useDispatch();
  const getArtistPending = useSelector((store) => store.artist.getArtistPending);
  const addArtistPending = useSelector((store) => store.artist.addArtistPending);
  const saveMediaPending = useSelector((store) => store.media.saveMediaPending);
  const removeFavoritePending = useSelector((store) => store.user.removeFavoritePending);
  const addFavoritePending = useSelector((store) => store.user.addFavoritePending);
  const removeFollowersPending = useSelector((store) => store.user.removeFollowersPending);
  const addFollowersPending = useSelector((store) => store.user.addFollowersPending);
  const addAlbumPending = useSelector((store) => store.media.addAlbumPending);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const updatePlaylistComplete = useSelector((store) => store.playlist.updatePlaylistComplete);
  const createPlaylistComplete = useSelector((store) => store.playlist.createPlaylistComplete);
  const updateUserPending = useSelector((store) => store.user.updateUserPending);
  const updateUserComplete = useSelector((store) => store.user.updateUserComplete);
  const updateSystemUserPending = useSelector((store) => store.user.updateSystemUserPending);
  const addHistoryComplete = useSelector((store) => store.user.addHistoryComplete);
  const userType = useSelector((store) => store.authentication.user.user_type);
  const token = useSelector((store) => store.authentication.token);
  const addMediaComplete = useSelector((store) => store.media.addMediaComplete);
  const lastUploaded = useSelector((store) => store.media.lastUploaded);

  const isSuperAdmin = userType === 'super admin';

  // effects
  useEffect(() => {
    if (getArtistPending
      || addArtistPending
      || saveMediaPending
      || addAlbumPending
      || updateUserPending
      || updateSystemUserPending
    ) {
      dispatch(showModal('LOADER_MODAL', {
        preventOutsideClick: true,
      }));
      return;
    }

    dispatch(hideModal());
  }, [
    getArtistPending,
    addArtistPending,
    saveMediaPending,
    addAlbumPending,
    updateUserPending,
    updateSystemUserPending,
  ]);

  useEffect(() => {
    if (addFavoritePending
    || removeFavoritePending
    || addFollowersPending
    || removeFollowersPending
    || !userId) {
      return;
    }

    dispatch(reloadUser(userId));
  }, [
    addFollowersPending,
    addFavoritePending,
    removeFavoritePending,
    removeFollowersPending,
    updateUserComplete,
  ]);

  useEffect(() => {
    if (!addHistoryComplete || !userId) {
      return;
    }

    dispatch(getHistory());
  }, [addHistoryComplete]);

  useEffect(() => {
    if (!userId) {
      return userId;
    }

    dispatch(listPlaylist(userId));
  }, [createPlaylistComplete, updatePlaylistComplete]);

  useEffect(() => {
    if (updateUserComplete) {
      if (isSuperAdmin) {
        dispatch(searchUsers());
      }
    }
  }, [updateUserComplete]);

  useEffect((token) => {
    if (!token) {
      dispatch(clearMedia());
      dispatch(clearPlaylist());
      dispatch(clearArtist());
      return;
    }
  }, [token]);

  useEffect(() => {
    if (!addMediaComplete
      || !lastUploaded
      || lastUploaded.category === 'audio') { // TODO: use same for audio
      return;
    }

    // lastUploaded
    dispatch(showModal('SHARE_MODAL', {
      title: lastUploaded.name,
      country: lastUploaded.description,
      id: lastUploaded.mediaId,
      avatarUrl: lastUploaded.cover_url,
      isAvatarLoaded: false,
    }));

  }, [addMediaComplete]);

  // render
  return (
    <div />
  );
}

export default Monitor;

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '$components/common/Button';
import NewItem from '$components/common/NewItem';

import { routePaths } from '$common/routeConfig';

import { saveMedia, addAlbum } from '$redux/features/media';

import { menus, metamenus } from './menus';

import styles from './index.module.scss';

const initialState = {
  artist: '',
  album: '',
  genre: '',
  description: '',
  policy: false,
  recordLabel: '',
  releaseDate: '',
  publisher: '',
  location: '',
  country: '',
  file: null,
}

const NewAlbum = () => {
  // state
  const [values, setValues] = useState(initialState);

  // store
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const addAlbumPending = useSelector((store) => store.media.addAlbumPending);
  const addAlbumComplete = useSelector((store) => store.media.addAlbumComplete);
  const albumId = useSelector((store) => store.media.albumId);

  // refs
  const initiatedSave = useRef(false);

  // effects
  useEffect(() => {
    if (!addAlbumComplete || !initiatedSave.current) {
      return;
    }

    initiatedSave.current = false;
    history.push(routePaths.mediaUpload, { albumId });
  }, [addAlbumComplete]);

  // handlers
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSave = async () => {
    if (!values.file) {
      alert('No album avatar file submitted!');
      return;
    }

    if (!values.policy) {
      alert('You need to accept the terms and conditions before proceeding!');
      return;
    }

    initiatedSave.current = true;
    const res = await dispatch(saveMedia(values.file));
    dispatch(addAlbum({
      name: values.album,
      description: values.description,
      genres: values.genre.map((item) => item.value),
      country: values.country,
      region: values.region,
      cover_image: res.payload,
      owner_id: userId, // OR artistId
    }));
  }

  const handleCancel = () => {
    if(addAlbumPending) {
      return;
    }
    setValues(initialState);
  }

  // render
  return (
    <div className={`row ${styles.albumWrapper}`}>
      <div className="col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-12">
        <NewItem
          menus={menus}
          metamenus={metamenus}
          onChange={handleChange}
          values={values}
        />
        <div className="d-flex justify-content-end new-item-footer">
          <Button
            onClick={handleCancel}
            style="btn-cancel"
            isTransparent
            noBorder
          >
            Cancel
            </Button>
          <Button
            onClick={handleSave}
            isLoading={addAlbumPending}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NewAlbum;

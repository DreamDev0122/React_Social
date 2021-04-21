import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DragDrop from '$components/common/DragDrop';
import Button from '$components/common/Button';
import InputField from '$components/forms/InputField';
import AvatarInput from '$components/common/AvatarInput';
import VideoPlayer from '$components/media/VideoPlayer';

import { bytesToSize, generatePreview, movieGenres, getDuration } from '$common/utils';
import { addMedia, saveMedia } from '$redux/features/media';

import { menus, descriptionMenu } from './menus';

import styles from './index.module.scss';

const getType = {
  movie: 'Upload Movie',
  video: 'Upload Video',
};

const NewVideo = () => {
  // store
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.authentication.user.user_id);
  const userAvatarUrl = useSelector((store) => store.authentication.user.avatar_url);
  const addMediaPending = useSelector((store) => store.media.addMediaPending);

  const uploadType = (history.location.state && history.location.state.type) || 'video';
  const type = getType[uploadType];

  // state
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    duration: 0,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [localCoverUrl, setLocalCoverUrl] = useState(null);

  // hadnlers
  const handleFileChange = (files) => {
    setFile(files[0]);
    getDuration(files[0], 'video', (value) => {
      handleChange('duration', value);
    });
  }

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSave = async () => {
    const mediaRes = await dispatch(saveMedia(coverFile));
    dispatch(addMedia({
      name: values.title,
      description: values.description,
      genres: values.genre.map((item) => item.value),
      cover_url: mediaRes.payload,
      media_url: 'placeholderurl',
      owner_id: userId,
      category: uploadType,
      duration: values.duration,
      owner_avatar_url: userAvatarUrl,
      production_company: values.productionCompany,
      movie_director: values.director,
      staring: values.starring,
      release_date: new Date(values.startingDate).toISOString(),
      file,
    }));
  }

  const handleClear = () => {
    setFile(null);
    const fileDom = document.querySelector('#file-input');
    fileDom.value = '';
  }

  const handleCoverChange = async (files) => {
    const url = await generatePreview(files[0]);
    setLocalCoverUrl(url);
    setCoverFile(files[0]);
  }

  const buildInputPanel = () => {
    return (
      <>
        <p className={styles.paneTitle}>{type}</p>

        <div className={styles.inputContainer}>
          <p className={styles.title}>{file.name} - {bytesToSize(file.size)}</p>
          <div className={styles.cover}>
            <AvatarInput
              url={localCoverUrl}
              onChange={handleCoverChange}
            />
          </div>
          <div className={styles.inputFormWrapper}>
            <div className="row">
              {
                menus.map((menu) => {
                  const item = {
                    ...menu,
                  };

                  if (item.options && uploadType === 'movie') {
                    item.options = movieGenres;
                  }

                  return (
                    <div
                      className='col-12 col-md-6'
                      key={`new-video-${menu.name}`}
                    >
                      <InputField
                        field={{
                          ...item,
                          value: values[menu.name]
                        }}
                        onChange={handleChange}
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <VideoPlayer
                file={file}
              />
            </div>
            <div className="col-12 col-md-6">
              <InputField
                field={{
                  ...descriptionMenu,
                  value: values.description
                }}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-2">
          <Button
            isSecondary
            onClick={handleClear}
          >
            Clear
              </Button>
          <Button
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </>
    );
  }

  const getContent = () => {
    if (addMediaPending) {
      return (
        <div className="d-flex">
          <div className={`spinner-border ${styles.spinnerLg}`} role="status" />
          <div className="ml-4">
            <p>Your {type} is getting uploaded.</p>
            <p>Please don&apos;t refresh your browser.</p>
            <p>You may continue using other functions of the app</p>
          </div>
        </div>
      );
    }

    if (file) {
      return buildInputPanel();
    }

    return (
      <DragDrop
        onChange={handleFileChange}
        acceptedFiles="video/mp4,video/x-m4v,video/*"
      />
    )
  }

  // render
  return (
    <div className={styles.panelContainer}>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-10 col-lg-8">
          {getContent()}
        </div>
      </div>
    </div>
  );
}

export default NewVideo;

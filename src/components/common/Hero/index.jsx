import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '$components/common/Button';
import { showModal } from '$redux/features/modal';

import styles from './index.module.scss';

const audioBkg = require('$assets/images/audio-bkg.png');
const videoBkg = require('$assets/images/video-bkg.png');

const commonStyles = `
  height: 360px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Audio = styled.div`
  background-image: url(${audioBkg});
  ${commonStyles}    
`;

const Video = styled.div`
  background-image: url(${videoBkg});
  ${commonStyles}    
`;

const Hero = (props) => {
  // props
  const { source } = props;

  // store
  const dispatch = useDispatch();

  // handlers
  const handlePlay = () => {
    dispatch(showModal('ALERT_MODAL'));
  };

  // render
  return (
    <div className="row align-items-center">
      <div className="col-12 col-md-6">
        <p className={styles.heroHeading}>Mkondo entertainment platform</p>
        <p className={`${styles.heroSubHeading} pb-4`}>Bringing Entertainment to your door step</p>
        <Button
          onClick={handlePlay}
        >
          Play
          </Button>
      </div>
      <div className="col-12 col-md-6">
        {
          source === 'audio' ?
            <Audio /> :
            <Video />
        }
      </div>
    </div>
  );
};

Hero.defaultProps = {
  source: 'audio',
};

Hero.propTtypes = {
  source: PropTypes.string,
};

export default Hero;

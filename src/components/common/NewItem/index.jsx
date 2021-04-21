import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Tabs from '$components/common/Tabs';
import InputField from '$components/forms/InputField';
import AvatarInput from '$components/common/AvatarInput';
import Progress from '$components/common/Progress';

import { generatePreview } from '$common/utils';

import styles from './index.module.scss';

const options = [
  { name: 'basic', title: 'Basic' },
  { name: 'metadata', title: 'Metadata' },
]

const NewItem = (props) => {
  // props
  const {
    menus,
    metamenus,
    onChange,
    values,
  } = props;

  // state
  const [selected, setSelected] = useState(options[0].name);
  const [avatarUrl, setAvatarUrl] = useState(null);

  // handlers
  const handleSelect = (item) => {
    setSelected(item);
  }

  const handleAvatarChange = async (file) => {
    const url = await generatePreview(file[0]);
    setAvatarUrl(url);
    onChange('file', file[0]);
  }

  // render
  return (
    <div className="">
      <div className="d-flex flex-column mt-4">
        <Tabs
          options={options}
          onSelect={handleSelect}
          selected={selected}
          name="newItem"
          activeColor="#8C8C8C"
        />
        <Progress
          values={values}
        />
      </div>
      <div className={`row mt-4 ${selected === 'basic' ? '' : 'd-none'}`}>
        <div className="col-12 col-md-6 col-lg-4">
          <div className={styles.avatar}>
            <AvatarInput
              url={avatarUrl}
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-8">
          {
            menus.map((menu, idx) => (
              <div className="" key={`new-item-menu-${idx}`}>
                <InputField
                  field={{
                    ...menu,
                    value: values[menu.name]
                  }}
                  onChange={onChange}
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className={`d-flex flex-wrap mt-4 ${selected === 'metadata' ? '' : 'd-none'}`}>
        {
          metamenus.map((menu, idx) => (
            <div
              className=""
              key={`new-item-menumetas-${idx}`}
            >
              <InputField
                field={{
                  ...menu,
                  value: values[menu.name]
                }}
                onChange={onChange}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

NewItem.defaultProps = {
  title: 'Create Artist',
};

NewItem.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NewItem;

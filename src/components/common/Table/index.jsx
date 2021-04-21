import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import DropDown from '$components/common/DropDown';
import Row from '$components/common/Row';

import { formatDate, capitalize } from '$common/utils';
import { updateUser } from '$redux/features/user';

import styles from './index.module.scss';

const headerMenus = [
  { name: 'activate', title: 'Activate', },
  { name: 'delete', title: 'Delete', style: styles.optSecondary },
];

const Table = (props) => {
  // props
  const {
    data,
  } = props;

  // store
  const dispatch = useDispatch();

  const handleEdit = (value, opt) => {
    // launch edit modal
    const item = {
      ...value,
    };


    if (opt === 'activate') {
      item.publish = true;
    }

    if (opt === 'delete') {
      item.archived = true;
    }

    dispatch(updateUser({
      id: item.user_id,
      payload: item,
    }));
  };

  const btn = (data) => (
    <DropDown
      options={headerMenus}
      handleSelect={(opt) => handleEdit(data, opt)}
    >
      <span className={styles.btn}>Edit</span>
    </DropDown>
  );

  // render
  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <Row
          id='super-admin-table-header'
          columns={[
            'User Type',
            'Full Name',
            'Phone Number',
            'Status',
            'Joined',
            'Last Active',
          ]}
        />
      </div>
      {
        data.map((cols) => (
          <Row
            key={`super-admin-table-${cols.user_id}`}
            id='super-admin-table'
            columns={[
              capitalize(cols.user_type),
              cols.full_name,
              cols.phone_number,
              cols.publish ? 'Active' : 'Not Published',
              new Date(cols.joined).toLocaleDateString(),
              capitalize(formatDate(cols.last_active)),
            ]}
            actionBtn={btn(cols)}
          />
        ))
      }
    </div>
  );
}

Table.defaultProps = {
  data: [],
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Table;

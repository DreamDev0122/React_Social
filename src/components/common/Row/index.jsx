import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Row = (props) => {
  // props
  const {
    id,
    columns,
    actionBtn,
  } = props;

  const colNums = Math.floor(12 / columns.length);

  // render
  return (
    <div className={`row my-2 ${styles.wrapper}`}>
      <div className="col-8 col-md-10">
        <div className="row">
          {
            columns.map((col, idx) => (
              <div
                key={`col-${id}-${idx}`}
                className={`col-12 col-md-${colNums} pr-2`}
              >
                {col}
              </div>
            ))
          }
        </div>
      </div>
      <div className={`col-4 col-md-2 ${styles.col}`}>
        { actionBtn }
      </div>
    </div>
  );
}

Row.defaultProps = {
  actionBtn: null,
}

Row.propTypes = {
  actionBtn: PropTypes.node,
}

export default Row;

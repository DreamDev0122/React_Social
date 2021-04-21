import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const icons = {
  next: require('$assets/images/icons/arrow-next.svg'),
  arrowUp: require('$assets/images/icons/arrow-up.svg'),
  shuffle: require('$assets/images/player/shuffle-active.svg'),
  favorite: require('$assets/images/icons/favorite.svg'),
  share: require('$assets/images/icons/share.svg'),
  menu: require('$assets/images/icons/menu.svg'),
  cancel: require('$assets/images/icons/close.svg'),
  favoriteActive: require('$assets/images/icons/favorite-active.svg'),
}

const Button = (props) => {
  // props
  const {
    children,
    style,
    isTransparent,
    isSecondary,
    isTertiary,
    isSquare,
    isStretch,
    isCustom,
    isLoading,
    hideDefault,
    onClick,
    onMouseEnter,
    onMouseLeave,
    noBorder,
    noWidth,
    isBorderPrimary,
    isBorderSecondary,
    icon,
  } = props;

  // handler
  const getCustomStyle = () => {
    const properties = [
      { value: isTransparent, style: styles.mkBtnTransparent, },
      { value: isSquare, style: styles.mkBtnSquare, },
      { value: isStretch, style: styles.mkBtnStretch, },
      { value: noBorder, style: styles.noBorder },
      { value: noWidth, style: styles.noWidth, },
      { value: isSecondary, style: styles.mkBtnSecondary },
      { value: isTertiary, style: styles.mkBtnSecondaryTransparent },
      { value: isCustom, style: styles.customBtn },
      { value: isBorderPrimary, style: styles.borderPrimary },
      { value: isBorderSecondary, style: styles.borderSecondary },
    ];

    let customStyle = properties.reduce((acc, item) => item.value ? `${acc} ${item.style}` : acc, '');
    if (isSecondary && isTransparent) {
      customStyle = `${customStyle} ${styles.mkBtnSecondaryTransparent}`;
    }

    return customStyle;
  }

  const customStyle = getCustomStyle();

  const content = isLoading ? (
    <div
      className={`spinner-border ${customStyle}`}
      role="status"
    />
  ) : (
      <>
        <div className="w-100 pr-2">
          {children}
        </div>
        {
          icon && (
            <img
              src={icons[icon]}
              className={styles.btnIcon}
            />
          )
        }
      </>
    );

  // render
  return (
    <button
      className={`d-flex ${!hideDefault ? styles.mkBtn : ''} ${customStyle} ${style}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      { content}
    </button>
  );
};

Button.defaultProps = {
  isTransparent: false,
  isSquare: false,
  isStretch: false,
  noBorder: false,
  style: '',
  icon: null,
  onMouseEnter: () => null,
  onMouseLeave: () => null,
  hideDefault: false,
  isLoading: false,
  children: null,
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  isTransparent: PropTypes.bool,
  isSquare: PropTypes.bool,
  isStretch: PropTypes.bool,
  noBorder: PropTypes.bool,
  noWidth: PropTypes.bool,
  hideDefault: PropTypes.bool,
  style: PropTypes.string,
  icon: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default Button;

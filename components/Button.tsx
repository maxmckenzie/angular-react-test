import React from 'react';
import PropTypes from 'prop-types'

const Button = ({
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon,
  label
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? (
        <i className={`glyphicon glyphicon-${icon}`}/>
      ) : null}

      {label}
    </button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

export default Button;

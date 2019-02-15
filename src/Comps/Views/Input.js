import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  return (
    <input
      type={props.type}
      placeholder={props.schema.placeholder}
      value={props.value == null ? '' : props.value}
      className={props.className}
      onChange={event => {
        if (event.target.type === 'checkbox') {
          props.onChange(event.target.checked);
        } else {
          props.onChange(event.target.value);
        }
      }}
      checked={props.checked}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.any, // eslint-disable-line
  schema: PropTypes.shape({
    placeholder: PropTypes.string,
  }).isRequired,
};
Input.defaultProps = {
  className: undefined,
  checked: false,
};
export default Input;

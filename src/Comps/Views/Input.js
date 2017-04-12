import React from 'react';
import PropTypes from 'prop-types';

function onInputChange(func) {
    return function onChange(event) {
        if (event.target.type === 'checkbox') {
            func(event.target.checked);
        } else {
            func(event.target.value);
        }
    };
}

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.schema.placeholder}
            value={props.value}
            className={props.className}
            onChange={onInputChange(props.onChange)}
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
        placeholder: PropTypes.string
    }).isRequired
};
Input.defaultProps = {
    className: undefined,
    checked: false
};
export default Input;

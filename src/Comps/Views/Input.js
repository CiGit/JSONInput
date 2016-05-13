import React, { PropTypes } from 'react';

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
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
    value: PropTypes.any,
    schema: PropTypes.shape({
        placeholder: PropTypes.string
    })
};
export default Input;

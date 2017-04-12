import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../Views/Widget';
import validator from '../Decorators/validator';

function StringField(props) {
    const val = props.value !== undefined && props.value !== null ?
        String(props.value) :
        props.value;
    return (
        <Widget
            {...props}
            value={val}
        />
    );
}

StringField.propTypes = {
    value: PropTypes.oneOfType([ // eslint-disable-line react/require-default-props
        PropTypes.number,
        PropTypes.string
    ])
};
export { StringField as SimpleStringField };
export default validator(StringField);

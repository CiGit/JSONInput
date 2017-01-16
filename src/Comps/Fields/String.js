import React, { PropTypes } from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';
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
export default validator(fromDefaultValue(StringField));

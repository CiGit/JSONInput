import React, { PropTypes } from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';
import validator from '../Decorators/validator';

function StringField(props) {
    const onChange = function onChange(val) {
        props.onChange(val === '' ? undefined : String(val));
    };
    return (<Widget {...props}
                    onChange={ onChange } />);
}

StringField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    schema: PropTypes.shape({
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        type: PropTypes.oneOf(['number', 'string'])
    }),
    onChange: PropTypes.func.isRequired
};
export default validator(fromDefaultValue(StringField));

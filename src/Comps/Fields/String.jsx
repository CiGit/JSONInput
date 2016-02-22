import React, { PropTypes } from 'react';
import { defaultWidget } from '../Views';
import fromDefaultValue from '../Decorators/fromDefaultValue.jsx';
import validator from '../Decorators/validator.jsx';

function StringField(props) {
    const Widget = defaultWidget(props.schema.type);
    const onChange = function onChange(val) {
        props.onChange(val === '' ? undefined : val);
    };
    return (<Widget {...props}
                    onChange={ onChange } />);
}

StringField.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    schema: PropTypes.shape({
        defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        type: PropTypes.oneOf(['number', 'string'])
    })
};
export default validator(fromDefaultValue(StringField));

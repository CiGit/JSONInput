import React, { PropTypes } from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';

function BooleanField(props) {
    return (<Widget {...props} />);
}

BooleanField.propTypes = {
    value: PropTypes.bool,
    schema: PropTypes.shape({
        defaultValue: PropTypes.bool
    })
};
export default fromDefaultValue(BooleanField);

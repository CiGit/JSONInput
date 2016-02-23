import React, { PropTypes } from 'react';
import Widget from '../Views/Widget.jsx';
import fromDefaultValue from '../Decorators/fromDefaultValue.jsx';

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

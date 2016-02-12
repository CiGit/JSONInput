import React, { PropTypes } from 'react';
import { defaultWidget } from '../Views';
import fromDefaultValue from '../Decorators/fromDefaultValue.jsx';

function BooleanField(props) {
    const Widget = defaultWidget('boolean');
    return (<Widget {...props} />);
}

BooleanField.propTypes = {
    value: PropTypes.bool,
    schema: PropTypes.shape({
        defaultValue: PropTypes.bool
    })
};
export default fromDefaultValue(BooleanField);

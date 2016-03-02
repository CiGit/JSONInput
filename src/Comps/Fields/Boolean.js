import React from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';

function BooleanField(props) {
    return (<Widget {...props} />);
}

export default fromDefaultValue(BooleanField);

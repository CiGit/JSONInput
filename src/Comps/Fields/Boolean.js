import React from 'react';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';
import validator from './../Decorators/validator.js';

function BooleanField(props) {
    return (<Widget {...props} />);
}

export default validator(fromDefaultValue(BooleanField));

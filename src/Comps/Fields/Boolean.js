import React from 'react';
import Widget from '../Views/Widget';
import validator from './../Decorators/validator';

function BooleanField(props) {
    return (<Widget {...props} />);
}

export default validator(BooleanField);

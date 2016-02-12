import React from 'react';
import validate from '../Decorators/validator.jsx';
import StringField from './String.jsx';

function NumberField(props) {
    const onChange = function onChange(val) {
        const numVal = Number(val);
        props.onChange(numVal.toString() === val ? numVal : val);
    };
    return (<StringField {...props}
                         onChange={ onChange } />);
}

export default validate(NumberField);

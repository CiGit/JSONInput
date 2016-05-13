import React from 'react';
import labeled from '../Decorators/labeled';
import Input from './Input';

function TextWidget(props) {
    return (
        <Input
            {...props}
            type="string"
        />
    );
}

export default labeled(TextWidget);

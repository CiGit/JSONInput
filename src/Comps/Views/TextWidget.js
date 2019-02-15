import React from 'react';
import labeled from './labeled';
import Input from './Input';

function TextWidget(props) {
    return (
        <Input
            {...props}
            type="text"
        />
    );
}

export default labeled(TextWidget);

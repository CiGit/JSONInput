import React from 'react';
import labeled from '../Decorators/labeled.jsx';
import Input from './Input.jsx';

function TextWidget(props) {
    return (
        <Input {...props}
               type="string" />);
}

export default labeled(TextWidget);

import React from 'react';
import labeled from '../Decorators/labeled.jsx';
import Input from './Input.jsx';

function ArrowNumberWidget(props) {
    return (
        <Input {...props}
               type="number" />);
}

export default labeled(ArrowNumberWidget);

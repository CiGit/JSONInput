import React, { PropTypes } from 'react';
import labeled from '../Decorators/labeled';
import Input from './Input';

function CheckboxWidget(props) {
    return (
        <Input {...props}
               type="checkbox"
               checked={ props.value } />);
}

CheckboxWidget.propTypes = {
    value: PropTypes.bool
};

export default labeled(CheckboxWidget);

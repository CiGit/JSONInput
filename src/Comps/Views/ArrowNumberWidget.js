import React from 'react';
import labeled from './labeled';
import Input from './Input';

function ArrowNumberWidget(props) {
  return <Input {...props} type="number" />;
}

export default labeled(ArrowNumberWidget);

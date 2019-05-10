import React from 'react';
import PropTypes from 'prop-types';
import labeled from './labeled';

function ObjectWidget(props) {
  return <div>{props.children}</div>;
}

ObjectWidget.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default labeled(ObjectWidget);

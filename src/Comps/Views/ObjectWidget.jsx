import React, { PropTypes } from 'react';
import labeled from '../Decorators/labeled.jsx';

function ObjectWidget(props) {
    return (<div>
             { props.children }
           </div>);
}

ObjectWidget.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
};

export default labeled(ObjectWidget);

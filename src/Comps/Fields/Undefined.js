import React, { PropTypes } from 'react';

function Undefined(props) {
    return (<span>{ `Undefined field type "${props.schema.type}", [${props.path}]` }</span>);
}

Undefined.propTypes = {
    schema: PropTypes.shape({
        type: PropTypes.string.isRequired
    }),
    path: PropTypes.array
};
export default Undefined;

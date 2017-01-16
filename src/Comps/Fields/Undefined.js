import React, { PropTypes } from 'react';

function Undefined(props) {
    return (<span>{`Undefined field type "${props.schema.type}", [${props.path}]`}</span>);
}

Undefined.propTypes = {
    schema: PropTypes.shape({
        type: PropTypes.oneOfType([
            PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean']),
            PropTypes.arrayOf(
                PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean', 'null'])
            )
        ]).isRequired
    }).isRequired,
    path: PropTypes.arrayOf(PropTypes.string).isRequired
};
export default Undefined;

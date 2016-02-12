import React, { PropTypes } from 'react';

function Undefined(props) {
    return (<div>
              { `Undefined type "${props.schema.type}"` }
            </div>);
}

Undefined.propTypes = {
    schema: PropTypes.shape({
        type: PropTypes.string.isRequired
    })
};
export default Undefined;

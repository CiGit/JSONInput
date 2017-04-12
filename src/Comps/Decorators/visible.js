import React from 'react';
import PropTypes from 'prop-types';

function visibility(Comp) {
    function Visible(props) {
        const { schema: { visible }, value } = props;
        if (visible && !visible(value, props.actions.getFormValue())) {
            return null;
        }
        return (<Comp {...props} />);
    }

    Visible.propTypes = {
        schema: PropTypes.shape({
            visible: PropTypes.func
        }).isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        value: PropTypes.any // eslint-disable-line
    };
    return Visible;
}

export default visibility;

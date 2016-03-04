import React, { PropTypes } from 'react';

function visibility(Comp) {
    function Visible(props) {
        const { schema: { visible }, value } = props;
        if (visible && !visible(value, props.actions.getFormValue())) {
            return <noscript />;
        }
        return (<Comp {...props} />);
    }

    Visible.propTypes = {
        schema: PropTypes.shape({
            visible: PropTypes.func
        }),
        actions: PropTypes.objectOf(PropTypes.func),
        value: PropTypes.any
    };
    return Visible;
}

export default visibility;

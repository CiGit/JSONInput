import React, { PropTypes } from 'react';

function updateDefault({ value, path, actions, schema: { value: defaultValue } }) {
    const val = value !== undefined ? value : defaultValue;
    if (value !== val) {
        actions.setDefaultValue(path, val);
    }
}

function fromDefaultValue(Comp) {
    class DefaultValue extends React.Component {
        componentDidMount() {
            updateDefault(this.props);
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.actions.getStatus(nextProps.path)) {
                return;
            }
            updateDefault(nextProps);
        }
        render() {
            return (<Comp {...this.props} />);
        }
    }

    DefaultValue.propTypes = {
        value: PropTypes.any,
        schema: PropTypes.shape({
            value: PropTypes.any
        }),
        onChange: PropTypes.func.isRequired
    };
    return DefaultValue;
}

export default fromDefaultValue;

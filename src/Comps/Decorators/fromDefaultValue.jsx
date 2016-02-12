import React, { PropTypes } from 'react';

function updateDefault({ value, path, actions, schema: { defaultValue } }) {
    const val = value !== undefined ? value : defaultValue;
    if (value !== val) {
        actions.setDefaultValue(path, val);
    }
}

function fromDefaultValue(Comp) {
    class setValue extends React.Component {
        componentWillMount() {
            updateDefault(this.props);
        }
        componentWillReceiveProps(nextProps) {
            if (nextProps.actions.getStatus(nextProps.path)) {
                return;
            }
            updateDefault(nextProps);
        }
        render() {
            return (<Comp {...this.props}/>);
        }
    }

    setValue.propTypes = {
        value: PropTypes.any,
        schema: PropTypes.shape({
            defaultValue: PropTypes.any
        }),
        onChange: PropTypes.func.isRequired
    };
    return setValue;
}

export default fromDefaultValue;

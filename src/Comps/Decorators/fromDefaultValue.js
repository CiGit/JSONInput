import React, { PropTypes } from 'react';

function updateDefault({ value, schema: { value: defaultValue } }) {
    const val = value !== undefined ? value : defaultValue;
    return val;
}

function fromDefaultValue(Comp) {
    class DefaultValue extends React.Component {
        constructor(props) {
            super(props);
            this.state = { val: updateDefault(props) };
        }
        componentDidMount() {
            this.notifyDefaultChange();
        }
        componentWillReceiveProps(nextProps) {
            this.setState({ val: updateDefault(nextProps) });
        }
        componentDidUpdate() {
            this.notifyDefaultChange();
        }
        notifyDefaultChange() {
            if (this.props.value !== this.state.val) {
                this.props.actions.setDefaultValue(this.props.path, this.state.val);
            }
        }
        render() {
            return (<Comp {...this.props} value={this.state.val} />);
        }
    }

    DefaultValue.propTypes = {
        value: PropTypes.any, // eslint-disable-line
        schema: PropTypes.shape({ // eslint-disable-line
            value: PropTypes.any
        }).isRequired,
        path: PropTypes.arrayOf(PropTypes.string).isRequired,
        actions: PropTypes.shape({
            setDefaultValue: PropTypes.func.isRequired
        }).isRequired
    };
    return DefaultValue;
}

export default fromDefaultValue;

import React, { PropTypes } from 'react';
import validator from '../Decorators/validator';
import { SimpleStringField } from './String';

class NumberField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.boundChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        // if values differ: update
        if (this.state.value - nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    onChange(val) {
        const value = val === '' ? undefined : val;
        const numVal = Number(value);
        this.setState({
            value
        }, () => this.props.onChange(isNaN(numVal) ? value : numVal));
    }
    render() {
        return (<SimpleStringField {...this.props}
                             value={ this.state.value }
                             onChange={ this.boundChange } />);
    }
}
NumberField.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default validator(NumberField);

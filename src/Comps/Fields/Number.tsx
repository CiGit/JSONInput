import * as React from 'react';
import validator from '../Decorators/validator';
import { SimpleStringField } from './String';
import { Schema, Action } from '../../../typings/types';

type Props = {
    schema: Schema & { type: 'number' | 'string' };
    value?: number;
    editKey: string;
    path: string[];
    dispatch: (action: Action, ...args: {}[]) => any;
    onChange: (value: string | void | number) => void;
};
/**
 * Transform to numeric value or undefined. Used to compare exp,
 * binary, hexa, ... strings
 * @param value value to convert
 */
function toNumber(value?: string | number) {
    switch (typeof value) {
        case 'number':
            return value;
        case 'string':
            return value === '' ? undefined : Number(value);
        default:
            return undefined;
    }
}
class NumberField extends React.Component<Props, { value?: string | number }> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps: Props) {
        if (toNumber(this.state.value) !== toNumber(nextProps.value)) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    onChange(val?: string | number) {
        const value: string | number | undefined = val === '' ? undefined : val;
        const numVal = Number(value);
        this.setState(
            {
                value,
            },
            () => this.props.onChange(isNaN(numVal) ? value : numVal)
        );
    }
    render() {
        return (
            <SimpleStringField
                {...this.props}
                value={this.state.value}
                onChange={this.onChange}
            />
        );
    }
}

export default validator(NumberField);

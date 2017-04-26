/* @flow */
import React from 'react';
import validator from '../Decorators/validator';
import { SimpleStringField } from './String';
import type { Schema } from '../../types.js.flow';

type Props = {
    schema: Schema & { type: 'number' | 'string' },
    value?: number,
    editKey: string,
    onChange: (string | void | number) => void,
    errorMessage: string[]
};

class NumberField
    extends React.Component<void, Props, { value?: string | void | number }> {
    state: {
        value?: string | void | number
    };
    boundChange: (value: number | string) => void;
    props: Props;
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.boundChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        // if numerical values differ: update
        if (Number(this.state.value) !== Number(nextProps.value)) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    onChange(val) {
        const value: string | void | number = val === '' ? undefined : val;
        const numVal = Number(value);
        this.setState(
            {
                value
            },
            () => this.props.onChange(isNaN(numVal) ? value : numVal)
        );
    }
    render() {
        return (
            <SimpleStringField
                {...this.props}
                value={this.state.value}
                onChange={this.boundChange}
            />
        );
    }
}

export default validator(NumberField);

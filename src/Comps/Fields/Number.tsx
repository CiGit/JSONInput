import React from 'react';
import validator from '../Decorators/validator';
import { SimpleStringField } from './String';
import { Schema, Action } from '../../../typings/types';

type Props = {
    schema: Schema & { type: 'number' | 'string' },
    value?: number,
    editKey: string,
    path: string[],
    dispatch: (action: Action, ...args: {}[]) => any,
    onChange: (value: string | void | number) => void
};

class NumberField
    extends React.Component<Props, { value?: string | number }> {
    boundChange: (value: number | string) => void;
    props: Props;
    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.boundChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps: Props) {
        // if numerical values differ: update
        if (Number(this.state.value) !== Number(nextProps.value)) {
            this.setState({
                value: nextProps.value
            });
        }
    }
    onChange(val?: string | number) {
        const value: string | number | undefined = val === '' ? undefined : val;
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
                {...(this.props as any)}
                value={this.state.value}
                onChange={this.boundChange}
            />
        );
    }
}

export default validator(NumberField);

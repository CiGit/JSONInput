// @flow
import React from 'react';

import type { Action, Schema } from '../../types.js.flow';

function updateDefault({ value, schema: { value: defaultValue } }) {
    const val = value !== undefined ? value : defaultValue;
    return val;
}
type Props = {
    actions: { [string]: Action, setDefaultValue: Action },
    editKey?: string,
    path: string[],
    value?: mixed,
    schema: Schema
};

function fromDefaultValue<P: Props>(
    Comp: Class<React.Component<*, P, *>> | ((props: P) => ?React.Element<P>)
) {
    class DefaultValue extends React.Component<void, *, *> {
        state: {
            val?: mixed
        };
        props: P;
        constructor(props: P) {
            super(props);
            this.state = { val: updateDefault(props) };
        }
        componentDidMount() {
            this.notifyDefaultChange();
        }
        componentWillReceiveProps(nextProps: P) {
            if (nextProps.schema !== this.props.schema) {
                this.setState(
                    { val: updateDefault(nextProps) },
                    this.notifyDefaultChange.bind(this)
                );
            } else {
                this.setState({ val: nextProps.value });
            }
        }
        notifyDefaultChange() {
            if (this.props.value !== this.state.val) {
                this.props.actions.setDefaultValue(
                    this.props.path,
                    this.state.val
                );
            }
        }
        render() {
            return <Comp {...this.props} value={this.state.val} />;
        }
    }

    return DefaultValue;
}

export default fromDefaultValue;

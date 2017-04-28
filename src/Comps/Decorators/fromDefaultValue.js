// @flow
import React from 'react';
import { setDefaultValue } from '../../Store/actions';
import type { Action, Schema } from '../../types.js.flow';

function updateDefault({ value, schema: { value: defaultValue } }) {
    const val = value !== undefined ? value : defaultValue;
    return val;
}
type Props = {
    editKey?: string,
    path: string[],
    value?: mixed,
    schema: Schema,
    dispatch: (Action, ...args: mixed[]) => any
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
                this.setState({ val: updateDefault(nextProps) });
            } else {
                this.setState({ val: nextProps.value });
            }
        }
        componentDidUpdate() {
            this.notifyDefaultChange();
        }
        notifyDefaultChange() {
            if (this.props.value !== this.state.val) {
                this.props.dispatch(
                    setDefaultValue,
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

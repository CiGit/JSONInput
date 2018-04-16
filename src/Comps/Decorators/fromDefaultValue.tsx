import * as React from 'react';
import { setDefaultValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

export type Props = {
    editKey?: string;
    path: string[];
    status: {
        state?: string;
    };
    value?: {};
    schema: Schema;
    dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
};
function updateDefault({ value, schema: { value: defaultValue } }: Props) {
    const val = value !== undefined ? value : defaultValue;
    return val;
}

function fromDefaultValue<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class DefaultValue extends React.Component<P, { val?: {} }> {
        static getDerivedStateFromProps(nextProps: P) {
            if (nextProps.status.state === undefined) {
                return { val: updateDefault(nextProps) };
            }
            return { val: nextProps.value };
        }
        state = { val: undefined };
        componentDidMount() {
            this.notifyDefaultChange();
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

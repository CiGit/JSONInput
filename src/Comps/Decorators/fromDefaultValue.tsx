import * as React from 'react';
import { setDefaultValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

export type Props = {
    editKey?: string;
    path: string[];
    status: {
        $$$state?: string;
    };
    value?: {};
    schema: Schema;
    dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
};
function updateDefault({
    value,
    schema: { value: defaultValue },
    dispatch,
    path,
}: Props) {
    const val = value !== undefined ? value : defaultValue;
    dispatch(setDefaultValue, path, val);
    return val;
}

function fromDefaultValue<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class DefaultValue extends React.Component<P, { val?: {} }> {
        static getDerivedStateFromProps(nextProps: P) {
            if (nextProps.status.$$$state === undefined) {
                /* 
                Should avoid side effects, 
                but in cDU, child is called before parent.
                */
                return { val: updateDefault(nextProps) };
            }
            return { val: nextProps.value };
        }
        state = { val: undefined };
        render() {
            return <Comp {...this.props} value={this.state.val} />;
        }
    }

    return DefaultValue;
}

export default fromDefaultValue;

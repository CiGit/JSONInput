// @flow
import React from 'react';
import { getFormValue } from '../../Store/actions';
import type { Action, Schema } from '../../types.js.flow';

type Props = {
    schema: Schema,
    value: mixed,
    editKey?: string,
    path: string[],
    dispatch: (Action, ...args: mixed[]) => any
};
function visibility<P: Props>(
    Comp: Class<React.Component<*, P, *>>
): (props: P) => ?React.Element<P> {
    return function Visible(props: P) {
        const { schema: { visible }, value } = props;
        if (visible && !visible(value, props.dispatch(getFormValue))) {
            return null;
        }
        return <Comp {...props} />;
    };
}

export default visibility;

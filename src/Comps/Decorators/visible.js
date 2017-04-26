// @flow
import React from 'react';

import type { Action, Schema } from '../../types.js.flow';

type Props = {
    schema: Schema,
    value: mixed,
    actions: {
        [string]: Action,
        getFormValue: Action
    }
};
function visibility<P: Props>(
    Comp: Class<React.Component<*, P, *>>
): (props: P) => ?React.Element<P> {
    return function Visible(props: P) {
        const { schema: { visible }, value } = props;
        if (visible && !visible(value, props.actions.getFormValue())) {
            return null;
        }
        return <Comp {...props} />;
    };
}

export default visibility;

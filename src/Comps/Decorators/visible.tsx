import * as React from 'react';
import { getFormValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

type Props = {
    schema: Schema;
    path: string[];
    value?: {};
    dispatch: (action: Action, ...args: {}[]) => any;
};
function visibility<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
): React.SFC<P> {
    return function Visible(props: P) {
        const { schema: { visible }, value } = props;
        try {
            if (
                visible &&
                !visible(
                    value,
                    props.dispatch(getFormValue),
                    props.path.concat() // Copy
                )
            ) {
                return null!;
            }
        } catch (e) {
            return null!;
        }
        return <Comp {...props} />;
    };
}

export default visibility;

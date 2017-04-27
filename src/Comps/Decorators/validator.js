// @flow
import React from 'react';
import validate from './../../Utils/customValidator';
import { getFormValue, getErrors } from '../../Store/actions';

import type { Schema, Action } from '../../types.js.flow';

type Props = {
    schema: Schema,
    value?: mixed,
    dispatch: (Action, ...args: mixed[]) => any,
    path: string[],
    onChange: mixed => void
};

function validated<P: Props>(
    Comp: Class<React.Component<*, *, *>> | ((*) => ?React.Element<*>)
) {
    function Validator(props: P) {
        function onChange(val: mixed): void {
            const validation = validate(
                val,
                props.schema,
                props.dispatch(getFormValue)
            );
            const err = validation.errors.map(error => error.message);
            props.onChange(val, err);
        }

        return (
            <Comp
                {...props}
                errorMessage={props.dispatch(getErrors, props.path)}
                onChange={onChange}
            />
        );
    }
    return Validator;
}

export default validated;

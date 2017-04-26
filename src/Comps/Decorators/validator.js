// @flow
import React from 'react';
import validate from './../../Utils/customValidator';
import type { Schema, Action } from '../../types.js.flow';

type Props = {
    schema: Schema,
    value?: mixed,
    actions: {
        [string]: Action,
        getFormValue: Action,
        getErrors: (string[]) => string[]
    },
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
                props.actions.getFormValue()
            );
            const err = validation.errors.map(error => error.message);
            props.onChange(val, err);
        }

        return (
            <Comp
                {...props}
                errorMessage={props.actions.getErrors(props.path)}
                onChange={onChange}
            />
        );
    }
    return Validator;
}

export default validated;

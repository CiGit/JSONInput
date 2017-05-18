import React from 'react';
import validate from './../../Utils/customValidator';
import { getFormValue, getErrors } from '../../Store/actions';

import { Schema, Action } from '../../../typings/types';

type Props = {
    schema: Schema,
    value?: {},
    dispatch: (action: Action, ...args: {}[]) => any,
    path: string[],
    onChange: (value: {}, errors?: string[]) => void
};

function validated<P extends Props>(
    Comp: React.ComponentClass<any> | React.SFC<any>
) {
    function Validator(props: P) {
        function onChange(val: {}): void {
            const validation = validate(
                val,
                props.schema,
                props.dispatch(getFormValue)
            );
            const err = validation.errors.map(error => error.message);
            props.onChange(val, err);
        }
        // console.log(getErrors);
        return (
            <Comp
                {...props }
                errorMessage={props.dispatch(getErrors, props.path)}
                onChange={onChange}
            />
        );
    }
    return Validator;
}

export default validated;

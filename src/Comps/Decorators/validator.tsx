import * as React from 'react';
import validate from './../../Utils/customValidator';
import { getErrors } from '../../Store/actions';

import { Schema, Action } from '../../../typings/types';
import { ValidationError } from 'jsonschema/lib';
import { FormConsumer } from '../../Store';

type Props = {
    schema: Schema;
    value?: any;
    dispatch: (action: Action, ...args: {}[]) => any;
    path: string[];
    onChange: (value: any, errors?: ValidationError[]) => void;
};

function validated<P extends Props>(
    Comp: React.ComponentType<P & { errorMessage?: string[] }>
) {
    function Validator(props: P) {
        return (
            <FormConsumer>
                {tree => (
                    <Comp
                        {...props}
                        errorMessage={getErrors(tree, props.path)}
                        onChange={val => {
                            const validation = validate(
                                val,
                                props.schema,
                                tree.value
                            );
                            props.onChange(val, validation.errors);
                        }}
                    />
                )}
            </FormConsumer>
        );
    }
    return Validator;
}

export default validated;

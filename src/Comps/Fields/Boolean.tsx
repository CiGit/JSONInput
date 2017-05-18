import React from 'react';
import Widget from '../Views/Widget';
import validator from './../Decorators/validator';

import{ Schema, Action } from '../../../typings/types';

function BooleanField(
    props: {
        schema: Schema & { type: 'boolean' },
        editKey: string,
        path: string[],
        value: boolean,
        onChange: (value: boolean) => void,
        dispatch: (action: Action, ...args: {}[]) => any,
    }
) {
    return <Widget {...(props as any)} />;
}

export default validator(BooleanField);

import React from 'react';
import Widget from '../Views/Widget';
import validator from '../Decorators/validator';

import { Schema, Action } from '../../../typings/types';

type Props = {
    schema: Schema & { type: 'number' | 'string' },
    value?: number | string,
    editKey: string,
    path: string[],
    onChange: (value: string | number) => void,
    dispatch: (action: Action, ...args: {}[]) => any,
};

function StringField(props: Props) {
    const val = props.value !== undefined && props.value !== null
        ? String(props.value)
        : props.value;
    return <Widget {...(props as any)} value={val} />;
}

export { StringField as SimpleStringField };
export default validator(StringField);

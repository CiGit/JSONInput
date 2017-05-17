import React from 'react';
import { ErrorFn } from './Utils/customValidator';
import Form from './Comps/Container';

export type TYPESTRING =
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'null';

type View = {
    type?:
    | string
    | React.Component<WidgetProp, {}>
    | React.SFC<WidgetProp>,
    [key: string]: any
};
export type Schema = {
    type: TYPESTRING | TYPESTRING[],
    value?: {},
    visible?: (value?: {}, formValue?: {}) => boolean,
    errored?: ErrorFn,
    index?: number,
    view?: View,
    [key: string]: any
};
export type WidgetProp = {
    value: {},
    onChange: ({ }) => void,
    schema: Schema,
    view: View,
    errorMessage?: string,
    children?: (React.ComponentClass<WidgetProp> | React.SFC<WidgetProp>)[],
    addKey?: (key: string, value: {}) => void,
    removeKey?: (key: string) => void,
    alterKey?: (key: string, newKey: string) => void,
    onChildAdd?: () => void,
    onChildRemove?: (index: number) => void
};

export type Action = (tree: any, path?: string[], ...args: {}[]) => {} | void;

export default Form;
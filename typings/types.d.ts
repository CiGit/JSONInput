import React from 'react';

type ErrorFn = (value: {}, formValue: {}) => string

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
    | React.ComponentClass<Widget.Props>
    | React.SFC<Widget.Props>,
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
declare namespace Widget {
    /**
     * Use for string / number / boolean widgets
     */
    type BaseProps = {
        value: {},
        onChange: (value: {}) => void,
        schema: Schema,
        view: View,
        errorMessage?: string,
    }
    /**
     * Use for Object widget
     */
    type ObjectProps = BaseProps & {
        children?: (React.ComponentClass<Props> | React.SFC<Props>)[],
        addKey: (key: string, value: {}) => void,
        removeKey: (key: string) => void,
        alterKey: (key: string, newKey: string) => void,
    }
    /**
     * Use for Array widget
     */
    type ArrayProps = {
        children?: (React.ComponentClass<Props> | React.SFC<Props>)[],
        onChildAdd: () => void,
        onChildRemove: (index: number) => void
    };
    /**
     * Props passed in widgets.
     */
    type Props = ArrayProps | BaseProps | ObjectProps
}

export type Action = (tree: any, path?: string[], ...args: {}[]) => {} | void;

import React from 'react';
import { Schema as JsonSchema } from "jsonschema/lib";

type ErrorFn = (value: {}, formValue: {}) => string

type TYPESTRING =
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'null';

type View = {
    type?:
    | string
    | React.ComponentClass<WidgetProps>
    | React.SFC<WidgetProps>,
    [key: string]: any
};
declare namespace Schema {
    type BASE = {
        type: TYPESTRING | TYPESTRING[];
        value?: {};
        visible?: (value?: {}, formValue?: {}) => boolean;
        errored?: ErrorFn;
        index?: number;
        view?: View;
        required?: boolean;
    }
    type String = BASE & {
        type: 'string' | ['string', 'null'];
        maxLength?: number;
        minLength?: number;
    }
    type Number = BASE & {
        type: 'number' | ['number', 'null'];
        maximum?: number;
        minimum?: number
    }
    type Boolean = BASE & {
        type: 'boolean' | ['boolean', 'null'];
    }
    type Object = BASE & {
        type: 'object' | ['object', 'null'];
        properties?: { [property: string]: Schema };
        additionalProperties?: Schema;
    }
    type Array = BASE & {
        type: 'array' | ['array', 'null']
        items?: Schema | Schema[];
        additionalItems?: Schema;
        maxItems?: number;
        minItems?: number;
    }
}
type Schema = Schema.BASE | Schema.String | Schema.Number | Schema.Boolean | Schema.Array | Schema.Object;
declare namespace WidgetProps {
    /**
     * Use for string / number / boolean widgets
     */
    type BaseProps = {
        value: {},
        onChange: (value: {}) => void,
        schema: Schema,
        view: View,
        errorMessage?: string[],
        editKey: string,
        path: string[]
    }
    /**
     * Use for Object widget
     */
    type ObjectProps = BaseProps & {
        children?: (React.ComponentClass<WidgetProps> | React.SFC<WidgetProps>)[],
        addKey: (key: string, value?: {}) => void,
        removeKey: (key: string) => void,
        alterKey: (key: string, newKey: string) => void,
    }
    /**
     * Use for Array widget
     */
    type ArrayProps = BaseProps & {
        children?: (React.ComponentClass<WidgetProps> | React.SFC<WidgetProps>)[],
        onChildAdd: () => void,
        onChildRemove: (index: number) => void
    };
}
    /**
     * Props passed in widgets.
     */
    type WidgetProps = WidgetProps.ArrayProps | WidgetProps.BaseProps | WidgetProps.ObjectProps

type Action = (tree: any, path?: string[], ...args: {}[]) => {} | void;

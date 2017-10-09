import * as React from 'react';

type ErrorFn = (
    value: {} | undefined | null,
    formValue: {} | undefined | null
) => string;

type TYPESTRING = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

type View = {
    type?: string | React.ComponentType<WidgetProps>;
    [key: string]: any;
};
declare namespace Schema {
    interface BASE {
        type?: TYPESTRING | TYPESTRING[];
        value?: {};
        visible?: (
            value: {} | undefined,
            formValue: {} | undefined,
            path: string[]
        ) => boolean;
        errored?: ErrorFn;
        index?: number;
        view?: View;
        required?: boolean;
    }
    interface String extends BASE {
        type?: 'string' | ['string', 'null'];
        maxLength?: number;
        minLength?: number;
    }
    interface Number extends BASE {
        type?: 'number' | ['number', 'null'];
        maximum?: number;
        minimum?: number;
    }
    interface Boolean extends BASE {
        type?: 'boolean' | ['boolean', 'null'];
    }
    interface Object extends BASE {
        type?: 'object' | ['object', 'null'];
        properties?: { [property: string]: Schema };
        additionalProperties?: Schema;
    }
    interface Array extends BASE {
        type?: 'array' | ['array', 'null'];
        items?: Schema | Schema[];
        additionalItems?: Schema;
        maxItems?: number;
        minItems?: number;
    }
}
type Schema =
    | Schema.BASE
    | Schema.String
    | Schema.Number
    | Schema.Boolean
    | Schema.Array
    | Schema.Object;
declare namespace WidgetProps {
    /**
     * Use for string / number / boolean widgets
     */
    interface BaseProps {
        value?: {};
        onChange: (value?: {}) => void;
        schema: Schema;
        view: View;
        errorMessage?: string[];
        editKey: string;
        path: string[];
    }
    /**
     * Use for Object widget
     */
    interface ObjectProps extends BaseProps {
        value?: object;
        schema: Schema.Object;
        children?: (
            | React.ComponentClass<WidgetProps>
            | React.SFC<WidgetProps>)[];
        addKey: (key: string, value?: {}) => void;
        removeKey: (key: string) => void;
        alterKey: (key: string, newKey: string) => void;
    }
    /**
     * Use for Array widget
     */
    interface ArrayProps extends BaseProps {
        value?: {}[];
        schema: Schema.Array;
        children?: (
            | React.ComponentClass<WidgetProps>
            | React.SFC<WidgetProps>)[];
        onChildAdd: (value?: {}) => void;
        onChildRemove: (index: number) => void;
    }
}
/**
 * Props passed in widgets.
 */
type WidgetProps =
    | WidgetProps.ArrayProps
    | WidgetProps.BaseProps
    | WidgetProps.ObjectProps;

type Action = (tree: any, path?: string[], ...args: {}[]) => {} | void;

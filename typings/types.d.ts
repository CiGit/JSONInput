import * as React from 'react';

type ErrorFn = (value: any, formValue: any) => string;

type TYPESTRING = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

interface BaseView {
    type?: string | React.ComponentType<WidgetProps>;
}
/**
 * Schema's view property
 * @template ViewBag  defining view props.
 */
type View<ViewBag = { [key: string]: any }> = BaseView & ViewBag;
declare namespace Schema {
    interface BASE<ViewBag = { [key: string]: any }> {
        type?: TYPESTRING | TYPESTRING[];
        value?: {};
        visible?: (value: any, formValue: any, path: string[]) => boolean;
        errored?: ErrorFn;
        index?: number;
        view?: View<ViewBag>;
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
        patternProperties?: { [pattern: string]: Schema };
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
/**
 * Schema for form's schema prop
 *
 * @template TView View's available types
 */
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
    interface BaseProps<ViewBag= { [key: string]: any }> {
        value?: {};
        onChange: (value?: {}) => void;
        schema: Schema;
        view: View<ViewBag>;
        errorMessage?: string[];
        editKey: string;
        path: string[];
    }
    /**
     * Use for Object widget
     */
    interface ObjectProps<ViewBag= { [key: string]: any }> extends BaseProps<ViewBag> {
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
    interface ArrayProps<ViewBag= { [key: string]: any }> extends BaseProps<ViewBag> {
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

type Action = (tree: any, path?: string[], ...args: any[]) => {} | void;

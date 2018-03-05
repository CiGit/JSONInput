import * as React from 'react';

type ErrorFn = (value: any, formValue: any) => string;

type TYPESTRING = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

/**
 * Schema's view property
 * @template TView strings defining view types.
 */
interface View<TView extends string> {
    type?: TView | React.ComponentType<WidgetProps<TView>>;
    [key: string]: any;
}
declare namespace Schema {
    interface BASE<TView extends string> {
        type?: TYPESTRING | TYPESTRING[];
        value?: {};
        visible?: (value: any, formValue: any, path: string[]) => boolean;
        errored?: ErrorFn;
        index?: number;
        view?: View<TView>;
        required?: boolean;
    }
    interface String<TView extends string = string> extends BASE<TView> {
        type?: 'string' | ['string', 'null'];
        maxLength?: number;
        minLength?: number;
    }
    interface Number<TView extends string = string> extends BASE<TView> {
        type?: 'number' | ['number', 'null'];
        maximum?: number;
        minimum?: number;
    }
    interface Boolean<TView extends string = string> extends BASE<TView> {
        type?: 'boolean' | ['boolean', 'null'];
    }
    interface Object<TView extends string = string> extends BASE<TView> {
        type?: 'object' | ['object', 'null'];
        properties?: { [property: string]: Schema<TView> };
        patternProperties?: { [pattern: string]: Schema<TView> };
        additionalProperties?: Schema<TView>;
    }
    interface Array<TView extends string = string> extends BASE<TView> {
        type?: 'array' | ['array', 'null'];
        items?: Schema<TView> | Schema<TView>[];
        additionalItems?: Schema<TView>;
        maxItems?: number;
        minItems?: number;
    }
}
/**
 * Schema for form's schema prop
 *
 * @template TView View's available types
 */
type Schema<TView extends string = string> =
    | Schema.BASE<TView>
    | Schema.String<TView>
    | Schema.Number<TView>
    | Schema.Boolean<TView>
    | Schema.Array<TView>
    | Schema.Object<TView>;
declare namespace WidgetProps {
    /**
     * Use for string / number / boolean widgets
     */
    interface BaseProps<TView extends string = string> {
        value?: {};
        onChange: (value?: {}) => void;
        schema: Schema<TView>;
        view: View<TView>;
        errorMessage?: string[];
        editKey: string;
        path: string[];
    }
    /**
     * Use for Object widget
     */
    interface ObjectProps<TView extends string = string>
        extends BaseProps<TView> {
        value?: object;
        schema: Schema.Object<TView>;
        children?: (
            | React.ComponentClass<WidgetProps<TView>>
            | React.SFC<WidgetProps<TView>>)[];
        addKey: (key: string, value?: {}) => void;
        removeKey: (key: string) => void;
        alterKey: (key: string, newKey: string) => void;
    }
    /**
     * Use for Array widget
     */
    interface ArrayProps<TView extends string = string>
        extends BaseProps<TView> {
        value?: {}[];
        schema: Schema.Array<TView>;
        children?: (
            | React.ComponentClass<WidgetProps<TView>>
            | React.SFC<WidgetProps<TView>>)[];
        onChildAdd: (value?: {}) => void;
        onChildRemove: (index: number) => void;
    }
}
/**
 * Props passed in widgets.
 */
type WidgetProps<TView extends string = string> =
    | WidgetProps.ArrayProps<TView>
    | WidgetProps.BaseProps<TView>
    | WidgetProps.ObjectProps<TView>;

type Action = (tree: any, path?: string[], ...args: any[]) => {} | void;

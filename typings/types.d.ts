import * as React from 'react';
import { Immutable } from 'immer';

type ErrorFn = (value: any, formValue: any, path: string[]) => string;

type TYPESTRING = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null';

interface BaseView {
  type?: string | React.ComponentType<WidgetProps>;
}

declare namespace Schema {
  interface BASE<ViewBag extends BaseView = BaseView> {
    type?: TYPESTRING | TYPESTRING[];
    value?: {};
    const?: {};
    visible?: (value: any, formValue: any, path: string[]) => boolean;
    errored?: ErrorFn;
    index?: number;
    view?: ViewBag;
    required?: boolean;
  }
  interface String<ViewBag extends BaseView = BaseView> extends BASE<ViewBag> {
    type?: 'string' | ['string', 'null'];
    maxLength?: number;
    minLength?: number;
  }
  interface Number<ViewBag extends BaseView = BaseView> extends BASE<ViewBag> {
    type?: 'number' | ['number', 'null'];
    maximum?: number;
    minimum?: number;
  }
  interface Boolean<ViewBag extends BaseView = BaseView> extends BASE<ViewBag> {
    type?: 'boolean' | ['boolean', 'null'];
  }
  interface Object<ViewBag extends BaseView = BaseView> extends BASE<ViewBag> {
    type?: 'object' | ['object', 'null'];
    properties?: { [property: string]: Schema };
    patternProperties?: { [pattern: string]: Schema };
    additionalProperties?: Schema;
  }
  interface Array<ViewBag extends BaseView = BaseView> extends BASE<ViewBag> {
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
type Schema<ViewBag extends BaseView = BaseView> =
  | Schema.BASE<ViewBag>
  | Schema.String<ViewBag>
  | Schema.Number<ViewBag>
  | Schema.Boolean<ViewBag>
  | Schema.Array<ViewBag>
  | Schema.Object<ViewBag>;
declare namespace WidgetProps {
  /**
   * Use for string / number / boolean widgets
   */
  interface BaseProps<ViewBag = {}> {
    value?: {} | null;
    onChange: (value?: {}) => void;
    schema: Schema<ViewBag>;
    view: ViewBag;
    errorMessage?: string[];
    editKey: string;
    path: string[];
    /**
     * Entire's container value.
     */
    formValue: {} | undefined | null;
  }
  /**
   * Use for Object widget
   */
  interface ObjectProps<ViewBag = {}> extends BaseProps<ViewBag> {
    value?: object | null;
    schema: Schema.Object<ViewBag>;
    children: (React.ReactElement<WidgetProps>)[];
    addKey: (key: string, value?: {}) => void;
    removeKey: (key: string) => void;
    alterKey: (key: string, newKey: string) => void;
  }
  /**
   * Use for Array widget
   */
  interface ArrayProps<ViewBag = {}> extends BaseProps<ViewBag> {
    value?: {}[] | null;
    schema: Schema.Array<ViewBag>;
    children: (React.ReactElement<WidgetProps>)[];
    onChildAdd: (value?: {}) => void;
    onChildRemove: (index: number) => void;
  }
}
/**
 * Props passed in widgets.
 */
type WidgetProps<ViewBag = {}> =
  | WidgetProps.BaseProps<ViewBag>
  | WidgetProps.ArrayProps<ViewBag>
  | WidgetProps.ObjectProps<ViewBag>;

type Action = (tree: any, path?: string[], ...args: any[]) => {} | void;

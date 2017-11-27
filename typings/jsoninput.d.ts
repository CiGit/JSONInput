import * as React from 'react';
import { Schema } from './types';
import { ValidationError } from 'jsonschema/lib';

type WidgetMap = {
    [key: string]: React.ComponentType<any>;
};
export function setDefaultWidgets(map: WidgetMap): void;

declare class Form extends React.Component<
    {
        schema?: {};
        value?: {};
        onChange: (value: any, errors: ValidationError[]) => void;
    },
    any
> {
    /**
     * Retrieve current form's value
     */
    getValue: () => {} | void;
    /**
     * Validate the entire form and pass errors down to views
     *
     */
    validate: () => ValidationError[];
}
export { Schema };
export default Form;

import React from 'react';
import { Schema } from '../src/types';
import { ValidationError } from "jsonschema/lib";
import { setDefaultWidgets } from "../src/index";

export { setDefaultWidgets }

declare class Form extends React.Component<
    { schema?: {}, value?: {}, onChange: (value: {}, errors: {}[]) => void }, any>{
    /**
     * Retrieve current form's value
     */
    getValue: () => {} | void;
    /**
     * Validate the entire form and pass errors down to views
     * 
     */
    validate: () => ValidationError[]
}
export { Schema };
export default Form;

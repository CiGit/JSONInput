import React from 'react';
import Fields from './Fields/index';
import visible from './Decorators/visible';
import UndefinedField from './Fields/Undefined';
import inference from './Decorators/inference';
import fromDefaultValue from './Decorators/fromDefaultValue';
import { update } from '../Store/actions';

import { Schema, Action } from '../types';

type SchemaProps = {
    schema: Schema,
    status: { [key: string]: {} },
    path: string[],
    dispatch: (action: Action, ...args: {}[]) => any,
    editKey?: string,
    value?: {}
};

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType extends React.Component<SchemaProps, undefined> {
    static defaultProps = {
        path: []
    };
    onChange: ({ }) => void;
    constructor(props: SchemaProps) {
        super(props);
        this.onChange = function onChange(...args: {}[]) {
            props.dispatch(update, props.path, ...args);
        };
    }
    shouldComponentUpdate(props: SchemaProps) {
        return true;
        // const { editKey, schema, value, status } = this.props;
        // return !(editKey === props.editKey &&
        //     schema === props.schema &&
        //     value === props.value &&
        //     status === props.status);
    }
    render() {
        const { schema: { type } } = this.props;
        const renderType = Array.isArray(type)
            ? type.find(t => t !== 'null')
            : type;
        let Type;
        if (renderType == null || renderType === 'null') {
            Type = UndefinedField;
        } else {
            Type = Fields[renderType];
        }
        return <Type {...(this.props as any)} onChange={this.onChange} />;
    }
}

export default inference(fromDefaultValue(visible(SchemaType)));

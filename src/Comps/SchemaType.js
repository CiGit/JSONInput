/* @flow */
import React from 'react';
import Fields from './Fields/index';
import visible from './Decorators/visible';
import UndefinedField from './Fields/Undefined';
import inference from './Decorators/inference';
import fromDefaultValue from './Decorators/fromDefaultValue';
import { update } from '../Store/actions';

import type { Schema, Action } from '../types.js.flow';

type SchemaProps = {
    schema: Schema,
    status: { [string | number]: {} },
    path: string[],
    dispatch: (Action, ...args: mixed[]) => any,
    editKey?: string,
    value: ?mixed
};

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType extends React.Component<*, SchemaProps, *> {
    onChange: mixed => void;
    constructor(props: SchemaProps) {
        super(props);
        this.onChange = function onChange(...args) {
            props.dispatch(update, props.path, ...args);
        };
    }
    shouldComponentUpdate(props: SchemaProps) {
        const { editKey, schema, value, status } = this.props;
        return !(editKey === props.editKey &&
            schema === props.schema &&
            value === props.value &&
            status === props.status);
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
        return <Type {...this.props} onChange={this.onChange} />;
    }
}
SchemaType.defaultProps = {
    path: []
};

export default inference(fromDefaultValue(visible(SchemaType)));

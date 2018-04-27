import * as React from 'react';
import Fields from './Fields/index';
import visible from './Decorators/visible';
import UndefinedField from './Fields/Undefined';
import inference from './Decorators/inference';
import fromDefaultValue from './Decorators/fromDefaultValue';
import { update, destroy } from '../Store/actions';

import { Schema, Action, TYPESTRING } from '../../typings/types';

type SchemaProps = {
    schema: Schema;
    status: { [key: string]: {} };
    path: string[];
    dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
    editKey?: string;
    value?: {};
};

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType<P extends SchemaProps> extends React.Component<P> {
    static defaultProps = {
        path: [],
    };
    constructor(props: P) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(...args: {}[]) {
        this.props.dispatch(update, this.props.path, ...args);
    }
    componentWillUnmount() {
        this.props.dispatch(destroy, this.props.path);
    }
    render() {
        const {
            schema: { type },
        } = this.props;
        const renderType = Array.isArray(type)
            ? (type as TYPESTRING[]).find(t => t !== 'null')
            : type;
        let Type: React.ComponentClass<any> | React.SFC<any>;
        if (renderType === undefined || renderType === 'null') {
            Type = UndefinedField;
        } else {
            Type = Fields[renderType];
        }
        if (Type === undefined) {
            Type = UndefinedField;
        }
        return <Type {...this.props} onChange={this.onChange} />;
    }
}
export default inference(fromDefaultValue(visible(SchemaType)));

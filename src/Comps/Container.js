// @flow
import React from 'react';
import { root, branch } from 'baobab-react/higher-order';
import createTree from '../Store/index';
import SchemaType from './SchemaType';
import * as actions from '../Store/actions';
import validate from './../Utils/customValidator';
import { setDefaultWidgets } from './Views/index';

import type { Schema, Action } from '../types.js.flow';

const BranchedSchemaType = branch(
    {
        schema: 'schema',
        status: 'status',
        value: 'value'
    },
    SchemaType
);

type Props = {
    onChange: mixed => any,
    schema?: Schema,
    value?: mixed
};

/**
 * Top Component
 */
class Container extends React.Component<void, Props, void> {
    static setDefaultWidgets: *;
    tree: any;
    ACTIONS: { [actionName: string]: Action };
    rooted: Class<
        React.Component<
            void,
            {
                onChange: mixed => void,
                actions: { [actionName: string]: Action },
                path: string[]
            },
            void
        >
    >;
    props: Props;

    constructor(props: Props) {
        super(props);
        this.tree = createTree();
        this.updateTree(props.value, props.schema);
        // should use dispatcher instead. from baobab-react v2
        this.ACTIONS = {};
        Object.keys(actions).forEach(action => {
            this.ACTIONS[action] = actions[action].bind(this.tree, this.tree);
        });
        this.rooted = root(this.tree, BranchedSchemaType);
    }
    componentDidMount() {
        this.tree
            .select('value')
            .on('update', event =>
                this.props.onChange(
                    event.data.currentData,
                    validate(
                        event.data.currentData,
                        this.tree.get('schema'),
                        event.data.currentData
                    ).errors
                )
            );
    }
    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.value === this.tree.get('value') &&
            nextProps.schema === this.props.schema
        ) {
            return;
        }
        this.updateTree(nextProps.value, nextProps.schema);
    }
    componentWillUnmount() {
        this.tree.release();
    }
    getValue() {
        return this.tree.get('value');
    }
    updateTree(value: mixed, schema?: Schema) {
        this.tree.set('value', value);
        this.tree.set('schema', schema || {});
        this.tree.set('status', {});
        this.tree.commit();
    }
    validate() {
        const validationResult = validate(
            this.tree.get('value'),
            this.tree.get('schema'),
            this.tree.get('value')
        );
        const { setErrors } = this.ACTIONS;
        const errorMap = new Map();
        // Collect each error associated with a given path
        validationResult.errors.forEach(error => {
            const errors = errorMap.get(error.property) || [];
            errors.push(error.message); // Add new error
            errorMap.set(error.property, errors);
        });
        errorMap.forEach((value, key) => {
            setErrors(
                key.split(/\.|\[|\]/).filter(x => x !== '').slice(1),
                value
            );
        });
        return validationResult.errors;
    }
    render() {
        const Rooted = this.rooted;
        return (
            <Rooted
                onChange={this.props.onChange}
                path={[]}
                actions={this.ACTIONS}
            />
        );
    }
}

Container.setDefaultWidgets = setDefaultWidgets;
export default Container;

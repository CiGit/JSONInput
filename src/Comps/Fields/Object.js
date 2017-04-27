/* @flow */
import React from 'react';
import SchemaType from '../SchemaType';
import Widget from '../Views/Widget';
import validator from '../Decorators/validator';
import { updateSchema, deleteSchema } from '../../Store/actions';

import type { Schema, Action } from '../../types.js.flow';

type Props = {
    schema: Schema & {
        properties?: { [property: string]: Schema },
        defaultProperties?: Schema
    },
    status: { [string | number]: {} },
    editKey: string,
    value: { [key: string]: mixed },
    dispatch: (Action, ...args: mixed[]) => any,
    path: Array<string>,
    onChange: ({}) => void
};
const EMPTY_OBJECT = {};

function renderChildren(props: Props): [] {
    const children = [];
    const properties: { [key: string]: Schema } = props.schema.properties || {};
    const value: { [key: string]: mixed } = props.value || {};
    // Holds schema properties and value properties missing from schema.
    const mergedProperties: Array<string> = Object.keys(properties);

    Object.keys(value).forEach(v => {
        if (v in properties) {
            return;
        }
        mergedProperties.push(v);
    });
    function indexFor(property: string): number {
        if (
            properties[property] &&
            typeof properties[property].index === 'number'
        ) {
            return properties[property].index;
        }
        return 0;
    }
    // Index based sorting
    function sortProperties(a: string, b: string): number {
        return indexFor(a) - indexFor(b);
    }

    mergedProperties.sort(sortProperties);
    for (let i: number = 0; i < mergedProperties.length; i += 1) {
        const prop: string = mergedProperties[i];
        if (prop in properties) {
            children.push(
                <SchemaType
                    {...props}
                    status={props.status[prop] || EMPTY_OBJECT}
                    schema={properties[prop]}
                    value={value[prop]}
                    editKey={prop}
                    key={prop}
                />
            );
        } else {
            const schema = props.schema.defaultProperties;
            if (schema) {
                props.dispatch(updateSchema, props.path.concat([prop]), schema);
            }
            children.push(
                <SchemaType
                    {...props}
                    status={props.status[prop] || EMPTY_OBJECT}
                    schema={schema}
                    value={value[prop]}
                    editKey={prop}
                    key={prop}
                />
            );
        }
    }
    return children;
}

function ObjectField(props: Props) {
    function addKey(key: string, value: mixed): void {
        props.onChange(
            Object.assign({}, props.value, {
                [key]: value
            })
        );
    }

    function removeKey(key: string): void {
        const value: {} = Object.assign({}, props.value);
        delete value[key];
        props.dispatch(deleteSchema, props.path.concat([key]), {});
        props.onChange(value);
    }

    function alterKey(key: string, newKey: string): void {
        const value: {} = {};
        Object.keys(props.value).forEach(p => {
            if (p !== key) {
                value[p] = props.value[p];
            } else {
                value[newKey] = props.value[p];
            }
        });
        props.onChange(value);
    }
    return (
        <Widget
            {...props}
            addKey={addKey}
            removeKey={removeKey}
            alterKey={alterKey}
        >
            {renderChildren(props)}
        </Widget>
    );
}

ObjectField.defaultProps = {
    value: {}
};

export default validator(ObjectField);

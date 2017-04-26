// @flow
import React from 'react';
import SchemaType from '../SchemaType';
import Widget from '../Views/Widget';
import validator from '../Decorators/validator';

import type { Schema, Action } from '../../types.js.flow';

type Props = {
    onChange: (mixed[]) => void,
    schema: Schema & {
        items?: Schema[],
        value?: mixed
    },
    value?: mixed[],
    editKey: string,
    status: { [string | number]: {} },
    actions: {
        [string]: Action,
        deleteSchema: Action
    },
    path: string[]
};
const EMPTY_OBJECT = {};

function onChildChange(index: number, props: Props) {
    return function onChange(val: mixed) {
        const { value } = props;
        if (value) {
            props.onChange(
                value.map((e, i) => {
                    if (+i !== +index) {
                        return e;
                    }
                    return val;
                })
            );
        } else {
            props.onChange([val]);
        }
    };
}

function onChildRemove(props: Props) {
    return function onRemove(index: number) {
        const oldValue = props.value || [];
        props.onChange(oldValue.filter((e, i) => Number(i) !== Number(index)));
    };
}

function onChildAdd(props: Props) {
    return function onAdd() {
        const oldValue = props.value || [];
        props.onChange(oldValue.concat([undefined]));
    };
}

function renderChildren(props: Props) {
    const { value, schema: { value: defaultValue, items } } = props;
    let valueItems: mixed[];
    if (value) {
        valueItems = value;
    } else if (defaultValue) {
        valueItems = defaultValue;
    } else {
        valueItems = [];
    }
    const children = [];
    valueItems.forEach((val, i) =>
        children.push(
            <SchemaType
                {...props}
                schema={Array.isArray(items) ? items[i] || {} : items}
                value={val}
                editKey={String(i)}
                status={props.status[String(i)] || EMPTY_OBJECT}
                key={i}
                onChange={onChildChange(i, props)}
            />
        )
    );
    return children;
}

function ArrayField(props: Props) {
    return (
        <Widget
            {...props}
            onChildAdd={onChildAdd(props)}
            onChildRemove={onChildRemove(props)}
        >
            {renderChildren(props)}
        </Widget>
    );
}

export default validator(ArrayField);

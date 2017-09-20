import * as React from 'react';
import SchemaType from '../SchemaType';
import Widget from './Widget';
import validator from '../Decorators/validator';

import { Schema, Action } from '../../../typings/types';

type Props = {
    onChange: (val: {}[]) => void;
    schema: Schema & {
        type: 'array';
        items?: Schema[] | Schema;
        value?: {}[];
    };
    dispatch: (action: Action, ...args: {}[]) => any;
    value?: {}[];
    editKey: string;
    status: { [key: string]: {} };
    path: string[];
    [key: string]: any;
};
const EMPTY_OBJECT = {};

function onChildChange(index: number, props: Props) {
    return function onChange(val: {}) {
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
    return function onAdd(value?: {}) {
        const oldValue = props.value || [];
        props.onChange(oldValue.concat([value]));
    };
}

function renderChildren(props: Props) {
    const { value, schema: { value: defaultValue, items } } = props;
    let valueItems: {}[];
    if (value) {
        valueItems = value;
    } else if (defaultValue) {
        valueItems = defaultValue as {}[];
    } else {
        valueItems = [];
    }
    const children: JSX.Element[] = [];
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
            {...props as any}
            onChildAdd={onChildAdd(props)}
            onChildRemove={onChildRemove(props)}
        >
            {renderChildren(props)}
        </Widget>
    );
}

export default validator(ArrayField);

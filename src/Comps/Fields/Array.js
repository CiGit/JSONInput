import React from 'react';
import SchemaType from '../SchemaType';
import Widget from '../Views/Widget';
import fromDefaultValue from '../Decorators/fromDefaultValue';

function onChildChange(index, props) {
    return function onChange(val) {
        const { value } = props;
        if (value) {
            props.onChange(value.map((e, i) => {
                if (+i !== +index) {
                    return e;
                }
                return val;
            }));
        } else {
            props.onChange([val]);
        }
    };
}

function onChildRemove(props) {
    return function onRemove(index) {
        return function doRemove() {
            const oldValue = props.value || [];
            props.onChange(oldValue.filter((e, i) => Number(i) !== Number(index)));
        };
    };
}

function onChildAdd(props) {
    return function onAdd() {
        const oldValue = props.value || [];
        props.onChange(oldValue.concat([undefined]));
    };
}

function renderChildren(props) {
    const { value, schema: { defaultValue, items } } = props;
    let valueItems;
    if (value) {
        valueItems = value;
    } else if (defaultValue) {
        valueItems = defaultValue;
    } else {
        valueItems = [];
    }
    const children = [];
    valueItems.forEach((val, i) => children.push(
        <SchemaType
            {...props}
            schema={Array.isArray(items) ? (items[i] || {}) : items}
            value={val}
            editKey={String(i)}
            key={i} // eslint-disable-line react/no-array-index-key, should UID
            onChange={onChildChange(i, props)}
        />
    ));
    return children;
}

function ArrayField(props) {
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

export default fromDefaultValue(ArrayField);

import React from 'react';
import SchemaType from '../SchemaType.jsx';
import Widget from '../Views/Widget.jsx';
import fromDefaultValue from '../Decorators/fromDefaultValue.jsx';

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
            props.onChange(oldValue.filter((e, i) => +i !== +index));
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
    const childSchema = items || {
        type: 'string'
    };
    let valueItems;
    if (value) {
        valueItems = value;
    } else if (defaultValue) {
        valueItems = defaultValue;
    } else {
        valueItems = [];
    }
    const children = [];
    for (const i in valueItems) {
        if (valueItems.hasOwnProperty(i)) {
            children.push(
                <SchemaType {...props}
                            schema={ childSchema }
                            value={ valueItems[i] }
                            editKey={ i }
                            key={ i }
                            onChange={ onChildChange(i, props) } />
            );
        }
    }
    return children;
}

function ArrayField(props) {
    return (<Widget {...props}
                    onChildAdd={ onChildAdd(props) }
                    onChildRemove={ onChildRemove(props) }>
              { renderChildren(props) }
            </Widget>);
}

export default fromDefaultValue(ArrayField);

import React, { PropTypes } from 'react';
import SchemaType from '../SchemaType';
import fromDefaultValue from '../Decorators/fromDefaultValue';
import Widget from '../Views/Widget';
import validator from '../Decorators/validator';


function renderChildren(props) {
    const children = [];
    const properties = props.schema.properties || {};
    const value = props.value || {};
    // Holds schema properties and value properties missing from schema.
    const mergedProperties = Object.keys(properties);

    Object.keys(value).forEach(v => {
        if (properties.hasOwnProperty(v)) {
            return;
        }
        mergedProperties.push(v);
    });

    // Index based sorting
    function sortProperties(a, b) {
        const aIndex = properties[a] ? properties[a].index || 0 : 0;
        const bIndex = properties[b] ? properties[b].index || 0 : 0;
        return aIndex - bIndex;
    }

    mergedProperties.sort(sortProperties);
    for (let i = 0; i < mergedProperties.length; i += 1) {
        const prop = mergedProperties[i];
        if (properties.hasOwnProperty(prop)) {
            children.push(<SchemaType {...props}
                                      schema={ properties[prop] }
                                      value={ value[prop] }
                                      editKey={ prop }
                                      key={ prop } />);
        } else {
            const schema = props.schema.defaultProperties;
            children.push(<SchemaType {...props}
                                      schema={ schema }
                                      value={ value[prop] }
                                      editKey={ prop }
                                      key={ prop } />);
        }
    }
    return children;
}

function ObjectField(props) {
    function addKey(key, value) {
        props.onChange(Object.assign({}, props.value, {
            [key]: value
        }));
    }

    function removeKey(key) {
        const value = Object.assign({}, props.value);
        delete value[key];
        props.onChange(value);
    }

    function alterKey(key, newKey) {
        const value = {};
        for (const p in props.value) {
            if (props.value.hasOwnProperty(p)) {
                if (p !== key) {
                    value[p] = props.value[p];
                } else {
                    value[newKey] = props.value[p];
                }
            }
        }
        props.onChange(value);
    }

    return (
        <Widget {...props}
                addKey={ addKey }
                removeKey={ removeKey }
                alterKey={ alterKey }>
          { renderChildren(props) }
        </Widget>);
}

ObjectField.propTypes = {
    schema: PropTypes.shape({
        properties: PropTypes.object
    }),
    children: PropTypes.node,
    value: PropTypes.any,
    path: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired
};

export default validator(fromDefaultValue(ObjectField));

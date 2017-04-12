import React from 'react';
import PropTypes from 'prop-types';
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

    Object.keys(value).forEach((v) => {
        if (v in properties) {
            return;
        }
        mergedProperties.push(v);
    });
    function indexFor(property) {
        if (properties[property] && typeof properties[property].index === 'number') {
            return properties[property].index;
        }
        return 0;
    }
    // Index based sorting
    function sortProperties(a, b) {
        return indexFor(a) - indexFor(b);
    }

    mergedProperties.sort(sortProperties);
    for (let i = 0; i < mergedProperties.length; i += 1) {
        const prop = mergedProperties[i];
        if (prop in properties) {
            children.push(
                <SchemaType
                    {...props}
                    schema={properties[prop]}
                    value={value[prop]}
                    editKey={prop}
                    key={prop}
                />
            );
        } else {
            const schema = props.schema.defaultProperties;
            if (schema) {
                props.actions.updateSchema(props.path.concat([prop]), schema);
            }
            children.push(
                <SchemaType
                    {...props}
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

function ObjectField(props) {
    function addKey(key, value) {
        props.onChange(Object.assign({}, props.value, {
            [key]: value
        }));
    }

    function removeKey(key) {
        const value = Object.assign({}, props.value);
        delete value[key];
        props.actions.deleteSchema(props.path.concat([key]), {});
        props.onChange(value);
    }

    function alterKey(key, newKey) {
        const value = {};
        Object.keys(props.value).forEach((p) => {
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

ObjectField.propTypes = {
    schema: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
        properties: PropTypes.object
    }).isRequired,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    path: PropTypes.arrayOf( // eslint-disable-line react/no-unused-prop-types
        PropTypes.string
    ).isRequired,
    onChange: PropTypes.func.isRequired
};
ObjectField.defaultProps = {
    value: {}
};

export default validator(fromDefaultValue(ObjectField));

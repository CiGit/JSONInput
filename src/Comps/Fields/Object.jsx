import React, { PropTypes } from 'react';
import SchemaType from '../SchemaType.jsx';
import fromDefaultValue from '../Decorators/fromDefaultValue.jsx';
import Widget from '../Views/Widget.jsx';
import validator from '../Decorators/validator.jsx';

function renderChildren(props) {
    const children = [];
    const properties = props.schema.properties || {};
    const value = props.value || {};
    // Holds schema properties and value properties missing from schema.
    const mergedProperties = Object.keys(properties);
    Object.keys(value).forEach(v => {
        if (properties.hasOwnProperty(v)) {
            return '';
        }
        return mergedProperties.push(v);
    });
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

    return (
        <Widget {...props}
                addKey={ addKey }
                removeKey={ removeKey }>
          { renderChildren(props) }
        </Widget>);
}

ObjectField.propTypes = {
    schema: PropTypes.shape({
        properties: PropTypes.object
    }),
    path: PropTypes.arrayOf(PropTypes.string)
};

export default validator(fromDefaultValue(ObjectField));

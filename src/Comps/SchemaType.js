import React, { PropTypes } from 'react';
import Fields from './Fields';
import visible from './Decorators/visible';
import shouldPureComponentUpdate from 'react-pure-render/function';
import UndefinedField from './Fields/Undefined';
import inference from './Decorators/inference';


/**
 * bind function callback with its path
 * @param {function(Array<String>)} func callback function to bind
 * @param {Array<string>} path the value's path to act on
 */
function doAction(func, path) {
    return function action(...args) {
        func(path, ...args);
    };
}

/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath, editKey) {
    if (editKey) {
        return currentPath.concat([editKey]);
    }
    return currentPath;
}

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType extends React.Component {
    shouldComponentUpdate(...args) {
        return shouldPureComponentUpdate.apply(this, args);
    }
    render() {
        const { actions, schema: { type } } = this.props;
        const renderType = Array.isArray(type) ? type.find(t => t !== 'null') : type;
        const Type = Fields[renderType] || UndefinedField;
        const valuePath = updatePath(this.props.path, this.props.editKey);
        return (<Type {...this.props}
                      path={ valuePath }
                      onChange={ doAction(actions.update, valuePath) } />);
    }
}

SchemaType.propTypes = {
    schema: PropTypes.shape({
        type: PropTypes.oneOfType([
            PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean']),
            PropTypes.arrayOf(
                PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean', 'null'])
            )
        ]).isRequired
    }).isRequired,
    path: PropTypes.arrayOf(PropTypes.string),
    editKey: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
};

export default inference(visible(SchemaType));

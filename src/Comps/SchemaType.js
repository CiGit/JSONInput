import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Fields from './Fields';
import visible from './Decorators/visible';
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
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */
class SchemaType extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = doAction(props.actions.update, props.path);
    }
    shouldComponentUpdate(...args) {
        return shouldPureComponentUpdate.apply(this, args);
    }
    render() {
        const { schema: { type } } = this.props;
        const renderType = Array.isArray(type) ? type.find(t => t !== 'null') : type;
        const Type = Fields[renderType] || UndefinedField;
        return (
            <Type
                {...this.props}
                onChange={this.onChange}
            />
        );
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

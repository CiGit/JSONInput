import React, { PropTypes } from 'react';
import createTree from '../Store';
import { root, branch } from 'baobab-react/higher-order';
import SchemaType from './SchemaType.jsx';
import * as actions from '../Store/actions';
import { validate } from './../Utils/customValidator';

const BranchedSchemaType = branch(SchemaType, {
    cursors: {
        schema: 'schema',
        status: 'status',
        value: 'value'
    } /* ,
    actions: {
        update,
        defaultValue,
        getStatus,
        getErrors
    }*/
});

/**
 * Top Component
 */
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.tree = createTree();
        this.tree.select('schema').set(props.schema);
        this.tree.select('value').set(props.value);
        this.tree.select('value')
            .on('update', event => this.props.onChange(event.data.currentData));

        // baobab-react optim as actions are bound on each render -> pure
        this.ACTIONS = {};
        Object.keys(actions)
            .forEach(action => this.ACTIONS[action] = actions[action].bind(this.tree, this.tree));
    }
    componentWillReceiveProps(nextProps) {
        this.tree.select('schema').set(nextProps.schema);
        this.tree.select('value').set(nextProps.value);
    }
    componentWillUnmount() {
        this.tree.release();
    }
    validate() {
        const validationResult = validate(this.tree.get('value'), this.props.schema);
        const { setErrors } = this.ACTIONS;
        const errorMap = new Map();
        // Collect each error associated with a given path
        validationResult.errors.forEach(error => {
            const errors = errorMap.get(error.property) || [];
            errors.push(error.message); // Add new error
            errorMap.set(error.property, errors);
        });
        errorMap.forEach((value, key) => {
            setErrors(key.split('.').slice(1), value);
        });
        return validationResult.errors;
    }
    render() {
        const Rooted = root(BranchedSchemaType, this.tree);
        return (<Rooted path={ [] }
                        actions={ this.ACTIONS } />);
    }
}
Container.propTypes = {
    onChange: PropTypes.func,
    schema: PropTypes.object,
    value: PropTypes.any
};

export default Container;

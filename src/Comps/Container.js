import React, { PropTypes } from 'react';
import { root, branch } from 'baobab-react/higher-order';
import createTree from '../Store/index';
import SchemaType from './SchemaType';
import * as actions from '../Store/actions';
import validate from './../Utils/customValidator';

const BranchedSchemaType = branch({
    schema: 'schema',
    status: 'status',
    value: 'value'
}, SchemaType);
const TYPES = ['string', 'number', 'boolean', 'object', 'array', 'null'];
/**
 * Top Component
 */
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.tree = createTree();
        this.updateTree(props.value, props.schema);
        // should use dispatcher instead. from baobab-react v2
        this.ACTIONS = {};
        Object.keys(actions)
            .forEach(action => (
                this.ACTIONS[action] = actions[action].bind(this.tree, this.tree)
            ));
        this.rooted = root(this.tree, BranchedSchemaType);
    }
    componentWillReceiveProps(nextProps) {
        this.updateTree(nextProps.value, nextProps.schema);
    }
    shouldComponentUpdate() {
        return false;
    }
    componentWillUnmount() {
        this.tree.release();
    }
    getValue() {
        return this.tree.get('value');
    }
    updateTree(value, schema) {
        this.tree.select('value').release();
        this.tree.select('value').set(value);
        this.tree.select('schema').set(schema);
        this.tree.select('status').release();
        this.tree.commit();
        this.tree.select('value')
            .on('update', event =>
                this.props.onChange(
                    event.data.currentData,
                    validate(
                        event.data.currentData,
                        this.tree.get('schema'),
                        event.data.currentData
                    ).errors
                )
            );
    }
    validate() {
        const validationResult = validate(this.tree.get('value'),
            this.tree.get('schema'), this.tree.get('value'));
        const { setErrors } = this.ACTIONS;
        const errorMap = new Map();
        // Collect each error associated with a given path
        validationResult.errors.forEach((error) => {
            const errors = errorMap.get(error.property) || [];
            errors.push(error.message); // Add new error
            errorMap.set(error.property, errors);
        });
        errorMap.forEach((value, key) => {
            setErrors(key.split(/\.|\[|\]/).filter(x => x !== '').slice(1), value);
        });
        return validationResult.errors;
    }
    render() {
        const Rooted = this.rooted;
        return (
            <Rooted
                onChange={this.props.onChange}
                path={[]}
                actions={this.ACTIONS}
            />
        );
    }
}
Container.propTypes = {
    onChange: PropTypes.func.isRequired,
    schema: PropTypes.shape({
        type: PropTypes.oneOfType([PropTypes.oneOf(TYPES),
            PropTypes.arrayOf(PropTypes.oneOf(TYPES))])
    }),
    value: PropTypes.any // eslint-disable-line
};
Container.defaultProps = {
    schema: {}
};

export default Container;

import * as React from 'react';
import { root, branch } from 'baobab-react/higher-order';
import createTree from '../Store/index';
import SchemaType from './SchemaType';
import validate from './../Utils/customValidator';
import { setValidationErrors } from '../Store/actions';

import { Schema } from '../../typings/types';
const EMPTY_ARRAY: any[] = [];
const BranchedSchemaType = branch(
    {
        schema: 'schema',
        status: 'status',
        value: 'value',
    },
    SchemaType
);

export type Props = {
    onChange: (value: {}, errors: {}[]) => void;
    schema: Schema;
    value?: {};
};
function noop() {}
/**
 * Top Component
 */
class Container extends React.Component<Props, undefined> {
    event: boolean = false;
    static defaultProps = { schema: {} };
    private tree: any;
    private rooted: React.StatelessComponent<{
        onChange: (value: {}, errors?: {}[]) => void;
        path: string[];
    }>;

    constructor(props: Props) {
        super(props);
        this.tree = createTree();
        this.updateTree(props.value, props.schema);
        this.rooted = root(this.tree, BranchedSchemaType);
    }
    componentDidMount() {
        this.tree
            .select('value')
            .on('update', (event: { data: { currentData: {} } }) => {
                if (this.event) {
                    this.props.onChange(
                        event.data.currentData,
                        validate(
                            event.data.currentData,
                            this.tree.get('schema'),
                            event.data.currentData
                        ).errors
                    );
                }
            });
    }

    componentDidUpdate(prevProps: Props) {
        if (
            this.props.value === this.tree.get('value') &&
            this.props.schema === prevProps.schema
        ) {
            return;
        }
        this.updateTree(this.props.value, this.props.schema);
    }
    componentWillUnmount() {
        this.tree.release();
    }
    // shouldComponentUpdate() {
    //     return false;
    // }
    getValue() {
        return this.tree.get('value');
    }
    updateTree(value?: {}, schema?: Schema) {
        this.event = false;
        this.tree.set('value', value);
        this.tree.set('schema', schema);
        this.tree.set('status', {});
        this.tree.commit();
        this.event = true;
    }
    validate() {
        const validationResult = validate(
            this.tree.get('value'),
            this.tree.get('schema'),
            this.tree.get('value')
        );
        setValidationErrors(this.tree, [], validationResult.errors);
        return validationResult.errors;
    }
    render() {
        const Rooted = this.rooted;
        return <Rooted onChange={noop} path={EMPTY_ARRAY} />;
    }
}

export default Container;

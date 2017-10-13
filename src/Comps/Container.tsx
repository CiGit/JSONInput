import * as React from 'react';
import { root, branch } from 'baobab-react/higher-order';
import createTree from '../Store/index';
import SchemaType from './SchemaType';
import validate from './../Utils/customValidator';
import { setValidationErrors } from '../Store/actions';

import { Schema } from '../../typings/types';

const BranchedSchemaType = branch(
    {
        schema: 'schema',
        status: 'status',
        value: 'value'
    },
    SchemaType
);

export type Props = {
    onChange: (value: {}, errors: {}[]) => void,
    schema: Schema,
    value?: {}
};
function noop() { };
/**
 * Top Component
 */
class Container extends React.Component<Props, undefined> {
    event: boolean;
    static defaultProps = { schema: {} };
    private tree: any;
    private rooted: React.StatelessComponent<{
        onChange: (value: {}, errors?: {}[]) => void,
        path: string[]
    }>;
    props: Props;

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
                    )
                }
            }
            );
    }

    componentWillReceiveProps(nextProps: Props) {
        if (
            nextProps.value === this.tree.get('value') &&
            nextProps.schema === this.props.schema
        ) {
            return;
        }
        this.updateTree(nextProps.value, nextProps.schema);
    }
    componentWillUnmount() {
        this.tree.release();
    }
    shouldComponentUpdate() {
        return false;
    }
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
        return <Rooted onChange={noop} path={[]} />;
    }
}

export default Container;

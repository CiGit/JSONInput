import React from 'react';
import infer from './../../Utils/infer';
import { Schema } from '../../../typings/types';
/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath: string[], editKey?: string): string[] {
    if (editKey) {
        return currentPath.concat([editKey]);
    }
    return currentPath;
}
type Props = {
    path: string[],
    editKey?: string,
    value?: {},
    schema?: Schema
};

/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class Infer extends React.Component<Partial<P> & Props, { schema: Schema }> {
        path: string[];
        state: {
            schema: Schema
        };
        constructor(props: P) {
            super(props);
            const { schema } = props;
            let inferredSchema = schema || {};
            if (!('type' in inferredSchema)) {
                inferredSchema = { type: infer(props.value), ...inferredSchema };
            }
            this.state = { schema: inferredSchema };
            this.path = updatePath(this.props.path, this.props.editKey);
        }
        componentWillReceiveProps(nextProps: P) {
            if (this.props.schema !== nextProps.schema) {
                let inferredSchema = nextProps.schema || {};
                if (!('type' in inferredSchema)) {
                    inferredSchema = { type: infer(nextProps.value), ...inferredSchema };
                }
                this.setState(() => ({ schema: inferredSchema }));
            }
        }
        render() {
            return (
                <Comp {...(this.props) } path={this.path} schema={this.state.schema} />
            );
        }
    }
    return Infer;
}

export default inference;

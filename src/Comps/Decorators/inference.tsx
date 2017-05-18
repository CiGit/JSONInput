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
    schema: Schema
};

/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class Infer extends React.Component<Props, { schema: Schema }> {
        state: {
            schema: Schema
        };
        constructor(props: Props) {
            super(props);
            const { schema } = props;
            let inferedSchema = schema;
            if (!inferedSchema || !('type' in inferedSchema)) {
                inferedSchema = { type: infer(props.value) };
            }
            this.state = { schema: inferedSchema };
        }
        componentWillReceiveProps(nextProps: Props) {
            if (this.props.schema !== nextProps.schema) {
                let inferedSchema = nextProps.schema;
                if (!inferedSchema || !('type' in inferedSchema)) {
                    inferedSchema = { type: infer(nextProps.value) };
                }
                this.setState(() => ({ schema: inferedSchema }));
            }
        }
        render() {
            const path = updatePath(this.props.path, this.props.editKey);
            return (
                <Comp {...(this.props as any) } path={path} schema={this.state.schema} />
            );
        }
    }
    return Infer;
}

export default inference;

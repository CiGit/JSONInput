import React, { PropTypes } from 'react';
import { infer } from './../../Utils/infer.js';
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
 * Decorator, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference(Comp) {
    /**
     * Statefull component, compute schema value from inferred value if missing.
     * Only on construct.
     */
    class Infer extends React.Component {
        constructor(props) {
            super(props);
            let { schema } = props;
            const path = updatePath(props.path, props.editKey);
            if (!schema) {
                schema = infer(props.value);
                props.actions.updateSchema(path, schema);
            }
            this.state = {
                schema,
                path
            };
        }
        render() {
            return (
                <Comp
                    {...this.props}
                    path={this.state.path}
                    schema={this.props.schema || this.state.schema}
                />
            );
        }
    }

    Infer.propTypes = {
        schema: PropTypes.object,
        value: PropTypes.any,
        path: PropTypes.arrayOf(PropTypes.string).isRequired,
        editKey: PropTypes.string,
        actions: PropTypes.objectOf(PropTypes.func).isRequired
    };
    return Infer;
}

export default inference;

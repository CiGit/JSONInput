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
    function Infer(props) {
        const { schema } = props;
        const path = updatePath(props.path, props.editKey);
        let inferedSchema = schema;
        if (!inferedSchema) {
            inferedSchema = infer(props.value);
            // props.actions.updateSchema(path, schema);
        }
        return (
            <Comp
                {...props}
                path={path}
                schema={inferedSchema}
            />
        );
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

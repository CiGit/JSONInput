import React, { PropTypes } from 'react';
import { infer } from './../../Utils/infer.js';
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
            if (!schema) {
                schema = infer(props.value);
            }
            this.state = {
                schema
            };
        }
        render() {
            return (<Comp {...this.props}
                          schema={ this.state.schema } />);
        }
    }

    Infer.propTypes = {
        schema: PropTypes.object,
        value: PropTypes.any
    };
    return Infer;
}

export default inference;

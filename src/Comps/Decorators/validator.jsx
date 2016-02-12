import React, { PropTypes } from 'react';
import { validate } from './../../Utils/customValidator';

function validated(Comp) {
    class Validator extends React.Component {
        constructor(props) {
            super(props);
            this.boundChange = this.onChange.bind(this);
        }
        onChange(val) {
            const validation = validate(val, this.props.schema);
            const err = validation.errors.map(error => error.message);
            this.props.onChange(val, err);
        }
        render() {
            return (<Comp {...this.props}
                          errorMessage={ this.props.actions.getErrors(this.props.path) }
                          onChange={ this.boundChange } />);
        }
    }

    Validator.propTypes = {
        onChange: PropTypes.func.isRequired,
        schema: PropTypes.shape({
            errored: PropTypes.func
        }),
        value: PropTypes.any,
        path: PropTypes.array.isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired
    };
    return Validator;
}

export default validated;

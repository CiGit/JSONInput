import React, { PropTypes } from 'react';
import validate from './../../Utils/customValidator';

function validated(Comp) {
    function Validator(props) {
        function onChange(val) {
            const validation = validate(val, props.schema, props.actions.getFormValue());
            const err = validation.errors.map(error => error.message);
            props.onChange(val, err);
        }

        return (
            <Comp
                {...props}
                errorMessage={props.actions.getErrors(props.path)}
                onChange={onChange}
            />
        );
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

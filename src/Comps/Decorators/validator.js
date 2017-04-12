import React from 'react';
import PropTypes from 'prop-types';
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
        }).isRequired,
        value: PropTypes.any, // eslint-disable-line
        path: PropTypes.arrayOf(PropTypes.string).isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired
    };
    return Validator;
}

export default validated;

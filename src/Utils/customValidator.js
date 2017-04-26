// @flow
import jsonschema, { Validator } from 'jsonschema';

import type { Schema } from '../types.js.flow';

type ValidationError = {
    instance: mixed,
    message: string,
    property: string
};
type ValidatorResult = {
    errors: ValidationError[]
};
const customValidator = new Validator();
customValidator.attributes.errored = function validateErrored(
    instance,
    schema,
    options
) {
    if (typeof schema.errored !== 'function') {
        throw new jsonschema.SchemaError('"errored" expects a function');
    }
    const msg = schema.errored(instance, options.formValue);
    if (msg) {
        return msg;
    }
    return undefined;
};
function validate(
    value: mixed,
    schema: Schema,
    formValue: mixed
): ValidatorResult {
    return customValidator.validate(value, schema, {
        formValue
    });
}

export default validate;

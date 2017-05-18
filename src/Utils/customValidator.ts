import jsonschema, { Validator } from 'jsonschema';
import { ValidatorResult, Options } from "jsonschema/lib";
import { Schema } from '../types';

export type ErrorFn = (value: {}, formValue: {}) => string

const customValidator = new Validator();
customValidator.attributes.errored = function validateErrored(
    instance: {},
    schema: { errored?: ErrorFn },
    options: { formValue: {} }
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
    value: {},
    schema: Schema,
    formValue: {}
): ValidatorResult {
    return customValidator.validate(value, schema, { formValue });
}

export default validate;

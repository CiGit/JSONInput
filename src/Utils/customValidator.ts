import * as jsonschema from 'jsonschema';
import { ValidatorResult } from "jsonschema/lib";
import { Schema, ErrorFn } from '../../typings/types';

const customValidator = new jsonschema.Validator();
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

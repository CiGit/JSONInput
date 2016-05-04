import jsonschema, { Validator } from 'jsonschema';

const customValidator = new Validator();
customValidator.attributes.errored = function validateErrored(instance, schema, options) {
    if (typeof schema.errored !== 'function') {
        throw new jsonschema.SchemaError('"errored" expects a function');
    }
    const msg = schema.errored(instance, options.formValue);
    if (msg) {
        return msg;
    }
    return undefined;
};
function validate(value, schema, formValue) {
    return customValidator.validate(value, schema, {
        formValue
    });
}

export { validate };

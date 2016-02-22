import jsonschema, { Validator } from 'jsonschema';
const customValidator = new Validator();
customValidator.attributes.errored = function validateErrored(instance, schema) {
    if (typeof schema.errored !== 'function') {
        throw new jsonschema.SchemaError('"errored" expects a function');
    }
    const msg = schema.errored(instance);
    if (msg) {
        return msg;
    }
    return undefined;
};
const validate = customValidator.validate.bind(customValidator);
export { validate };

import * as jsonschema from 'jsonschema';
import { ValidatorResult } from 'jsonschema/lib';
import { Schema, ErrorFn } from '../../typings/types';

const customValidator = new jsonschema.Validator();
customValidator.attributes.errored = function validateErrored(
  instance: {},
  schema: { errored?: ErrorFn },
  options: { formValue: {}; ctx: { basePath?: string[] } },
  ctx: { propertyPath: String },
) {
  if (typeof schema.errored !== 'function') {
    throw new jsonschema.SchemaError('"errored" expects a function');
  }
  const path = (options.ctx.basePath || []).concat(
    ctx.propertyPath.split('.').slice(1),
  );
  const msg = schema.errored(instance, options.formValue, path);
  if (msg) {
    return msg;
  }
  return undefined;
};
function validate(
  value: {} | undefined,
  schema: Schema,
  formValue?: {},
  basePath?: string[],
): ValidatorResult {
  return customValidator.validate(value, schema, {
    formValue: formValue || {},
    ctx: {
      basePath,
    },
  });
}

export default validate;

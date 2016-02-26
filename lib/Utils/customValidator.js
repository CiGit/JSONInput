'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate = undefined;

var _jsonschema = require('jsonschema');

var _jsonschema2 = _interopRequireDefault(_jsonschema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customValidator = new _jsonschema.Validator();
customValidator.attributes.errored = function validateErrored(instance, schema) {
    if (typeof schema.errored !== 'function') {
        throw new _jsonschema2.default.SchemaError('"errored" expects a function');
    }
    var msg = schema.errored(instance);
    if (msg) {
        return msg;
    }
    return undefined;
};
var validate = customValidator.validate.bind(customValidator);
exports.validate = validate;
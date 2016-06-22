'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _infer = require('./../../Utils/infer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath, editKey) {
    if (editKey) {
        return currentPath.concat([editKey]);
    }
    return currentPath;
}

/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference(Comp) {
    function Infer(props) {
        var schema = props.schema;

        var path = updatePath(props.path, props.editKey);
        var inferedSchema = schema;
        if (!inferedSchema) {
            inferedSchema = { type: (0, _infer.infer)(props.value) };
            // props.actions.updateSchema(path, schema);
        }
        return _react2.default.createElement(Comp, _extends({}, props, {
            path: path,
            schema: inferedSchema
        }));
    }

    return Infer;
}

exports.default = inference;
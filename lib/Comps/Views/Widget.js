'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Widget(props) {
    var schema = props.schema;
    var view = schema.view;

    var restSchema = _objectWithoutProperties(schema, ['view']);

    if (view) {
        var type = view.type;

        if (typeof type === 'string') {
            var _Wdgt = (0, _.defaultWidget)(type);
            return _react2.default.createElement(_Wdgt, _extends({}, props, {
                schema: restSchema,
                view: view }));
        }
        if (typeof type === 'function') {
            var Type = type;
            return _react2.default.createElement(Type, _extends({}, props, {
                schema: restSchema,
                view: view }));
        }
    }
    var Wdgt = (0, _.defaultWidget)(props.schema.type);
    return _react2.default.createElement(Wdgt, _extends({}, props, {
        schema: restSchema,
        view: Object.assign({}, view) }));
}

exports.default = Widget;
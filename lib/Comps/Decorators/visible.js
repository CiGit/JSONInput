'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function visibility(Comp) {
    function Visible(props) {
        var _props$schema = props.schema;
        var visible = _props$schema.visible;

        var restSchema = _objectWithoutProperties(_props$schema, ['visible']);

        var value = props.value;

        var rest = _objectWithoutProperties(props, ['schema', 'value']);

        if (visible && !visible(value, props.actions.getFormValue())) {
            return _react2.default.createElement('noscript', null);
        }
        return _react2.default.createElement(Comp, _extends({ schema: restSchema
        }, rest, {
            value: value }));
    }

    return Visible;
}

exports.default = visibility;
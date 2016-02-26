'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _undefinedWidgetFactory = require('./undefinedWidgetFactory');

var _undefinedWidgetFactory2 = _interopRequireDefault(_undefinedWidgetFactory);

var _ = require('.');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Widget(props) {
    if (props.schema && props.schema.view) {
        var view = props.schema.view;
        var type = view.type;

        if (typeof type === 'string') {
            var _Wdgt = (0, _.defaultWidget)(type);
            return _react2.default.createElement(_Wdgt, props);
        }
        if (typeof type === 'function') {
            var Type = type;
            return _react2.default.createElement(Type, props);
        }
        return (0, _undefinedWidgetFactory2.default)('' + props.path)();
    }
    var Wdgt = (0, _.defaultWidget)(props.schema.type);
    return _react2.default.createElement(Wdgt, props);
}

exports.default = Widget;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaType = require('../SchemaType');

var _SchemaType2 = _interopRequireDefault(_SchemaType);

var _fromDefaultValue = require('../Decorators/fromDefaultValue');

var _fromDefaultValue2 = _interopRequireDefault(_fromDefaultValue);

var _Widget = require('../Views/Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _validator = require('../Decorators/validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderChildren(props) {
    var children = [];
    var properties = props.schema.properties || {};
    var value = props.value || {};
    // Holds schema properties and value properties missing from schema.
    var mergedProperties = Object.keys(properties);
    Object.keys(value).forEach(function (v) {
        if (properties.hasOwnProperty(v)) {
            return '';
        }
        return mergedProperties.push(v);
    });
    for (var i = 0; i < mergedProperties.length; i += 1) {
        var prop = mergedProperties[i];
        if (properties.hasOwnProperty(prop)) {
            children.push(_react2.default.createElement(_SchemaType2.default, _extends({}, props, {
                schema: properties[prop],
                value: value[prop],
                editKey: prop,
                key: prop })));
        } else {
            var schema = props.schema.defaultProperties;
            children.push(_react2.default.createElement(_SchemaType2.default, _extends({}, props, {
                schema: schema,
                value: value[prop],
                editKey: prop,
                key: prop })));
        }
    }
    return children;
}

function ObjectField(props) {
    function addKey(key, value) {
        props.onChange(Object.assign({}, props.value, _defineProperty({}, key, value)));
    }

    function removeKey(key) {
        var value = Object.assign({}, props.value);
        delete value[key];
        props.onChange(value);
    }

    return _react2.default.createElement(
        _Widget2.default,
        _extends({}, props, {
            addKey: addKey,
            removeKey: removeKey }),
        renderChildren(props)
    );
}

exports.default = (0, _validator2.default)((0, _fromDefaultValue2.default)(ObjectField));
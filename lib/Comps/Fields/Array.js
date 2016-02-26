'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SchemaType = require('../SchemaType.jsx');

var _SchemaType2 = _interopRequireDefault(_SchemaType);

var _Widget = require('../Views/Widget.jsx');

var _Widget2 = _interopRequireDefault(_Widget);

var _fromDefaultValue = require('../Decorators/fromDefaultValue.jsx');

var _fromDefaultValue2 = _interopRequireDefault(_fromDefaultValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onChildChange(index, props) {
    return function onChange(val) {
        var value = props.value;

        if (value) {
            props.onChange(value.map(function (e, i) {
                if (+i !== +index) {
                    return e;
                }
                return val;
            }));
        } else {
            props.onChange([val]);
        }
    };
}

function onChildRemove(props) {
    return function onRemove(index) {
        return function doRemove() {
            var oldValue = props.value || [];
            props.onChange(oldValue.filter(function (e, i) {
                return +i !== +index;
            }));
        };
    };
}

function onChildAdd(props) {
    return function onAdd() {
        var oldValue = props.value || [];
        props.onChange(oldValue.concat([undefined]));
    };
}

function renderChildren(props) {
    var value = props.value;
    var _props$schema = props.schema;
    var defaultValue = _props$schema.defaultValue;
    var items = _props$schema.items;

    var childSchema = items || {
        type: 'string'
    };
    var valueItems = undefined;
    if (value) {
        valueItems = value;
    } else if (defaultValue) {
        valueItems = defaultValue;
    } else {
        valueItems = [];
    }
    var children = [];
    for (var i in valueItems) {
        if (valueItems.hasOwnProperty(i)) {
            children.push(_react2.default.createElement(_SchemaType2.default, _extends({}, props, {
                schema: childSchema,
                value: valueItems[i],
                editKey: i,
                key: i,
                onChange: onChildChange(i, props) })));
        }
    }
    return children;
}

function ArrayField(props) {
    return _react2.default.createElement(
        _Widget2.default,
        _extends({}, props, {
            onChildAdd: onChildAdd(props),
            onChildRemove: onChildRemove(props) }),
        renderChildren(props)
    );
}

exports.default = (0, _fromDefaultValue2.default)(ArrayField);
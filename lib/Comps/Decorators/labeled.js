'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function labeled(Comp) {
    function label(props) {
        var required = props.schema.required;
        var requiredClassName = required ? 'required' : '';
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'label',
                { className: props.schema.type + 'Field ' + requiredClassName },
                _react2.default.createElement(
                    'span',
                    { className: 'title' },
                    props.view.title || props.editKey
                ),
                _react2.default.createElement(Comp, props),
                _react2.default.createElement(
                    'span',
                    null,
                    props.view.description
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    props.errorMessage
                )
            )
        );
    }

    return label;
}

exports.default = labeled;
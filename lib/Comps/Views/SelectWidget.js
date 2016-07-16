'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectWidget(_ref) {
    var view = _ref.view;
    var value = _ref.value;
    var _onChange = _ref.onChange;

    var choices = view.choices.map(function (c) {
        return _react2.default.createElement(
            'option',
            {
                key: c.value,
                value: c.value
            },
            c.label
        );
    });
    return _react2.default.createElement(
        'select',
        { value: value, onChange: function onChange(e) {
                return _onChange(e.target.value);
            } },
        choices
    );
}
exports.default = SelectWidget;
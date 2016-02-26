'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _labeled = require('../Decorators/labeled');

var _labeled2 = _interopRequireDefault(_labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ObjectWidget(props) {
    return _react2.default.createElement(
        'div',
        null,
        props.children
    );
}

ObjectWidget.propTypes = {
    children: _react.PropTypes.arrayOf(_react.PropTypes.element)
};

exports.default = (0, _labeled2.default)(ObjectWidget);
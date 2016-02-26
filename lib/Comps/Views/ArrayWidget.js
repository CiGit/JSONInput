'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _labeled = require('../Decorators/labeled');

var _labeled2 = _interopRequireDefault(_labeled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ArrayWidget(props) {
    function renderChild(child, index) {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'span',
                { onClick: props.onChildRemove(index) },
                '-'
            ),
            child
        );
    }

    var children = _react2.default.Children.map(props.children, renderChild);
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'div',
            null,
            children
        ),
        _react2.default.createElement(
            'span',
            { onClick: props.onChildAdd },
            '+'
        )
    );
}

ArrayWidget.propTypes = {
    children: _react.PropTypes.arrayOf(_react.PropTypes.element),
    onChildRemove: _react.PropTypes.func.isRequired,
    onChildAdd: _react.PropTypes.func.isRequired
};
exports.default = (0, _labeled2.default)(ArrayWidget);
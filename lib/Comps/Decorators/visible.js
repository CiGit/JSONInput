'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function visibility(Comp) {
    function Visible(props) {
        var visible = props.schema.visible;
        var value = props.value;

        if (visible && !visible(value, props.actions.getFormValue())) {
            return _react2.default.createElement('noscript', null);
        }
        return _react2.default.createElement(Comp, props);
    }

    return Visible;
}

exports.default = visibility;
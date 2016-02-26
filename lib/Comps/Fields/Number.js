'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validator = require('../Decorators/validator');

var _validator2 = _interopRequireDefault(_validator);

var _String = require('./String');

var _String2 = _interopRequireDefault(_String);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberField = function (_React$Component) {
    _inherits(NumberField, _React$Component);

    function NumberField(props) {
        _classCallCheck(this, NumberField);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberField).call(this, props));

        _this.state = {
            value: props.value
        };
        _this.boundChange = _this.onChange.bind(_this);
        return _this;
    }

    _createClass(NumberField, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // if values differ: update
            if (_typeof(this.state.value) !== _typeof(nextProps.value) || this.state.value - nextProps.value) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'onChange',
        value: function onChange(val) {
            var _this2 = this;

            var numVal = Number(val);
            this.setState({
                value: val
            }, function () {
                return _this2.props.onChange(isNaN(numVal) ? val : numVal);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_String2.default, _extends({}, this.props, {
                value: this.state.value,
                onChange: this.boundChange }));
        }
    }]);

    return NumberField;
}(_react2.default.Component);

exports.default = (0, _validator2.default)(NumberField);
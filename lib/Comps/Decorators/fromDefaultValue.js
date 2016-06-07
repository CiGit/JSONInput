'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function updateDefault(_ref) {
    var value = _ref.value;
    var path = _ref.path;
    var actions = _ref.actions;
    var defaultValue = _ref.schema.value;

    var val = value !== undefined ? value : defaultValue;
    if (value !== val) {
        actions.setDefaultValue(path, val);
    }
}

function fromDefaultValue(Comp) {
    var DefaultValue = function (_React$Component) {
        _inherits(DefaultValue, _React$Component);

        function DefaultValue(props) {
            _classCallCheck(this, DefaultValue);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DefaultValue).call(this, props));

            updateDefault(props);
            return _this;
        }

        _createClass(DefaultValue, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.actions.getStatus(nextProps.path)) {
                    return;
                }
                updateDefault(nextProps);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Comp, this.props);
            }
        }]);

        return DefaultValue;
    }(_react2.default.Component);

    return DefaultValue;
}

exports.default = fromDefaultValue;
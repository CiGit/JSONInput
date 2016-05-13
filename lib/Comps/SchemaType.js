'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Fields = require('./Fields');

var _Fields2 = _interopRequireDefault(_Fields);

var _visible = require('./Decorators/visible');

var _visible2 = _interopRequireDefault(_visible);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _Undefined = require('./Fields/Undefined');

var _Undefined2 = _interopRequireDefault(_Undefined);

var _inference = require('./Decorators/inference');

var _inference2 = _interopRequireDefault(_inference);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * bind function callback with its path
 * @param {function(Array<String>)} func callback function to bind
 * @param {Array<string>} path the value's path to act on
 */
function doAction(func, path) {
    return function action() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        func.apply(undefined, [path].concat(args));
    };
}

/**
 * Component generating the correct field based on schema.type
 * @constructor
 * @param {Object} props
 */

var SchemaType = function (_React$Component) {
    _inherits(SchemaType, _React$Component);

    function SchemaType(props) {
        _classCallCheck(this, SchemaType);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SchemaType).call(this, props));

        _this.onChange = doAction(props.actions.update, props.path);
        return _this;
    }

    _createClass(SchemaType, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return _function2.default.apply(this, args);
        }
    }, {
        key: 'render',
        value: function render() {
            var type = this.props.schema.type;

            var renderType = Array.isArray(type) ? type.find(function (t) {
                return t !== 'null';
            }) : type;
            var Type = _Fields2.default[renderType] || _Undefined2.default;
            return _react2.default.createElement(Type, _extends({}, this.props, {
                onChange: this.onChange
            }));
        }
    }]);

    return SchemaType;
}(_react2.default.Component);

exports.default = (0, _inference2.default)((0, _visible2.default)(SchemaType));
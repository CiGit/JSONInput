'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _infer = require('./../../Utils/infer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath, editKey) {
    if (editKey) {
        return currentPath.concat([editKey]);
    }
    return currentPath;
}

/**
 * Decorator, compute schema value from inferred type if schema is missing
 * @param {React.Component} Comp component to decorate.
 * @return {React.Component} the decorated component.
 */
function inference(Comp) {
    /**
     * Statefull component, compute schema value from inferred value if missing.
     * Only on construct.
     */

    var Infer = function (_React$Component) {
        _inherits(Infer, _React$Component);

        function Infer(props) {
            _classCallCheck(this, Infer);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Infer).call(this, props));

            var schema = props.schema;

            var path = updatePath(props.path, props.editKey);
            if (!schema) {
                schema = (0, _infer.infer)(props.value);
                props.actions.updateSchema(path, schema);
            }
            _this.state = {
                schema: schema,
                path: path
            };
            return _this;
        }

        _createClass(Infer, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Comp, _extends({}, this.props, {
                    path: this.state.path,
                    schema: this.state.schema
                }));
            }
        }]);

        return Infer;
    }(_react2.default.Component);

    return Infer;
}

exports.default = inference;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Store = require('../Store');

var _Store2 = _interopRequireDefault(_Store);

var _higherOrder = require('baobab-react/higher-order');

var _SchemaType = require('./SchemaType');

var _SchemaType2 = _interopRequireDefault(_SchemaType);

var _actions = require('../Store/actions');

var actions = _interopRequireWildcard(_actions);

var _customValidator = require('./../Utils/customValidator');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BranchedSchemaType = (0, _higherOrder.branch)({
    schema: 'schema',
    status: 'status',
    value: 'value'
}, _SchemaType2.default);

/**
 * Top Component
 */

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, props));

        _this.tree = (0, _Store2.default)();
        _this.tree.select('value').set(props.value);
        _this.tree.select('schema').set(props.schema);
        _this.tree.select('value').on('update', function (event) {
            return _this.props.onChange(event.data.currentData);
        });
        // should use dispatcher instead. from baobab-react v2
        _this.ACTIONS = {};
        Object.keys(actions).forEach(function (action) {
            _this.ACTIONS[action] = actions[action].bind(_this.tree, _this.tree);
            return;
        });
        _this.rooted = (0, _higherOrder.root)(_this.tree, BranchedSchemaType);
        return _this;
    }

    _createClass(Container, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.tree.select('value').set(nextProps.value);
            this.tree.select('schema').set(nextProps.schema);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.tree.release();
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.tree.get('value');
        }
    }, {
        key: 'validate',
        value: function validate() {
            var validationResult = (0, _customValidator.validate)(this.tree.get('value'), this.tree.get('schema'), this.ACTIONS.getFormValue());
            var setErrors = this.ACTIONS.setErrors;

            var errorMap = new Map();
            // Collect each error associated with a given path
            validationResult.errors.forEach(function (error) {
                var errors = errorMap.get(error.property) || [];
                errors.push(error.message); // Add new error
                errorMap.set(error.property, errors);
            });
            errorMap.forEach(function (value, key) {
                setErrors(key.split(/\.|\[|\]/).filter(function (x) {
                    return x !== '';
                }).slice(1), value);
            });
            return validationResult.errors;
        }
    }, {
        key: 'render',
        value: function render() {
            var Rooted = this.rooted;
            return _react2.default.createElement(Rooted, {
                onChange: this.props.onChange,
                path: [],
                actions: this.ACTIONS
            });
        }
    }]);

    return Container;
}(_react2.default.Component);

exports.default = Container;
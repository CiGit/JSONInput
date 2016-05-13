'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */
var formSchema = {
    title: 'Form Base',
    type: 'object',
    properties: {
        titleString: {
            type: 'string',
            value: 'www',
            required: true,
            errored: function errored(val) {
                return val === 'www' ? 'world wide web' : '';
            },
            view: {
                title: 'This is a string'
            }
        },
        showNum: {
            type: 'boolean',
            value: false,
            index: -1,
            description: 'will toggle number input',
            view: {
                title: 'Number',
                type: function type(props) {
                    return _react2.default.createElement(
                        'select',
                        { onChange: function onChange(ev) {
                                return props.onChange(eval(ev.target.value));
                            } },
                        _react2.default.createElement(
                            'option',
                            null,
                            'true'
                        ),
                        _react2.default.createElement(
                            'option',
                            null,
                            'false'
                        )
                    );
                }
            }
        },
        num: {
            type: 'number',
            value: 4,
            index: -1,
            visible: function visible(value, formValue) {
                return formValue.showNum;
            },
            view: {
                title: 'A number'
            }
        },
        myArray: {
            type: 'array',
            items: {
                type: 'object',
                value: {
                    key1: 100
                },
                properties: {
                    key1: {
                        type: 'number',
                        title: 'object number',
                        placeholder: 'number in obj',
                        errored: function errored(val) {
                            return val > 100 ? 'too big' : '';
                        }
                    }
                },
                view: {
                    title: 'object array field title'
                }
            },
            view: {
                title: 'this is an array'
            }
        }
    }
};
/* eslint-enable */
var formData = {
    showNum: true,
    unknownKey: false,
    u: {
        a: 1,
        b: 3
    }
};
function stringify(obj) {
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            return value.toString();
        }
        return value;
    }, '  ');
}

function parse(str) {
    return JSON.parse(str, function (key, value) {
        if (value && typeof value === 'string' && value.indexOf('function') === 0) {
            var tmpFn = void 0;
            eval('tmpFn=' + value); // eslint-disable-line no-eval
            return tmpFn;
        }
        return value;
    });
}

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

        _this.state = {
            schema: formSchema,
            data: formData,
            editData: formData
        };
        // setDefaultWidgets({
        //     string: ""
        // });
        return _this;
    }

    _createClass(App, [{
        key: 'schemaChange',
        value: function schemaChange(event) {
            this.setState({
                schema: parse(event.target.value)
            });
        }
    }, {
        key: 'dataChange',
        value: function dataChange(event) {
            this.setState({
                data: parse(event.target.value)
            });
        }
    }, {
        key: 'editDataChange',
        value: function editDataChange(event) {
            this.setState({
                editData: event.target.value
            });
        }
    }, {
        key: 'formChange',
        value: function formChange(val) {
            this.setState({
                data: val,
                editData: stringify(val)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var styleLeft = {
                width: '45%',
                height: '300px'
            };
            var styleForm = {
                float: 'right',
                width: '50%'
            };
            var schemaChange = this.schemaChange.bind(this);
            var dataChange = this.dataChange.bind(this);
            var editDataChange = this.editDataChange.bind(this);
            var formChange = this.formChange.bind(this);
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: styleForm },
                    _react2.default.createElement(_index2.default, {
                        schema: this.state.schema,
                        value: this.state.data,
                        onChange: formChange
                    })
                ),
                _react2.default.createElement(
                    'h2',
                    null,
                    'schema'
                ),
                _react2.default.createElement('textarea', {
                    defaultValue: stringify(this.state.schema),
                    onBlur: schemaChange,
                    style: styleLeft
                }),
                _react2.default.createElement(
                    'h2',
                    null,
                    'value'
                ),
                _react2.default.createElement('textarea', {
                    value: this.state.editData,
                    onChange: editDataChange,
                    onBlur: dataChange,
                    style: styleLeft
                })
            );
        }
    }]);

    return App;
}(_react2.default.Component);

function mount() {
    (0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('container'));
}

mount();
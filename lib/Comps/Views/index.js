'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.undefinedWidgetFactory = exports.setDefaultWidgets = exports.defaultWidget = undefined;

var _undefinedWidgetFactory = require('./undefinedWidgetFactory');

var _undefinedWidgetFactory2 = _interopRequireDefault(_undefinedWidgetFactory);

var _TextWidget = require('./TextWidget');

var _TextWidget2 = _interopRequireDefault(_TextWidget);

var _ArrowNumberWidget = require('./ArrowNumberWidget');

var _ArrowNumberWidget2 = _interopRequireDefault(_ArrowNumberWidget);

var _CheckboxWidget = require('./CheckboxWidget');

var _CheckboxWidget2 = _interopRequireDefault(_CheckboxWidget);

var _ArrayWidget = require('./ArrayWidget');

var _ArrayWidget2 = _interopRequireDefault(_ArrayWidget);

var _ObjectWidget = require('./ObjectWidget');

var _ObjectWidget2 = _interopRequireDefault(_ObjectWidget);

var _SelectWidget = require('./SelectWidget');

var _SelectWidget2 = _interopRequireDefault(_SelectWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultWidget = {
    string: _TextWidget2.default,
    number: _TextWidget2.default,
    boolean: _CheckboxWidget2.default,
    array: _ArrayWidget2.default,
    object: _ObjectWidget2.default,
    arrowNumber: _ArrowNumberWidget2.default,
    select: _SelectWidget2.default
};

function defaultWidget(type) {
    return DefaultWidget[type] || (0, _undefinedWidgetFactory2.default)(type);
}

function setDefaultWidgets(obj) {
    DefaultWidget = Object.assign({}, DefaultWidget, obj);
}

exports.defaultWidget = defaultWidget;
exports.setDefaultWidgets = setDefaultWidgets;
exports.undefinedWidgetFactory = _undefinedWidgetFactory2.default;
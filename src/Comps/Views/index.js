import undefinedWidgetFactory from './undefinedWidgetFactory.jsx';
import TextWidget from './TextWidget.jsx';
import ArrowNumberWidget from './ArrowNumberWidget.jsx';
import CheckboxWidget from './CheckboxWidget.jsx';
import ArrayWidget from './ArrayWidget.jsx';
import ObjectWidget from './ObjectWidget.jsx';

let DefaultWidget = {
    string: TextWidget,
    number: TextWidget,
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: ObjectWidget,
    arrowNumber: ArrowNumberWidget
};

function defaultWidget(type) {
    return DefaultWidget[type] || undefinedWidgetFactory(type);
}

function setDefaultWidgets(obj) {
    DefaultWidget = Object.assign({}, DefaultWidget, obj);
}

export { defaultWidget, setDefaultWidgets, undefinedWidgetFactory };

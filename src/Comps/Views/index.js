import undefinedWidgetFactory from './undefinedWidgetFactory';
import TextWidget from './TextWidget';
import ArrowNumberWidget from './ArrowNumberWidget';
import CheckboxWidget from './CheckboxWidget';
import ArrayWidget from './ArrayWidget';
import ObjectWidget from './ObjectWidget';

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

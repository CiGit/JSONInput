import undefinedWidget from './undefinedWidgetFactory.jsx';
import TextWidget from './TextWidget.jsx';
import ArrowNumberWidget from './ArrowNumberWidget.jsx';
import CheckboxWidget from './CheckboxWidget.jsx';
import ArrayWidget from './ArrayWidget.jsx';
import ObjectWidget from './ObjectWidget.jsx';

const DefaultWidget = {
    string: TextWidget,
    number: TextWidget,
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: ObjectWidget
};

function defaultWidget(type) {
    return DefaultWidget[type] || undefinedWidget(type);
}

export { defaultWidget, TextWidget, CheckboxWidget, ArrowNumberWidget };

import * as React from 'react';
import undefinedWidgetFactory from './undefinedWidgetFactory';
import TextWidget from './TextWidget';
import ArrowNumberWidget from './ArrowNumberWidget';
import CheckboxWidget from './CheckboxWidget';
import ArrayWidget from './ArrayWidget';
import ObjectWidget from './ObjectWidget';
import SelectWidget from './SelectWidget';
import HashmapWidget from './HashmapWidget';

import { WidgetProps } from '../../../typings/types';

export type WidgetMap = {
    [key: string]: React.ComponentClass<WidgetProps> | React.SFC<WidgetProps>;
};
let DefaultWidget: WidgetMap = {
    string: TextWidget,
    number: TextWidget,
    boolean: CheckboxWidget,
    array: ArrayWidget,
    object: ObjectWidget,
    arrowNumber: ArrowNumberWidget,
    select: SelectWidget,
    hashmap: HashmapWidget,
};

function defaultWidget(type: string) {
    return DefaultWidget[type] || undefinedWidgetFactory(type);
}

function setDefaultWidgets(obj: WidgetMap) {
    DefaultWidget = Object.assign({}, DefaultWidget, obj);
}

export { defaultWidget, setDefaultWidgets, undefinedWidgetFactory };

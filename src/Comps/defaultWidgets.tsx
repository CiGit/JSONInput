import * as React from 'react';
import { WidgetProps } from '../../typings/types';

export type WidgetMap = {
    [key: string]: React.ComponentClass<WidgetProps> | React.SFC<WidgetProps>;
};

function undefinedWidgetFactory(type: string) {
    return function UndefinedWidget() {
        return <span>{`Widget for '${type}' was not defined`}</span>;
    };
}
let DefaultWidget: WidgetMap = {};

function defaultWidget(type: string) {
    return DefaultWidget[type] || undefinedWidgetFactory(type);
}

function setDefaultWidgets(obj: WidgetMap) {
    DefaultWidget = Object.assign({}, DefaultWidget, obj);
}

export { defaultWidget, setDefaultWidgets };

import React from 'react';
import { defaultWidget } from './index';

import { WidgetProps, TYPESTRING } from '../../../typings/types';

type Props = WidgetProps & {
    editKey: string,
    path: string[],
    children?: (React.ComponentClass<WidgetProps> | React.SFC<WidgetProps>)[],
    addKey?: (key: string, value: {}) => void,
    removeKey?: (key: string) => void,
    alterKey?: (key: string, newKey: string) => void,
    onChildAdd?: () => void,
    onChildRemove?: (index: number) => void
};

const EMPTYOBJECT = {};
function Widget(props: Props) {
    const {
        value,
        schema,
        schema: { view },
        children,
        editKey,
        path,
        onChange,
        onChildAdd,
        onChildRemove,
        addKey,
        removeKey,
        alterKey,
        errorMessage,
    } = props;
    const forwardProps = {
        value,
        schema,
        children,
        editKey,
        path,
        onChange,
        onChildAdd,
        onChildRemove,
        addKey,
        removeKey,
        alterKey,
        errorMessage
    };
    if (view) {
        const { type } = view;
        if (typeof type === 'string') {
            const Wdgt = defaultWidget(type);
            return <Wdgt {...forwardProps} view={view} />;
        }
        if (typeof type === 'function') {
            const Type = type;
            return <Type {...forwardProps} view={view} />;
        }
    }
    let renderType = Array.isArray(schema.type)
        ? (schema.type as TYPESTRING[]).find(t => t !== 'null')
        : schema.type;
    let Wdgt;
    if (renderType === undefined) {
        Wdgt = defaultWidget('undefinedType');
    } else {
        Wdgt = defaultWidget(renderType)
    }
    return <Wdgt {...forwardProps} view={view || EMPTYOBJECT} />;
}

export default Widget;

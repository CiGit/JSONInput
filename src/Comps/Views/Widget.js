// @flow
import React from 'react';
import { defaultWidget } from './index';

import type { Schema, WidgetProp } from '../../types.js.flow';

type Props = {
    value: mixed,
    onChange: (value: any) => void,
    schema: Schema,
    editKey: string,
    path: string[],
    children?: React$Element<*>,
    addKey?: (key: string, value: mixed) => void,
    removeKey?: (key: string) => void,
    alterKey?: (key: string, newKey: string) => void,
    onChildAdd?: () => void,
    onChildRemove?: (index: number) => void,
    errorMessage?: string
};

const EMPTYOBJECT = {};
function Widget(props: Props): React$Element<WidgetProp> {
    const {
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
    const { view } = schema;
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
        ? schema.type.find(t => t !== 'null')
        : schema.type;
    if (renderType === undefined) {
        renderType = 'undefinedType';
    }
    const Wdgt = defaultWidget(renderType);
    return <Wdgt {...forwardProps} view={view || EMPTYOBJECT} />;
}

export default Widget;

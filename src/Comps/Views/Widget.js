import React, { PropTypes } from 'react';
import undefinedWidgetFactory from './undefinedWidgetFactory';
import { defaultWidget } from '.';

function Widget(props) {
    if (props.schema && props.schema.view) {
        const view = props.schema.view;
        const { type } = view;
        if (typeof type === 'string') {
            const Wdgt = defaultWidget(type);
            return <Wdgt {...props} />;
        }
        if (typeof type === 'function') {
            const Type = type;
            return <Type {...props} />;
        }
        return undefinedWidgetFactory(`${props.path}`)();
    }
    const Wdgt = defaultWidget(props.schema.type);
    return <Wdgt {...props} />;
}

Widget.propTypes = {
    schema: PropTypes.object,
    path: PropTypes.array
};
export default Widget;

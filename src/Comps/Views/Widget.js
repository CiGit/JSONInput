import React, { PropTypes } from 'react';
import { defaultWidget } from './index';

const EMPTYOBJECT = {};
function Widget(props) {
    const { schema } = props;
    const { view, ...restSchema } = schema;
    if (view) {
        const { type } = view;
        if (typeof type === 'string') {
            const Wdgt = defaultWidget(type);
            return (
                <Wdgt
                    {...props}
                    schema={restSchema}
                    view={view}
                />
            );
        }
        if (typeof type === 'function') {
            const Type = type;
            return (
                <Type
                    {...props}
                    schema={restSchema}
                    view={view}
                />
            );
        }
    }
    const renderType = Array.isArray(schema.type) ?
        schema.type.find(t => t !== 'null') :
        schema.type;
    const Wdgt = defaultWidget(renderType);
    return (
        <Wdgt
            {...props}
            schema={restSchema}
            view={view || EMPTYOBJECT}
        />
    );
}

Widget.propTypes = {
    schema: PropTypes.shape({
        type: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ]).isRequired
    }).isRequired
};
export default Widget;

import React, { PropTypes } from 'react';
import { defaultWidget } from '.';

function Widget(props) {
    const { schema } = props;
    const { view, ...restSchema } = schema;
    if (view) {
        const { type } = view;
        if (typeof type === 'string') {
            const Wdgt = defaultWidget(type);
            return (<Wdgt {...props}
                          schema={ restSchema }
                          view={ view } />);
        }
        if (typeof type === 'function') {
            const Type = type;
            return (<Type {...props}
                         schema={ restSchema }
                         view={ view } />);
        }
    }
    const Wdgt = defaultWidget(props.schema.type);
    return (<Wdgt {...props}
                  schema={ restSchema }
                  view={ Object.assign({}, view) } />);
}

Widget.propTypes = {
    schema: PropTypes.object,
    path: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func)
};
export default Widget;

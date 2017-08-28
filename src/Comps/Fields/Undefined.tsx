import * as React from 'react';

import { WidgetProps } from '../../../typings/types';

function Undefined(props: WidgetProps) {
    return (
        <span>{`Undefined field type "${props.schema.type.toString()}", [${props.path.toString()}]`}</span>
    );
}

export default Undefined;

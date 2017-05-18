import React from 'react';

import { Schema } from '../../../typings/types';

type Props = {
    schema: Schema,
    path: string[]
};

function Undefined(props: Props) {
    return (
        <span>{`Undefined field type "${props.schema.type.toString()}", [${props.path.toString()}]`}</span>
    );
}

export default Undefined;

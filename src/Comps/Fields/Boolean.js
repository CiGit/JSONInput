// @flow
import React from 'react';
import Widget from '../Views/Widget';
import validator from './../Decorators/validator';

import type { Schema } from '../../types.js.flow';

function BooleanField(
    props: {
        schema: Schema & { type: 'boolean' },
        editKey: string,
        value: boolean,
        onChange: (value: boolean) => void
    }
) {
    return <Widget {...props} />;
}

export default validator(BooleanField);

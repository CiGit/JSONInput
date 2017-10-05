import * as React from 'react';
type v = Record<
    'string' | 'number' | 'object' | 'boolean' | 'array',
    React.ComponentType
>;
declare const view: v;
export default view;

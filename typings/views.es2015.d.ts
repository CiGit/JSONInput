import * as React from 'react';

type View = Record<
    | 'string'
    | 'number'
    | 'object'
    | 'boolean'
    | 'array'
    | 'arrowNumber'
    | 'select'
    | 'hashmap',
    React.ComponentType
>;
declare const view: View;
export default view;

// @flow
import React from 'react';

function undefinedWidgetFactory(
    type: string
): (...props: mixed[]) => React$Element<*> {
    return function UndefinedWidget() {
        return (
            <span>
                {`Widget for '${type}' was not defined`}
            </span>
        );
    };
}

export default undefinedWidgetFactory;

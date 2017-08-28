import * as React from 'react';

function undefinedWidgetFactory(
    type: string
) {
    return function UndefinedWidget() {
        return (
            <span>
                {`Widget for '${type}' was not defined`}
            </span>
        );
    };
}

export default undefinedWidgetFactory;

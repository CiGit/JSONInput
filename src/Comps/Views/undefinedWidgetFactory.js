import React from 'react';

function undefinedWidgetFactory(type) {
    return function UndefinedWidget() {
        return (
            <span>
                {`Widget for '${type}' was not defined`}
            </span>
        );
    };
}

export default undefinedWidgetFactory;

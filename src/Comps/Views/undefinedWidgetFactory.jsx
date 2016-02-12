import React from 'react';

function undefinedWidgetFactory(type) {
    return function UndefinedWidget() {
        return (<div>
                  { `Widget for '${type}' was not defined` }
                </div>);
    };
}

export default undefinedWidgetFactory;

import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

function purePropsRenderer(Comp) {
    return class PureProps extends React.Component {
        shouldComponentUpdate(...args) {
            return shouldPureComponentUpdate.apply(this, ...args);
        }
        render() {
            return <Comp {...this.props} />;
        }
    };
}

export default purePropsRenderer;

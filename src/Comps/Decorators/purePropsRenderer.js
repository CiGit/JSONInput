/* @flow */
import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

function purePropsRenderer<P: {}, S>(
    Comp:
        | Class<React.Component<void, P, S>>
        | ((props: P) => ?React$Element<*>)
): Class<React.Component<void, P, void>> {
    class PureProps extends React.Component {
        shouldComponentUpdate(nextProps: P) {
            return shouldPureComponentUpdate.apply(this, nextProps);
        }
        render() {
            return <Comp {...this.props} />;
        }
    }
    return PureProps;
}

export default purePropsRenderer;

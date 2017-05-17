import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

function purePropsRenderer<P extends {}, S>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class PureProps extends React.Component<P, any> {
        shouldComponentUpdate(nextProps: P) {
            return shouldPureComponentUpdate.apply(this, nextProps);
        }
        render() {
            return <Comp {...(this.props as any)} />;
        }
    }
    return PureProps;
}

export default purePropsRenderer;

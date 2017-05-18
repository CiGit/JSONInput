import React from 'react';
import { setDefaultValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

export type Props = {
    editKey?: string,
    path: string[],
    value?: {},
    schema: Schema,
    dispatch: (action: Action, ...args: ({} | void)[]) => any
};
function updateDefault({ value, schema: { value: defaultValue } }: Props) {
    const val = value !== undefined ? value : defaultValue;
    return val;
}

function fromDefaultValue<P extends Props>(
    Comp: React.ComponentClass<P> | React.SFC<P>
) {
    class DefaultValue extends React.Component<Props, { val?: {} }> {
        constructor(props: Props) {
            super(props);
            this.state = { val: updateDefault(props) };
            this.notifyDefaultChange();
        }
        componentDidMount() {
        }
        componentWillReceiveProps(nextProps: Props) {
            if (nextProps.schema !== this.props.schema) {
                this.setState({ val: updateDefault(nextProps) });
            } else {
                this.setState({ val: nextProps.value });
            }
            this.notifyDefaultChange();
        }
        componentDidUpdate() {
        }
        notifyDefaultChange() {
            if (this.props.value !== this.state.val) {
                this.props.dispatch(
                    setDefaultValue,
                    this.props.path,
                    this.state.val
                );
            }
        }
        render() {
            return <Comp {...(this.props as any) } value={this.state.val} />;
        }
    }

    return DefaultValue;
}

export default fromDefaultValue;

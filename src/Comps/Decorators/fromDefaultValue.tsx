import * as React from 'react';
import { cloneDeep } from 'lodash-es';
import { setDefaultValue } from '../../Store/actions';
import { Action, Schema } from '../../../typings/types';

export type Props = {
  editKey?: string;
  path: string[];
  status: {
    $$$state?: string;
  };
  value?: {};
  schema: Schema;
  dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
};
function updateDefault({
  value,
  schema: { value: defaultValue },
  dispatch,
  path,
}: Props) {
  const val = value !== undefined ? value : cloneDeep(defaultValue);
  if (val !== value) {
    dispatch(setDefaultValue, path, val);
  }
  return val;
}

function fromDefaultValue<P extends Props>(
  Comp: React.ComponentClass<P> | React.SFC<P>,
) {
  class DefaultValue extends React.Component<P, { val?: {} }> {
    static getDerivedStateFromProps(nextProps: P) {
      if (nextProps.status.$$$state !== undefined) {
        return null;
      }
      return { val: nextProps.value };
    }
    state = { val: this.props.value };
    componentDidMount() {
      const val = updateDefault(this.props);
      if (val !== this.state.val) {
        this.setState({ val });
      }
    }
    componentDidUpdate() {
      const val = updateDefault(this.props);
      if (val !== this.state.val) {
        this.setState({ val });
      }
    }
    render() {
      return <Comp {...this.props} value={this.state.val} />;
    }
  }

  return DefaultValue;
}

export default fromDefaultValue;

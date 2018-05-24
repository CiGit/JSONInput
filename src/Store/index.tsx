import * as React from 'react';
import immer from 'immer';

interface StoreProps {
  value?: {};
  schema: {};
  onValueChange: (value: {}) => void;
  children: (
    props: {
      dispatch: (
        action: (state: any, ...extraArgs: any[]) => void,
        ...args: any[]
      ) => void;
      schema: {};
      value: {};
      status: {};
    },
  ) => JSX.Element;
}
const FormContext = React.createContext<{
  value?: {};
  schema: {};
  status: {};
}>({
  value: undefined,
  schema: {},
  status: {},
});
export const FormConsumer = FormContext.Consumer;
export class Store extends React.Component<StoreProps> {
  state = {
    schema: {},
    value: {},
    status: {},
    oldProps: {},
  };
  static getDerivedStateFromProps(
    nextProps: StoreProps,
    state: {
      schema: {};
      value: {};
      status: {};
      oldProps: StoreProps;
    },
  ) {
    if (state.oldProps !== nextProps) {
      let ret: Partial<typeof Store.prototype.state> = {
        value: nextProps.value,
        schema: nextProps.schema,
        oldProps: nextProps,
      };
      if (nextProps.value !== state.value) {
        ret.status = {};
      }
      return ret;
    }
    return null;
  }
  dispatch = (
    action: (state: any, ...extraArgs: any[]) => void,
    ...args: any[]
  ) => {
    this.setState(prevState => {
      return (immer(action) as (state: any, ...extraArgs: any[]) => any)(
        prevState,
        ...args,
      );
    });
  };
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.state !== nextState;
  }
  componentDidUpdate(prevProps: StoreProps, prevState: { value: {} }) {
    if (
      this.state.value !== prevState.value &&
      // This is not an update due to a props change.
      this.props.value === prevProps.value
    ) {
      this.props.onValueChange(this.state.value);
    }
  }
  render() {
    const { schema, value, status } = this.state;
    return (
      <FormContext.Provider value={this.state}>
        {this.props.children({
          schema,
          value,
          status,
          dispatch: this.dispatch,
        })}
      </FormContext.Provider>
    );
  }
}

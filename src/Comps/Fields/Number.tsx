import * as React from 'react';
import validator from '../Decorators/validator';
import { SimpleStringField } from './String';
import { Schema, Action } from '../../../typings/types';

interface Props {
  schema: Schema & { type: 'number' | 'string' };
  value?: number;
  editKey: string;
  path: string[];
  dispatch: (action: Action, ...args: {}[]) => any;
  onChange: (value: string | void | number) => void;
}
/**
 * Transform to numeric value or undefined. Used to compare exp,
 * binary, hexa, ... strings
 * @param value value to convert
 */
function toNumber(value?: string | number) {
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return value === '' ? undefined : Number(value);
    default:
      return undefined;
  }
}
class NumberField extends React.Component<Props, { value?: string | number }> {
  static getDerivedStateFromProps = (
    props: Props,
    state: { value?: string | number },
  ) => {
    if (toNumber(state.value) !== toNumber(props.value)) {
      return {
        value: props.value,
      };
    }
    return null;
  };
  state = { value: this.props.value };
  onChange = (val?: string | number) => {
    const value: string | number | undefined = val === '' ? undefined : val;
    const numVal = Number(value);
    this.setState(
      {
        value,
      },
      () => this.props.onChange(isNaN(numVal) ? value : numVal),
    );
  };
  render() {
    return (
      <SimpleStringField
        {...this.props}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}
export default validator<Props>(NumberField);

import * as React from 'react';
import validate from './../../Utils/customValidator';
import { getErrors } from '../../Store/actions';

import { Schema, Action } from '../../../typings/types';
import { ValidationError } from 'jsonschema/lib';
import { FormConsumer } from '../../Store';

type Props = {
  schema: Schema;
  value?: any;
  dispatch: (action: Action, ...args: {}[]) => any;
  path: string[];
  onChange: (value: any, errors?: ValidationError[]) => void;
};

function validated<P extends Props>(
  Comp: React.ComponentType<P & { errorMessage?: string[] }>,
) {
  class Validator extends React.Component<P & { __tree: any, path: string[] }> {
    onChange = (val?: {}) => {
      const validation = validate(
        val,
        this.props.schema,
        this.props.__tree.value,
        this.props.path,
      );
      this.props.onChange(val, validation.errors);
    };
    shouldComponentUpdate(nextProps: P & { __tree: any }) {
      return (
        this.props.value !== nextProps.value ||
        this.props.schema !== nextProps.schema ||
        getErrors(this.props.__tree, this.props.path) !==
          getErrors(nextProps.__tree, nextProps.path)
      );
    }
    render() {
      const { path } = this.props;
      return (
        <Comp
          {...this.props}
          errorMessage={getErrors(this.props.__tree, path)}
          onChange={this.onChange}
        />
      );
    }
  }
  return (p: P) => {
    return (
      <FormConsumer>{tree => <Validator {...p} __tree={tree} />}</FormConsumer>
    );
  };
}

export default validated;

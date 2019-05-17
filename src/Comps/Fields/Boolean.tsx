import * as React from 'react';
import Widget from './Widget';
import validator from './../Decorators/validator';

import { Schema, Action } from '../../../typings/types';
import { FormContext } from '../../Store';
interface Props {
  schema: Schema & { type: 'boolean' };
  editKey: string;
  path: string[];
  __tree: FormContext;
  value: boolean;
  onChange: (value?: boolean) => void;
  dispatch: (action: Action, ...args: {}[]) => any;
}
function BooleanField(props: Props) {
  return <Widget {...props} />;
}

export default validator(BooleanField);

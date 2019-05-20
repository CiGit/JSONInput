import * as React from 'react';
import { Schema, TYPESTRING } from '../../../typings/types';
import { FormContext } from '../../Store';
import { defaultWidget } from '../defaultWidgets';

type Props = {
  value?: {};
  schema: Schema;
  editKey: string;
  __tree: FormContext;
  onChange: (value: any) => void;
  errorMessage?: string[];
  path: string[];
  children?: JSX.Element[];
  addKey?: (key: string, value: {}) => void;
  removeKey?: (key: string) => void;
  alterKey?: (key: string, newKey: string) => void;
  onChildAdd?: () => void;
  onChildRemove?: (index: number) => void;
};

const EMPTYOBJECT = {};
function Widget<P extends Props>(props: P) {
  const {
    value,
    schema,
    schema: { view },
    __tree: { value: formVal },
    children,
    editKey,
    path,
    onChange,
    onChildAdd,
    onChildRemove,
    addKey,
    removeKey,
    alterKey,
    errorMessage,
  } = props;
  const forwardProps = {
    value,
    schema,
    children,
    editKey,
    path,
    onChange,
    onChildAdd,
    onChildRemove,
    addKey,
    removeKey,
    alterKey,
    errorMessage,
  };
  if (view) {
    const { type } = view;
    if (typeof type === 'string') {
      const Wdgt = defaultWidget(type);
      return <Wdgt {...forwardProps} formValue={formVal} view={view} />;
    }
    if (typeof type === 'function') {
      const Type = type;
      return <Type {...forwardProps} formValue={formVal} view={view} />;
    }
  }
  let renderType = Array.isArray(schema.type)
    ? (schema.type as TYPESTRING[]).find(t => t !== 'null')
    : schema.type;
  let Wdgt;
  if (renderType === undefined) {
    Wdgt = defaultWidget('undefinedType');
  } else {
    Wdgt = defaultWidget(renderType);
  }
  return (
    <Wdgt
      {...forwardProps}
      formValue={formVal}
      view={view || EMPTYOBJECT}
    />
  );
}

export default Widget;

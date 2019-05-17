import * as React from 'react';
import SchemaType from '../SchemaType';
import Widget from './Widget';
import validator from '../Decorators/validator';

import { Schema, Action } from '../../../typings/types';
import { FormContext } from '../../Store';

type Props = {
  schema: Schema.Object;
  status: { [key: string]: {} };
  dispatch: (action: Action, ...args: ({} | undefined)[]) => any;
  editKey: string;
  __tree: FormContext;
  value: {
    [key: string]: {};
  };
  path: string[];
  onChange: (value: {}) => void;
};
/**
 * Get schema from properties field
 * @param schema Object's schema
 * @param prop prop to get schema for
 */
function schemaFromProperties(schema: Schema.Object, prop: string) {
  const { properties = {} } = schema;
  if (prop in properties) {
    return properties[prop];
  }
}
/**
 * Retrieve **first** matching schema from patternProperties
 * @param schema Object's schema
 * @param prop prop to get schema for
 */
function schemaFromPattern(schema: Schema.Object, prop: string) {
  const patternProperties = schema.patternProperties || {};
  const patterns = Object.keys(patternProperties);
  const p = patterns.find(p => new RegExp(p).test(prop));
  if (p) {
    return patternProperties[p];
  }
}
/**
 * Get schema for a given property
 * @param schema Object's schema
 * @param prop prop to get schema for
 */
function schemaForProp(schema: Schema.Object, prop: string) {
  return (
    schemaFromProperties(schema, prop) ||
    schemaFromPattern(schema, prop) ||
    schema.additionalProperties
  );
}
const EMPTY_OBJECT = {};

function renderChildren(props: Props) {
  const children = [];
  const properties = props.schema.properties || {};
  const value: { [key: string]: {} } = props.value || {};
  // Holds schema properties and value properties missing from schema.
  const mergedProperties: Array<string> = Object.keys(properties);

  Object.keys(value).forEach(v => {
    if (v in properties) {
      return;
    }
    mergedProperties.push(v);
  });
  function indexFor(property: string): number {
    if (properties[property]) {
      const index = properties[property].index;
      if (typeof index === 'number') {
        return index;
      }
    }
    return 0;
  }
  // Index based sorting
  function sortProperties(a: string, b: string): number {
    return indexFor(a) - indexFor(b);
  }

  mergedProperties.sort(sortProperties);
  for (let i: number = 0; i < mergedProperties.length; i += 1) {
    const prop: string = mergedProperties[i];
    const propSchema = schemaForProp(props.schema, prop);
    children.push(
      <SchemaType
        {...props}
        status={props.status[prop] || EMPTY_OBJECT}
        schema={propSchema}
        value={value[prop]}
        editKey={prop}
        key={i}
      />,
    );
  }
  return children;
}

function ObjectField(props: Props) {
  function addKey(key: string, value: {}): void {
    if (typeof props.value === 'object' && key in props.value) {
      throw new Error(`Property "${key}" already exists`);
    }
    props.onChange(
      Object.assign({}, props.value, {
        [key]: value,
      }),
    );
  }

  function removeKey(key: string): void {
    const value: { [key: string]: {} } = Object.assign({}, props.value);
    delete value[key];
    props.onChange(value);
  }

  function alterKey(key: string, newKey: string): void {
    if (key === newKey) {
      return;
    }
    if (newKey in props.value) {
      throw new Error(`Property "${newKey}" already exists`);
    }
    const value: { [key: string]: {} } = {};
    Object.keys(props.value).forEach(p => {
      if (p !== key) {
        value[p] = props.value[p];
      } else {
        value[newKey] = props.value[p];
      }
    });
    props.onChange(value);
  }
  return (
    <Widget
      {...props}
      addKey={addKey}
      removeKey={removeKey}
      alterKey={alterKey}
    >
      {renderChildren(props)}
    </Widget>
  );
}

export default validator(ObjectField);

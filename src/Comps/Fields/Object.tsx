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

class ObjectField extends React.Component<Props> {
  keys = new Map<string, string>();
  keyId = 0;
  renderChildren(props: Props) {
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
    const keys = new Map<string, string>();
    for (let i: number = 0; i < mergedProperties.length; i += 1) {
      const prop: string = mergedProperties[i];
      const propSchema = schemaForProp(props.schema, prop);
      if (!this.keys.has(prop)) {
        keys.set(prop, String(this.keyId++));
      } else {
        keys.set(prop, this.keys.get(prop)!);
      }
      children.push(
        <SchemaType
          {...props}
          status={props.status[prop] || EMPTY_OBJECT}
          schema={propSchema}
          value={value[prop]}
          editKey={prop}
          key={keys.get(prop)}
        />,
      );
    }
    this.keys = keys;
    return children;
  }

  addKey = (key: string, value?: unknown): void => {
    if (typeof this.props.value === 'object' && key in this.props.value) {
      throw new Error(`Property "${key}" already exists`);
    }
    this.keys.set(key, String(this.keyId++));
    this.props.onChange(
      Object.assign({}, this.props.value, {
        [key]: value,
      }),
    );
  };
  removeKey = (key: string): void => {
    const value: { [key: string]: {} } = Object.assign({}, this.props.value);
    delete value[key];
    this.keys.delete(key);
    this.props.onChange(value);
  };
  alterKey = (key: string, newKey: string): void => {
    if (key === newKey) {
      return;
    }
    if (newKey in this.props.value) {
      throw new Error(`Property "${newKey}" already exists`);
    }
    const value: { [key: string]: {} } = {};
    Object.keys(this.props.value).forEach(p => {
      if (p !== key) {
        value[p] = this.props.value[p];
      } else {
        value[newKey] = this.props.value[p];
      }
    });
    const currentElementKey = this.keys.get(key);
    this.keys.delete(key);
    this.keys.set(newKey, currentElementKey!);
    this.props.onChange(value);
  };
  render() {
    return (
      <Widget
        {...this.props}
        addKey={this.addKey}
        removeKey={this.removeKey}
        alterKey={this.alterKey}
      >
        {this.renderChildren(this.props)}
      </Widget>
    );
  }
}
export default validator(ObjectField);

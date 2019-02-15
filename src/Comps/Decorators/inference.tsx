import * as React from 'react';
import infer from './../../Utils/infer';
import { Schema } from '../../../typings/types';
/**
 * Update store's value path.
 * @param {Array<string>} currentValuePath the valuePath the parent
 * @param {string} editKey the key currently edited
 * @returns {Array<string>}the updated valuePath
 */
function updatePath(currentPath: string[], editKey?: string): string[] {
  if (editKey !== undefined) {
    return currentPath.concat([editKey]);
  }
  return currentPath;
}
interface InferProps {
  path: string[];
  editKey?: string;
  value?: {};
  schema: Schema;
}
interface InferState {
  schema: Schema;
  path: string[];
  oldPath?: string[];
  oldEditKey?: string;
  oldValue?: {};
}
/**
 * Remove specified keys.
 */
type Omit<Type, Keys extends keyof Type> = Pick<
  Type,
  Exclude<keyof Type, Keys>
>;

/**
 * Make specified key optional. Others don't change.
 */
type PartialKey<Type, Keys extends keyof Type> = Omit<Type, Keys> &
  Partial<Pick<Type, Keys>>;

/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param Comp component to decorate.
 * @return the decorated component.
 */
function inference<P extends InferProps>(Comp: React.ComponentType<P>) {
  type PartialSchemaProps = PartialKey<P, 'schema'>;
  class Infer extends React.Component<PartialSchemaProps, InferState> {
    state: InferState = {
      path: [],
      schema: {},
    };
    static getDerivedStateFromProps(
      nextProps: PartialSchemaProps,
      curState: InferState,
    ): Partial<InferState> {
      let nextState: Partial<InferState> = {};
      if (
        curState.oldEditKey !== nextProps.editKey ||
        curState.oldPath !== nextProps.path
      ) {
        nextState.path = updatePath(nextProps.path, nextProps.editKey);
        nextState.oldPath = nextProps.path;
        nextState.oldEditKey = nextProps.editKey;
      }
      if (
        curState.schema !== nextProps.schema ||
        infer(nextProps.value) !== infer(curState.oldValue)
      ) {
        let inferredSchema = nextProps.schema || {};
        if (!('type' in inferredSchema)) {
          inferredSchema = {
            type: infer(nextProps.value),
            ...inferredSchema,
          };
        }
        nextState.schema = inferredSchema;
        // nextState.oldSchema = nextProps.schema;
      }
      return nextState;
    }

    render() {
      const { type } = this.state.schema;
      return (
        // @ts-ignore https://github.com/Microsoft/TypeScript/issues/28748
        <Comp
          // Recreate component on type change
          key={Array.isArray(type) ? undefined : type}
          {...this.props}
          path={this.state.path}
          schema={this.state.schema}
        />
      );
    }
  }
  return Infer;
}

export default inference;

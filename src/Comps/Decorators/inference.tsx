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
  schema?: Schema;
  [p: string]: any;
}
interface InferState {
  schema: Schema;
  path: string[];
  oldPath: string[] | null;
  oldEditKey: string | null;
  oldValue?: {};
}
/**
 * HOC, compute schema value from inferred type if schema is missing
 * @param Comp component to decorate.
 * @return the decorated component.
 */
function inference<P extends InferProps>(Comp: React.ComponentType<P>) {
  class Infer extends React.Component<InferProps, InferState> {
    state: InferState = {
      path: [],
      schema: {},
      oldPath: null,
      oldEditKey: null,
    };
    static getDerivedStateFromProps(
      nextProps: P,
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

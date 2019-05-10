import * as React from 'react';
import { Action, Schema } from '../../../typings/types';
import { FormConsumer } from '../../Store';

type Props = {
  schema: Schema;
  path: string[];
  value?: {};
  dispatch: (action: Action, ...args: {}[]) => any;
};
function visibility<P extends Props>(
  Comp: React.ComponentType<P>,
): React.FunctionComponent<P> {
  return function Visible(props: P) {
    const {
      schema: { visible },
      value,
    } = props;

    return (
      <FormConsumer>
        {({ value: formValue }) => {
          try {
            if (
              visible &&
              !visible(
                value,
                formValue,
                props.path.concat(), // Copy
              )
            ) {
              return null!;
            }
          } catch (e) {
            return null!;
          }
          return <Comp {...props} />;
        }}
      </FormConsumer>
    );
  };
}

export default visibility;

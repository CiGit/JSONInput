import * as React from 'react';

import { WidgetProps } from '../../../typings/types';

function Undefined(props: WidgetProps) {
  return (
    <div
    >{`Undefined field type "${props.schema.type!.toString()}", [${props.path.toString()}]`}</div>
  );
}

export default Undefined;

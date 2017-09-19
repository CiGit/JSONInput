import * as React from 'react';
import { WidgetProps } from '../../../typings/types';

function Hashmap(props: WidgetProps.ObjectProps) {
    return (
        <div>
            {React.Children.map(props.children, (child: any, index) => {
                return (
                    <div>
                        <input
                            value={child.props.editKey}
                            onChange={e =>
                                props.alterKey(
                                    child.props.editKey,
                                    e.target.value
                                )}
                        />
                        {child}
                    </div>
                );
            })}
            <button onClick={() => props.addKey('', '')}>+</button>
        </div>
    );
}

export default Hashmap;

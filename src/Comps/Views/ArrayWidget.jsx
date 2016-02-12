import React, { PropTypes } from 'react';
import labeled from '../Decorators/labeled.jsx';

function ArrayWidget(props) {
    function renderChild(child, index) {
        return (<div>
                  <span onClick={ props.onChildRemove(index) }>-</span>
                  { child }
                </div>);
    }

    const children = React.Children.map(props.children, renderChild);
    return (<div>
              <div>
                { children }
              </div>
              <span onClick={ props.onChildAdd }>+</span>
            </div>);
}

ArrayWidget.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
    onChildRemove: PropTypes.func.isRequired,
    onChildAdd: PropTypes.func.isRequired
};
export default labeled(ArrayWidget);

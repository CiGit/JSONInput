import React, { PropTypes } from 'react';

function labeled(Comp) {
    function label(props) {
        const required = props.schema.required;
        const requiredClassName = required ? 'required' : '';
        return (<div>
                  <label className={ `${props.schema.type}Field ${requiredClassName}` }>
                    <span className="title">{ props.schema.title }</span>
                    <Comp {...props} />
                    <span>{ props.schema.description }</span>
                    <span>{ props.errorMessage }</span>
                  </label>
                </div>);
    }

    label.propTypes = {
        schema: PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.string.isRequired,
            required: PropTypes.bool,
            description: PropTypes.string
        }),
        errorMessage: PropTypes.arrayOf(PropTypes.string)
    };
    return label;
}

export default labeled;

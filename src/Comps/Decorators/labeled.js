import React, { PropTypes } from 'react';

function labeled(Comp) {
    function label(props) {
        const required = props.schema.required;
        const requiredClassName = required ? 'required' : '';
        return (<div>
                  <label className={ `${props.schema.type}Field ${requiredClassName}` }>
                    <span className="title">{ props.view.title || props.editKey }</span>
                    <Comp {...props} />
                    <span>{ props.view.description }</span>
                    <span>{ props.errorMessage }</span>
                  </label>
                </div>);
    }

    label.propTypes = {
        schema: PropTypes.shape({
            type: PropTypes.oneOfType([
                PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean']),
                PropTypes.arrayOf(
                    PropTypes.oneOf(['object', 'string', 'number', 'array', 'boolean', 'null'])
                )
            ]).isRequired,
            required: PropTypes.bool,
            description: PropTypes.string
        }),
        editKey: PropTypes.any,
        view: PropTypes.object,
        errorMessage: PropTypes.arrayOf(PropTypes.string)
    };
    return label;
}

export default labeled;

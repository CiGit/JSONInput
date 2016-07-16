import React, { PropTypes } from 'react';

function SelectWidget({ view, value, onChange }) {
    const choices = view.choices.map(c => (
        <option
            key={c.value}
            value={c.value}
        >
            {c.label}
        </option>
    ));
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            {choices}
        </select>
    );
}
SelectWidget.propTypes = {
    view: PropTypes.shape({
        choices: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string.isRequired
        })).isRequired
    }),
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
};
export default SelectWidget;

import React from 'react';
import PropTypes from 'prop-types';

function SelectWidget(props) {
  const { view, value, onChange } = props;
  const choices = view.choices.map(c => (
    <option key={c.value} value={c.value}>
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
    choices: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  value: PropTypes.any, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};
export default SelectWidget;

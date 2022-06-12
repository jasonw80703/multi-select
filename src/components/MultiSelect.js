import React from 'react';
import './MultiSelect.css';
import PropTypes from 'prop-types';

const MultiSelect = ({
  multiple,
  selectTitle,
  values,
}) => {
  return (
    <div className='container'>
      <p>{selectTitle}</p>
      <select className='select-container' multiple={multiple}>
        {values.map(value => (
          <option key={value.toString()}>{value.toString()}</option>
        ))}
      </select>
    </div>
  )
};

MultiSelect.propTypes = {
  multiple: PropTypes.bool,
  selectTitle: PropTypes.string,
  values: PropTypes.array.isRequired,
};

MultiSelect.defaultProps = {
  multiple: false,
};

export default MultiSelect;

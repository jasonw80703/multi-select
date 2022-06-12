import React, { useState } from 'react';
import './MultiSelect.css';
import PropTypes from 'prop-types';

const selectedToString = (checkedData, fallback) => {
  const selectedArr = Object.entries(checkedData).filter((val) => val[1] === true);
  if (selectedArr.length === 0) return fallback;

  return selectedArr.map(selected => selected[0]).join(', ');
};

const MultiSelect = ({
  multiple,
  selectTitle,
  values,
}) => {
  const [showList, setShowList] = useState(false);
  const [checkedData, setCheckedData] = useState(
    values.reduce((agg, val) => {
      return {...agg, [val]: false };
    }, {})
  );

  const anchorValue = selectedToString(checkedData, selectTitle);

  const selectCheckbox = value => {
    setCheckedData({
      ...checkedData,
      [value]: !checkedData[value]
    });
  }

  return (
    <div className='container'>
      <span className='anchor' onClick={() => setShowList(!showList)}>
        {anchorValue}<span className='dropdown-icon'>▼</span>
      </span>
      {showList &&
        <ul className='options-list'>
          {
            values.map(value => (
              <li key={value.toString()}>
                <input type='checkbox' checked={checkedData[value]} onChange={() => selectCheckbox(value)} />
                {value.toString()}
              </li>
            ))
          }
        </ul>
      }
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

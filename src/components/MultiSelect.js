import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './MultiSelect.css';
import convertDataToString from '../helpers/convertDataToString';

const MultiSelect = ({
  label,
  multiple,
  title,
  values,
}) => {
  const [showList, setShowList] = useState(false);
  const defaultCheckedData = useMemo(() => values.reduce((agg, val) => {
    return {...agg, [val]: false };
  }, {}), [values]);
  const [checkedDataMap, setCheckedDataMap] = useState(defaultCheckedData);

  const anchorDisplayValue = convertDataToString(checkedDataMap, title);
  const dropdownIconClass = `dropdown-icon ${showList && 'flipped-icon'}`;
  const anySelected = Object.values(checkedDataMap).some(datum => datum === true);

  const selectCheckbox = value => {
    const restOfData = multiple ? checkedDataMap : defaultCheckedData;
    setCheckedDataMap({
      ...restOfData,
      [value]: !checkedDataMap[value],
    });
  }

  // Set all values to negation of `anySelected` state value, so that:
  // if any values were selected, then now all should be deselected
  // if no values were selected, then now all should be selected
  const selectOrDeselectAll = () => {
    setCheckedDataMap(values.reduce((agg, val) => {
      return {...agg, [val]: !anySelected };
    }, {}));
  }

  if (values.length === 0) {
    return (
      <div className='container'>
        <span className='dropdown'>
          {anchorDisplayValue}<span className={dropdownIconClass}>▼</span>
        </span>
        {/* <div className='label-container'>
          <span className='label-caption no-values-caption'>No values provided</span>
        </div> */}
      </div>
    )
  }

  return (
    <div className='container'>
      <span
        className={`dropdown ${!anchorDisplayValue && 'no-title'}`}
        onClick={() => setShowList(!showList)}
        data-testid='dropdown-anchor'
      >
        {anchorDisplayValue}<span className={dropdownIconClass}>▼</span>
      </span>
      {showList &&
        <ul className='options-list' data-testid='options-list'>
          {
            multiple &&
              <li className='batch-action' onClick={selectOrDeselectAll} data-testid='batch-action'>
                {anySelected ? 'Deselect All' : 'Select All'}
              </li>
          }
          {
            values.map(value => (
              <li
                className={
                  `single-action ${checkedDataMap[value]
                    && !multiple
                    && 'selected-datum'}`
                }
                key={value.toString()}
                onClick={() => selectCheckbox(value)}
              >
                {
                  multiple &&
                    <input type='checkbox' className='option-checkbox' checked={checkedDataMap[value]} onChange={() => selectCheckbox(value)} />
                }
                <span>{value.toString()}</span>
              </li>
            ))
          }
        </ul>
      }
      {label &&
        <div className='label-container'>
          <span className='label-caption'>{label}</span>
        </div>
      }
    </div>
  )
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  multiple: PropTypes.bool,
  title: PropTypes.string,
  values: PropTypes.array.isRequired,
};

MultiSelect.defaultProps = {
  multiple: false,
};

export default MultiSelect;

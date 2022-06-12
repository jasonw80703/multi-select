/* eslint-disable import/no-anonymous-default-export */
export default (checkedData, fallback) => {
  const selectedArr = Object.entries(checkedData).filter((val) => val[1] === true);
  if (selectedArr.length === 0) return fallback;

  return selectedArr.map(selected => selected[0]).join(', ');
};

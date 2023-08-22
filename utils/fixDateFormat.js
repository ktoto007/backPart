const fixDateFormat = (dateStr) => {
  const dateArr = dateStr.split(".").map((el) => Number(el));
  dateArr[1] = Number(dateArr[1]) - 1;
  const validDate = new Date(dateArr[2], dateArr[1], dateArr[0]);

  return validDate;
};

module.exports = fixDateFormat;

export const formatDate = (dateParam) => {
    return `${dateParam.getFullYear()}-${(dateParam.getMonth() + 1).toString().padStart(2, '0')}-${dateParam
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

export const toDate = (dateStr) => {
    return new Date(dateStr);
}
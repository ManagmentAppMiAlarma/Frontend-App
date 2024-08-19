import moment from "moment";

export const convertDateFormat = (dateString) => {
  const date = moment(dateString, "DD/MM/YYYY");
  return date.format("DD-MMM-YYYY");
};

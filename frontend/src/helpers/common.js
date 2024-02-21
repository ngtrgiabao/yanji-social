import moment from "moment";

export const formatTime = (time, format = "DD-MM-YYYY") => {
  return moment(time).format(format);
};
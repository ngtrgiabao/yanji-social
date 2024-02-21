import moment from "moment";

export const formatTime = (time, format = "YYYY-MM-DD") => {
  return moment(time).format(format);
};
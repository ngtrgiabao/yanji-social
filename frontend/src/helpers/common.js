import moment from "moment";

export const formatTime = (time, format = "DD/MM/YYYY HH:mm") => {
  return moment(time).format(format);
};

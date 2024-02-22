import moment from "moment";

export const formatTime = (time, format = "LLLL") => {
  return moment(time).format(format);
};
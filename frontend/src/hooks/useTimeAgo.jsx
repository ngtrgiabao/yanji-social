import moment from "moment";

export const useTimeAgo = (timestamp) => {
    // console.log(timestamp);
    if (!timestamp) return timestamp;

    const currentTime = moment();
    const prevTime = moment(timestamp);

    return prevTime.fromNow(currentTime) + " ago";
};

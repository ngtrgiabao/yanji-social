import notificationService from "../../services/notification.service";
import {
  getNotificationStart,
  getNotificationSuccess,
  getNotificationFailed,
  newNotificationStart,
  newNotificationSuccess,
  newNotificationFailed,
  markSeenNotificationStart,
  markSeenNotificationSuccess,
  markSeenNotificationFailed,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailed,
} from "../notificationSlice";

export const getAllNotificationsByUser = async (userID, dispatch) => {
  dispatch(getNotificationStart());

  try {
    const res = await notificationService.getAllNotisByUser(userID);
    dispatch(getNotificationSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getNotificationFailed());
  }
};

export const getNotificationByID = async (notificationID, dispatch) => {
  dispatch(getNotificationStart());

  try {
    const res = await notificationService.getNotiByID(notificationID);
    dispatch(getNotificationSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getNotificationFailed());
  }
};

export const pushNewNotification = async (notication, dispatch) => {
  dispatch(newNotificationStart());

  try {
    const res = await notificationService.newNotification(notication);
    dispatch(newNotificationSuccess(res.data.data));
    return res.data;
  } catch (error) {
    dispatch(newNotificationFailed());
  }
};

export const markSeenNotification = async (updateNotification, dispatch) => {
  dispatch(markSeenNotificationStart());

  try {
    const res = await notificationService.markSeen(updateNotification);
    dispatch(markSeenNotificationSuccess(res.data));
  } catch (error) {
    dispatch(markSeenNotificationFailed());
  }
};

export const deleteNotification = async (notificationID, dispatch) => {
  dispatch(deleteNotificationStart());

  try {
    const res = await notificationService.deleteNoti(notificationID);
    dispatch(deleteNotificationSuccess(res.data));
  } catch (error) {
    dispatch(deleteNotificationFailed());
  }
};

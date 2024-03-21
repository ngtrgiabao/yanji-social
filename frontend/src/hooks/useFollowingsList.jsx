import { useCallback } from "react";
import { getUserByID } from "../redux/request/userRequest";

const useFollowingsList = ({ currentUserID, dispatch, setUser }) => {
  const addUserIfNotExists = (user) => {
    setUser((prevUser) => {
      const userExists = prevUser.some((prevUser) => prevUser._id === user._id);
      if (!userExists) {
        return [...prevUser, user];
      }
      return prevUser;
    });
  };

  const fetchFollowingUsers = (followingList) => {
    let index = 0;
    const fetchNextUserData = () => {
      if (index >= followingList.length) return;

      const userID = followingList[index];

      getUserByID(userID, dispatch)
        .then((data) => {
          addUserIfNotExists(data.user);
          index++;
          fetchNextUserData();
        })
        .catch((err) => {
          console.error("[USE_FOLLOWING_LIST]", err);
          index++;
          fetchNextUserData();
        });
    };

    fetchNextUserData();
  };

  const fetchFollowingList = useCallback(() => {
    getUserByID(currentUserID, dispatch)
      .then((data) => {
        fetchFollowingUsers(data?.user?.followings);
      })
      .catch((err) => {
        console.error("[USE_FOLLOWING_LIST]", err);
      });
  }, [currentUserID, dispatch]);

  return { fetchFollowingList };
};

export default useFollowingsList;

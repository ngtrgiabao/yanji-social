import { useCallback } from "react";
import { getUserByID } from "../redux/request/userRequest";

const useFollowersList = ({ currentUserID, dispatch, setUser }) => {
  const addUserIfNotExists = (user) => {
    setUser((prevUser) => {
      const userExists = prevUser.some((prevUser) => prevUser._id === user._id);
      if (!userExists) {
        return [...prevUser, user];
      }
      return prevUser;
    });
  };

  const fetchFollowerUsers = (followerList) => {
    let index = 0;
    const fetchNextUserData = () => {
      if (index >= followerList.length) return;

      const userID = followerList[index];

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

  const fetchFollowerList = useCallback(() => {
    getUserByID(currentUserID, dispatch)
      .then((data) => {
        fetchFollowerUsers(data?.user?.followers);
      })
      .catch((err) => {
        console.error("[USE_FOLLOWING_LIST]", err);
      });
  }, [currentUserID, dispatch]);

  return { fetchFollowerList };
};

export default useFollowersList;

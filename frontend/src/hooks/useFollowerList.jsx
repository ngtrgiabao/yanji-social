import { useCallback } from "react";
import { getUserByID } from "../redux/request/userRequest";

const useFollowerList = ({ currentUserID, dispatch, setFollowers }) => {
  const addUserIfNotExists = (user) => {
    setFollowers((prevUser) => {
      const userExists = prevUser.some(
        (prevUser) => prevUser._id === user?._id,
      );
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
          console.error("[USE_FOLLOWER_LIST]", err);
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
        console.error("[USE_FOLLOWER_LIST]", err);
      });
  }, [currentUserID, dispatch]);

  return { fetchFollowerList };
};

export default useFollowerList;

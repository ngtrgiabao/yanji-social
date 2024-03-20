import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, TermLinks } from "../../../components";
import { getUserByID } from '../../../redux/request/userRequest';
import { useCurrentUser } from '../../../hooks';
import { Link } from 'react-router-dom';

const HomeRight = () => {
  const [user, setUser] = useState([]);
  const currentUser = useCurrentUser();
  const dispatch = useDispatch()

  const fetchFollowingList = useCallback(() => {
    getUserByID(currentUser._id, dispatch)
      .then((data) => {
        fetchFollowingUsers(data?.user?.followings);
      })
      .catch((err) => {
        console.error("Failed to get following list", err);
      });
  }, [currentUser._id, dispatch]);

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
          console.error("[GET_USER_INFO_HOME_RIGHT]", err);
          index++;
          fetchNextUserData();
        });
    };

    fetchNextUserData();
  };

  const addUserIfNotExists = (user) => {
    setUser((prevUser) => {
      const userExists = prevUser.some((u) => u._id === user._id);
      if (!userExists) {
        return [...prevUser, user];
      }
      return prevUser;
    });
  };

  useEffect(() => {
    fetchFollowingList();
  }, [fetchFollowingList]);


  return (
    <div className='row'>
      <div className='col'>
        <div>
          <h4>Following</h4>
          <hr className='m-0 my-4' />
          <ul className='p-3 row'>
            {
              user.map((user) => (
                <li key={user._id} className='hover-bg'>
                  <Link
                    to={`/user/${user?._id}`}
                    className="d-flex align-items-center fs-5 text-white my-2 w-full p-2 px-3 rounded-3 border border-1"
                    key={user?._id}
                  >
                    <div className="profile-pic d-flex justify-content-center align-items-center me-3">
                      <Avatar imageSrc={user?.profilePicture} label={user?.username} />
                    </div>
                    <span style={{
                      color: 'var(--color-primary)'
                    }}>
                      {user?.username}
                    </span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='row'>
          <TermLinks />
        </div>
      </div>
    </div>
  )
}

export default HomeRight
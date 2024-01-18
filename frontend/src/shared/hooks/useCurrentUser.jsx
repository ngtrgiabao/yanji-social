import { useSelector } from "react-redux";

const useCurrentUser = () => {
  return useSelector((state) => {
    return state.auth.login.currentUser?.data;
  });
};

export default useCurrentUser;

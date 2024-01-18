import { useSelector } from "react-redux";

const useCurrentRoom = () => {
  return useSelector((state) => {
    return state.room.room?.currentRoom;
  });
};

export default useCurrentRoom;

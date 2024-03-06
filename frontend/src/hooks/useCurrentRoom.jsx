import { useSelector } from "react-redux";

const useCurrentRoom = () => {
  return useSelector((state) => {
    console.log(state.room)
    return state.room.room?.currentRoom;
  });
};

export default useCurrentRoom;

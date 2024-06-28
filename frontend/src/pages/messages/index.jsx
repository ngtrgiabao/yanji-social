import Messages from "../../components/business/messages";

export default function MessagePage({ socket }) {
  return <Messages socket={socket} />;
}

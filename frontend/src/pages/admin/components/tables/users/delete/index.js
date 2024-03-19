import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../../../redux/request/userRequest";

const DeleteModal = ({ onHide, show, className, userId, onDeleteSubmit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteUser(userId, dispatch)
      .then((res) => {
        onHide();
        toast.success("Deleted successfully");
        onDeleteSubmit();
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.log("Internal Error", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="md" centered className={className}>
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
          Delete user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fs-4">Are you sure you want to delete this user?</span>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="danger"
          className="fs-5 rounded rounded-2"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          className="fs-5 rounded rounded-2"
          onClick={onHide}
          variant="outline"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

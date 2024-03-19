import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ onHide, show, className, postId, onDeleteSubmit }) => {
  return (
    <Modal show={show} onHide={onHide} size="md" centered className={className}>
      <Modal.Header closeButton className="border-0">
        <Modal.Title id="contained-modal-title-vcenter" className="fs-2">
          Delete post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="fs-4">Are you sure you want to delete this post?</span>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="danger"
          className="fs-5 rounded rounded-2"
          onClick={() => onDeleteSubmit(postId)}
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

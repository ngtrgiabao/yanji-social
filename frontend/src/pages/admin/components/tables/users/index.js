import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Badge,
  Pagination,
  Fade,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { PenLine, Trash, StepForward, StepBack } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Global from "../../../../../constant/global";
import UpsertModal from "./upsert";
import LoadingPage from "../../../../../components/common/loading/loading-page";
import { updateUser } from "../../../../../redux/request/userRequest";
import { ToastProvider } from "../../../../../context/toast";
import DeleteModal from "./delete";
import { useTimeAgo } from "../../../../../hooks";

const UsersTable = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [openUpsert, setOpenUpsert] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const formatTime = useTimeAgo;

  async function fetchUsers(filter) {
    const url = filter
      ? `${
          Global.SOCKET_URL
        }/api/v1/user/all-users/?username=${filter.toLowerCase()}`
      : `${Global.SOCKET_URL}/api/v1/user/all-users?limit=14&skip=${page * 14}`;

    const data = await axios.get(url);
    const userList = data.data?.users;

    if (userList.length > 0) {
      setUsers(userList);
      setIsEmpty(false);
    } else {
      setUsers([]);
      setIsEmpty(true);
    }
  }

  function onUpsert(userId) {
    setOpenUpsert(true);
    setUserId(userId);
  }

  function onDelete(userId) {
    setOpenDelete(true);
    setUserId(userId);
  }

  function onUpsertSubmit(data) {
    updateUser(data, dispatch)
      .then((res) => {
        toast.success("Updated successfully");
        fetchUsers(filter);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error("Internal Error", error);
      });
  }

  function onDeleteSubmit() {
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers(filter);
  }, [page, filter]);

  return (
    <div className="px-3">
      <Container className="mt-4 mb-3">
        <Row>
          <Col className="m-0">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="fs-4"
                aria-label="Search"
                onChange={(e) => setFilter(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
      </Container>

      {users.length > 0 ? (
        <>
          <Table
            bordered
            size="md"
            style={{
              color: "var(--text-color)",
            }}
          >
            <thead>
              <tr className="fs-4">
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Followers</th>
                <th>Followings</th>
                <th>Verify</th>
                <th>Verify Email</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user?._id}
                  className="fs-5"
                  style={{
                    background: `${
                      idx % 2 === 0 ? "" : "var(--color-bg-hover)"
                    }`,
                  }}
                >
                  <td>{user?._id}</td>
                  <td>
                    <Link to={`/user/${user?._id}`} className="text-primary">
                      {user?.username}
                    </Link>
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.followers.length}</td>
                  <td>{user?.followings.length}</td>
                  <td>
                    {user?.isVerify ? (
                      <Badge pill bg="success">
                        verified
                      </Badge>
                    ) : (
                      <Badge pill bg="danger">
                        Not verified
                      </Badge>
                    )}
                  </td>
                  <td>
                    {user.isVerifyEmail ? (
                      <Badge pill bg="success">
                        verified
                      </Badge>
                    ) : (
                      <Badge pill bg="danger">
                        Not verified
                      </Badge>
                    )}
                  </td>
                  <td>{formatTime(user.createdAt)}</td>
                  <td>{formatTime(user.updatedAt)}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Button
                      variant="outline-primary"
                      onClick={() => onUpsert(user?._id)}
                      className="rounded rounded-2 me-3 d-flex align-items-center"
                    >
                      <PenLine size={16} className="me-2" />
                      Edit
                    </Button>
                    <Button
                      className="rounded rounded-2"
                      variant="danger"
                      onClick={() => onDelete(user?._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}

              <Pagination size="lg" className="mt-3">
                <Pagination.Item
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                  disabled={page === 0}
                >
                  <StepBack size={15} />
                </Pagination.Item>
                <Pagination.Item
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                  disabled={isEmpty || users.length < 14}
                >
                  <StepForward size={15} />
                </Pagination.Item>
              </Pagination>
            </tbody>

            {userId && (
              <Fade in={openUpsert}>
                <UpsertModal
                  show={openUpsert}
                  userId={userId}
                  onUpsertSubmit={onUpsertSubmit}
                  onHide={() => setOpenUpsert(false)}
                  className="text-black"
                />
              </Fade>
            )}
            {userId && (
              <Fade in={openDelete}>
                <DeleteModal
                  show={openDelete}
                  userId={userId}
                  onDeleteSubmit={onDeleteSubmit}
                  onHide={() => setOpenDelete(false)}
                  className="text-black"
                />
              </Fade>
            )}
          </Table>
        </>
      ) : isEmpty ? (
        <div>No users found</div>
      ) : (
        <LoadingPage />
      )}

      <ToastProvider />
    </div>
  );
};

export default UsersTable;

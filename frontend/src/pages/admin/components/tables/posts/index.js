import { useEffect, useState } from 'react';
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
  Form
} from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  PenLine,
  Trash,
  StepForward,
  StepBack,
} from "lucide-react"

import Global from '../../../../../helpers/constants/global';
import { formatTime } from '../../../../../helpers/common';
import UpsertModal from './upsert';
import LoadingPage from '../../../../loading/LoadingPage';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const PostsTable = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState("")
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");

  async function fetchUsers(filter) {
    const url = filter
      ? `${Global.SOCKET_URL}/api/v1/user/all-users/?username=${filter.toLowerCase()}`
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
    setOpen(true)
    setUserId(userId)

    // console.log(user)
  }

  useEffect(() => {
    fetchUsers(filter)
  }, [page, filter])

  return (
    <>
      <Container className="mt-4 mb-3">
        <Row>
          <Col>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 fs-4"
                aria-label="Search"
                onChange={e => setFilter(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
      </Container>

      {
        users.length > 0 ? (
          <>
            <Table
              bordered
              size='md'
              style={{
                color: "var(--text-color)",
              }}
            >
              <thead>
                <tr className='fs-4'>
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
                {
                  users.map((user, idx) => (
                    <tr key={user._id} className='fs-5'>
                      <td>{user._id}</td>
                      <td>
                        <Link to={`/user/${user._id}`} className='text-primary'>
                          {user.username}
                        </Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.followers.length}</td>
                      <td>{user.followings.length}</td>
                      <td>
                        {user.isVerify ?
                          <Badge pill bg="success">
                            verified
                          </Badge>
                          :
                          <Badge pill bg="danger">
                            Not verified
                          </Badge>
                        }
                      </td>
                      <td>{user.isVerifyEmail ?
                        <Badge pill bg="success">
                          verified
                        </Badge>
                        :
                        <Badge pill bg="danger">
                          Not verified
                        </Badge>
                      }</td>
                      <td>{formatTime(user.createdAt)}</td>
                      <td>{formatTime(user.updatedAt)}</td>
                      <td className='d-flex justify-content-center align-items-center'>
                        <Button
                          variant="outline-primary"
                          onClick={() => onUpsert(user._id)}
                          className='rounded rounded-2 me-3 d-flex align-items-center'
                        >
                          <PenLine size={16} className='me-2' />
                          Edit
                        </Button>
                        <Button className='rounded rounded-2' variant="outline-danger">
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))
                }

                <Pagination size="lg" className='mt-3'>
                  <Pagination.Item onClick={() => setPage((prevPage) => prevPage - 1)} disabled={page === 0}>
                    <StepBack size={15} />
                  </Pagination.Item>
                  <Pagination.Item onClick={() => setPage((prevPage) => prevPage + 1)} disabled={isEmpty || users.length < 14}>
                    <StepForward size={15} />
                  </Pagination.Item>
                </Pagination>
              </tbody>

              {
                userId &&
                <Fade in={open}>
                  <UpsertModal
                    show={open}
                    userId={userId}
                    onHide={() => setOpen(false)}
                    className="text-black"
                  />
                </Fade>
              }
            </Table >
          </>
        ) : (
          isEmpty ? <div>No users found</div> : <LoadingPage />
        )
      }
    </>
  )
}

export default PostsTable
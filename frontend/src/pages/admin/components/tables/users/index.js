import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import {
  PenLine,
  Trash
} from "lucide-react"

import Global from '../../../../../helpers/constants/global';
import { formatTime } from '../../../../../helpers/common';
import UpsertModal from './upsert';

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState("aa")
  const [open, setOpen] = useState(false);

  async function fetchUsers() {
    const data = await axios.get(
      Global.SOCKET_URL +
      `/api/v1/user/all-users`,
    );

    const userList = data.data?.users;

    if (userList.length > 0) {
      setUsers(userList);
      console.log(userList);
    } else {
      setUsers([]);
    }
  }

  function onUpsert(userId) {
    setOpen(true)
    setUserId(userId)

    // console.log(user)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Table
      striped
      bordered
      hover
      size='md'
      variant='dark'
      className='mb-0'
      style={{
        backgroundColor: "var(--color-white)",
      }}
    >
      <thead>
        <tr className='fs-3'>
          <th>#</th>
          <th>Username</th>
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
            <>
              <tr>
                <td>{idx + 1}</td>
                <td>{user.username}</td>
                <td>{user.followers.length}</td>
                <td>{user.followings.length}</td>
                <td>{user.isVerify ? "Yes" : "No"}</td>
                <td>{user.isVerifyEmail ? "Yes" : "No"}</td>
                <td>{formatTime(user.createdAt)}</td>
                <td>{formatTime(user.updatedAt)}</td>
                <td className='d-flex justify-content-center align-items-center'>
                  <Button
                    variant="primary"
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

            </>
          ))
        }
      </tbody>

      <UpsertModal
        show={open}
        userId={"hello"}
        onHide={() => setOpen(false)}
        className="text-black"
      />
    </Table>
  )
}

export default UsersTable
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Global from '../../helpers/constants/global';
import { useCurrentUser } from '../../hooks';
import Navigation from './components/navigation';
import UsersTable from './components/tables/users';
import PostsTable from './components/tables/posts';

const Admin = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState("users");

  useEffect(() => {
    if (currentUser._id !== Global.ADMIN_ID) {
      return navigate("/")
    }
  }, [currentUser])

  function onQuery(e) {
    setQuery(e);
  }

  return (
    <div>
      <Navigation onQuery={onQuery} />

      <Container className='h-100' fluid>
        <Row className="fs-4">
          {
            query === "users" ? <UsersTable /> : <PostsTable />
          }
        </Row>
      </Container>
    </div>
  )
}

export default Admin
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Global from "../../constant/global";
import { useCurrentUser } from "../../hooks";
import Navigation from "./components/navigation";
import UsersTable from "./components/tables/users";
import PostsTable from "./components/tables/posts";
import { RouteNames } from "../../constant/routes";

const Admin = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState("users");

  useEffect(() => {
    if (currentUser._id !== Global.ADMIN_ID) {
      return navigate(RouteNames.HOME);
    }
  }, [currentUser]);

  function onQuery(e) {
    setQuery(e);
  }

  return (
    <div>
      <Navigation onQuery={onQuery} />

      <Container className="h-100" fluid>
        <Row className="fs-4">
          {query === "users" ? <UsersTable /> : <PostsTable />}
        </Row>
      </Container>
    </div>
  );
};

export default Admin;

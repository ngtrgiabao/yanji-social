import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { LOGO_YANJI_SOCIAL } from "../../../../assets";
import { RouteNames } from "../../../../constant/routes";

const Navigation = ({ onQuery }) => {
  const [radioValue, setRadioValue] = useState("users");

  const radios = [
    { name: "Users", value: "users" },
    { name: "Posts", value: "posts" },
  ];

  return (
    <Navbar variant="dark" className="header-navbar">
      <Container>
        <Row className="w-100 d-flex align-items-center">
          <Col>
            <Navbar.Brand
              href={RouteNames.HOME}
              className="logo mb-0 d-flex align-items-center w-100 fs-2"
            >
              <img
                src={LOGO_YANJI_SOCIAL}
                alt=""
                className="profile-pic me-3 border border-2 border-white"
              />
              <span>Yanji Social</span>
            </Navbar.Brand>
          </Col>
          <Col>
            <Nav className="d-flex justify-content-end text-uppercase">
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={
                      radioValue === radio.value
                        ? "outline-primary border border-white"
                        : ""
                    }
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    className="text-white rounded rounded-2 fs-5"
                    onChange={(e) => {
                      onQuery(e.currentTarget.value);
                      setRadioValue(e.currentTarget.value);
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Navigation;

import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

export const NavBar = () => (
  <Navbar>
    <h1 className="display-4">The API Guy.</h1>
    <Nav className="ml-auto justify-content-end">
      <Nav.Link>What is an API?</Nav.Link>
      <Nav.Link>How to use it?</Nav.Link>
    </Nav>
  </Navbar>
);

export const APIListItem = ({ API }) => {
  const lower = str => str.replace(/^\w/, c => c.toLowerCase());

  const TrueFalse = text => (
    <pre
      className={`d-inline-block align-middle text-${
        text === "true" ? "success" : "danger"
      }`}
    >
      &#60;{text === "true" ? "supported" : "not-supported"}&#62;
    </pre>
  );
  const Cors = text => (
    <pre
      className={`d-inline-block align-middle text-${
        text === "no" ? "danger" : text === "unknown" ? "warning" : "success"
      }`}
    >
      &#60;{lower(text)}&#62;
    </pre>
  );

  return (
    <li
      style={{ minWidth: 275, width: "auto", maxWidth: 375 }}
      className="list-inline-item align-top mr-5 mb-5"
    >
      <h1>{API.API}</h1>
      <p className="text-secondary">
        #{API.Category.replace(/ /g, "").toLowerCase()}
      </p>
      <ul style={{ listStylePosition: "inside" }} className="mt-3">
        <li>
          <span className="align-middle mr-2">Auth:</span>
          <pre className="d-inline-block align-middle text-info">
            &#60;{API.Auth.length < 1 ? "none" : lower(API.Auth)}&#62;
          </pre>
        </li>
        <li>
          <span className="align-middle mr-2">HTTPS:</span>
          {TrueFalse(JSON.stringify(API.HTTPS))}
        </li>
        <li>
          <span className="align-middle mr-2">Cors:</span>
          {Cors(API.Cors)}
        </li>
      </ul>
      <p className="my-2">{API.Description}</p>
      <Button
        variant="link"
        href={API.Link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary"
      >
        Read Docs
      </Button>
    </li>
  );
};

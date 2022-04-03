import React, { useRef, useState } from "react";
import "./SignUp.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../utils/context";
import { Link, useNavigate } from "react-router-dom";

const courses = [
  {
    program: "Computer Science",
  },
];

function SignUp() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(`Failed to create an account. Error is ${e}`);
    }

    setLoading(false);
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            style={{
              width: "25em",
              marginTop: "10em",
              border: "0.5px solid gray",
            }}
            ref={emailRef}
          />
        </Form.Group>
        <Form.Group id="password">
          <Form.Control
            required
            type="password"
            placeholder="Password"
            ref={passwordRef}
            style={{
              width: "25em",
              border: "0.5px solid gray",
              marginTop: "1.3em",
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group id="password-confirm">
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            ref={passwordConfirmRef}
            style={{
              width: "25em",
              border: "0.5px solid gray",
              marginTop: "1.3em",
            }}
          ></Form.Control>
        </Form.Group>
        <Button disabled={loading} className="signup-button" type="submit">
          Sign Up
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default SignUp;

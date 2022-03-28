import React, { useRef, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import "./SignUp.css";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Card, Alert } from "react-bootstrap";
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
      navigate.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email">
          <TextField
            required
            id="standard-disabled"
            label="Email"
            defaultValue=""
            variant="standard"
            sx={{ width: "25em" }}
            ref={emailRef}
          />
        </Form.Group>
        <Form.Group id="password">
          <TextField
            required
            id="standard-password-input"
            label="Password"
            type="password"
            defaultValue=""
            variant="standard"
            sx={{ width: "25em", marginTop: "1.3em" }}
            ref={passwordRef}
          />
        </Form.Group>
        <Form.Group id="password-confirm">
          <TextField
            required
            id="standard-password-input"
            label="Password Confirmation"
            type="password"
            defaultValue=""
            variant="standard"
            sx={{ width: "25em", marginTop: "1.3em" }}
            ref={passwordConfirmRef}
          />
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

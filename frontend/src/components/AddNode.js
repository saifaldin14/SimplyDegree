import React, { useState, useContext } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { CourseContext } from "../utils/context";
import { setDoc, doc } from "firebase/firestore";
import { Alert } from "react-bootstrap";
import axios from "axios";

const { db } = require("../utils/firebaseConfig");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AddNode() {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [error, setError] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const { nodes, setNodes, handleClose } = useContext(CourseContext);

  async function addCourse(e) {
    console.log(courseName, " ", courseCode);
    try {
      await axios.get(
        `https://simply-degree.herokuapp.com/courses/${courseCode}`
      );
      if (nodes.some((el) => el.id === courseCode)) {
        setError("Duplicate Course");
      } else {
        setNodes((e) =>
          e.concat({
            id: courseCode,
            data: { label: `${courseCode}` },
            sourcePosition: "right",
            targetPosition: "left",
            position: {
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            },
          })
        );
        e.preventDefault();

        await setDoc(doc(db, "courses", courseCode), {
          course_name: courseName,
          course_code: courseCode,
          course_desc: courseDescription,
        });
        handleClose();
      }
    } catch (e) {
      setError("Please enter a valid WLU course");
    }
  }
  return (
    <Card sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add a Course
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2rem",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {error && (
          <Alert variant="danger" style={{ color: "red" }}>
            {error}
          </Alert>
        )}
        <TextField
          id="outlined-basic"
          label="Course Name [required]"
          variant="outlined"
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Code [required]"
          variant="outlined"
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Description [optional]"
          variant="outlined"
          onChange={(e) => setCourseDescription(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" endIcon={<SendIcon />} onClick={addCourse}>
          Add
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
}

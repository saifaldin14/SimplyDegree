import React, { useState } from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { updateDoc, doc } from "firebase/firestore";

const { db } = require("../utils/firebaseConfig");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditNode({ node }) {
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  async function editCourse(e) {
    console.log(courseName, " ", courseCode);
    e.preventDefault();
    await updateDoc(doc(db, "courses", node.data.label), {
      course_name: courseName,
      course_code: courseCode,
      course_desc: courseDescription,
    });
  }
  return (
    <Card sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Course {node.data.label}
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
        <TextField
          id="outlined-basic"
          label="Course Name"
          variant="outlined"
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Code"
          variant="outlined"
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Course Description"
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
        <Button variant="contained" endIcon={<SendIcon />} onClick={editCourse}>
          Edit
        </Button>
        {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
          Cancel
        </Button> */}
      </div>
    </Card>
  );
}

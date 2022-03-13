import * as React from "react";
import { Card, Typography, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

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

export default function AddNode() {
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
        <TextField
          id="outlined-basic"
          label="Course Name [required]"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Course Code [required]"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Course Description [optional]"
          variant="outlined"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" endIcon={<SendIcon />}>
          Add
        </Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Cancel
        </Button>
      </div>
    </Card>
  );
}

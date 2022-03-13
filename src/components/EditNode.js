import * as React from "react";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";

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
  return (
    <Card sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Edit Course
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {node.data.label}
      </Typography>
    </Card>
  );
}

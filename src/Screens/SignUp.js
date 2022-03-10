
import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './SignUp.css'

const courses = [
    {
        program: "Computer Science"
    }
]

function SignUp() {
    let navigate = useNavigate();
    return (
        <>
        <TextField
          required
          id="standard-disabled"
          label="Email"
          defaultValue=""
          variant="standard"
          sx={{width: '25em', marginTop: '10em'}}
        />
        <TextField
          required
          id="standard-disabled"
          label="Password"
          type="Password"
          defaultValue=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.4em'}}
        />
        <TextField
          required
          id="standard-disabled"
          type="Password"
          label="Confirm Password"
          defaultValue=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.4em'}}
        />
        <TextField
          required
          id="standard-disabled"
          select
          label="Select your Program"
          defaultValue=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.4em'}}
        >
            {courses.map((option) => (
                <MenuItem key={option.program} value={option.program}>
                    {option.program}
                </MenuItem>
            ))}
        </TextField>
        <div className="signup-button" onClick={() => navigate("/")}>
          <h1>Create Account</h1>
        </div>
        </>
    );
}

export default SignUp;
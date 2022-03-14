
import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import { useForm, Controller } from "react-hook-form";

const courses = [
    {
        program: "Computer Science"
    }
]

function SignUp() {
    let navigate = useNavigate();
    const {handleSubmit, control} = useForm();
    const onSubmit = data => {
      console.log(data);
      navigate("/");
    }
    return (
        <>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              required
              id="standard"
              label="Email"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              variant="standard"
              sx={{width: '25em', marginTop: '10em'}}
            />
          )}
          rules ={{required: 'Email required'}}

        />
        
        <TextField
          required
          id="standard"
          label="Password"
          type="Password"
          value=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.4em'}}
        />
        <TextField
          required
          id="standard"
          type="confirmPassword"
          label="Confirm Password"
          value=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.4em'}}
        />

        <Controller
          name="program"
          control={control}
          defaultValue=""
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              required
              id="standard"
              select
              label="Select your Program"
              variant="standard"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              sx={{width: '25em', marginTop: '1.4em'}}
            >
                {courses.map((option) => (
                    <MenuItem key={option.program} value={option.program}>
                        {option.program}
                    </MenuItem>
                ))}    
            </TextField>
          )}
          rules ={{required: 'Program required'}}
        />
        <div className="signup-button" onClick={handleSubmit(onSubmit)}>
          <h1>Create Account</h1>
        </div>
        </>
    );
}

export default SignUp;
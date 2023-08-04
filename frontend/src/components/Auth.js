import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignup, setisSignup] = useState(true);
    const [inputs, setinputs] = useState({
        name:"",email:"",password:""
    });
    const handleChange = (e) =>{
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    const sendRequest = async(type='') => {
        console.log("Before");
        const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
            name: inputs.name,
            email: inputs.email,
            password: inputs.password
        }).catch(err=> console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            sendRequest('signup')
            .then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate('/blogs'));
        }
        else{
            sendRequest('login')
            .then((data)=>localStorage.setItem("userId",data.user._id))
            .then(()=>dispatch(authActions.login()))
            .then(()=>navigate('/blogs'));
        }
    };
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <Box 
            maxWidth={400}
            display="flex" 
            flexDirection="column"
            alignItems="center" 
            justifyContent="center" 
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={5}
            borderRadius={5}
            >
                <Typography padding={3} textAlign="center" variant='h4'>{isSignup?"SignUp":"LogIn"}</Typography>

                {isSignup && <TextField name="name" margin="normal" value={inputs.name} placeholder='Name' onChange={handleChange}/>}
                <TextField name="email" margin="normal" value={inputs.email} placeholder='Email' type={'email'} onChange={handleChange}/>
                <TextField name="password" margin="normal" value={inputs.password} placeholder='Password' type={'password'} onChange={handleChange}/>

                <Button sx={{marginTop:3,borderRadius: 3}} variant='contained' color='warning' type='submit'>Submit</Button>
                <Button sx={{marginTop:2,borderRadius: 3}} variant='contained'  LinkComponent={Link} to="/auth" onClick={(e)=>setisSignup(!isSignup)}>
                    {isSignup?"Already have an account? LogIn":"Don't have an account? SignUp"}
                </Button>
            </Box>
        </form>
    </div>
  )
}

export default Auth
import React,{useState} from 'react'
import {AppBar, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Box } from '@mui/system'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store';
import { useStyles } from './utils';

const Header = () => {
    const dispatch = useDispatch();
    const [value, setvalue] = useState(0);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const classes = useStyles();
  return (
    <AppBar sx={{background:'black'}} position="sticky">
        <Toolbar>
            <Typography className={classes.font} variant='h5'>
                BlogIn
            </Typography>
        
            { isLoggedIn && <Box display='flex' marginLeft='auto' marginRight='auto'>
                <Tabs textColor='inherit' value={value} onChange={(e,val)=> setvalue(val)}>
                    <Tab className={classes.font} LinkComponent={Link} to="/blogs" label="All Blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
                    <Tab className={classes.font} LinkComponent={Link} to="/blogs/add" label="Add Blog"/>
                </Tabs>
            </Box>}

            <Box display="flex" marginLeft="auto">
                {!isLoggedIn && <Button sx={{margin:1,borderRadius: 10}} variant='contained' color='success' LinkComponent={Link} to="/auth">Login</Button>}
                {/* {!isLoggedIn && <Button sx={{margin:1,borderRadius: 10}} variant='contained' color='success' LinkComponent={Link} to="/auth">SignUp</Button>} */}
                {isLoggedIn && <Button sx={{margin:1,borderRadius: 10}} variant='contained' color='success' LinkComponent={Link} to="/auth" onClick={()=>dispatch(authActions.logout())}>LogOut</Button>}
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header
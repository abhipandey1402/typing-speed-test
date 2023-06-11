import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const SignupForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Box p={3} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <TextField
                variant='outlined'
                type='email'
                label='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                variant='outlined'
                type='password'
                label='Enter Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
                variant='contained'
                size='large'
            >Signup</Button>
        </Box>
    )
}

export default SignupForm



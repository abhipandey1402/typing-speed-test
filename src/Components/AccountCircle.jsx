import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../Context/ThemeContext'
import GoogleButton from 'react-google-button'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping'
import { auth } from '../firebaseConfig';

const AccountCircle = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const { theme } = useTheme();

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleValueChange = (e, v) => {
        setValue(v)
    }

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleAuthentication = () => {
        signInWithPopup(auth, googleProvider).then((res) => {
            toast.success('Google login Successful', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error(errorMapping[err.code] || 'not able to use google authentication', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    return (
        <div>
            <AccountCircleIcon onClick={handleModalOpen} />

            <Modal
                open={open}
                onClose={handleClose}
                style={
                    {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }
            >
                <div style={{ width: '400px', textAlign: 'center' }}>
                    <AppBar position='static' style={{ background: 'transparent' }}>
                        <Tabs
                            value={value}
                            onChange={handleValueChange}
                            variant='fullWidth'>
                            <Tab label='login' style={{ color: theme.textColor }}></Tab>
                            <Tab label='singup' style={{ color: theme.textColor }}></Tab>
                        </Tabs>
                    </AppBar>
                    {value === 0 && <LoginForm />}
                    {value === 1 && <SignupForm />}
                    <Box>
                        <span>OR</span>
                        <GoogleButton
                            style={{ width: '100%', marginTop: '11px' }}
                            onClick={handleGoogleAuthentication}
                        />
                    </Box>
                </div>
            </Modal>
        </div>
    )
}

export default AccountCircle




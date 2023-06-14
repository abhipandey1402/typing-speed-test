import React from 'react'
import AccountCircle from './AccountCircle'
import logo from '../Assets/logo.png'

const Header = () => {
    return (

        <div className='header'>
            <div className='logo'>
                <a href='https://typing-speed-test-june.netlify.app/'><img src={logo} style={{ width: '60px' }} /></a>
            </div>
            <div className='userIcon'>
                <AccountCircle />
            </div>
        </div>
    )
}

export default Header

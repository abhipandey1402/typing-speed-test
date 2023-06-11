import React from 'react'
import AccountCircle from './AccountCircle'

const Header = () => {
    return (

        <div className='header'>
            <div className='logo'>
                Logo
            </div>
            <div className='userIcon'>
                <AccountCircle/>
            </div>
        </div>
    )
}

export default Header
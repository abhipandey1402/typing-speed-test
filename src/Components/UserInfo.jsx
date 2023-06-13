import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

const UserInfo = ({ totalTestsTakes }) => {

    const [user] = useAuthState(auth);

    return (
        <div className='userProfile'>
            <div className="user">
                <div className="picture">
                    <AccountCircleIcon style={{display: 'block', transform: 'scale(6)', margin: 'auto', marginTop:'3.5rem'}} />
                </div>
                <div className="info">
                    <div className="email">
                        {user.email}
                    </div>
                    <div className="joinedAt">
                        {user.metadata.creationTime}
                    </div>
                </div>
            </div>
            <div className="totalTest">
                <span>Total Tests Taken - {totalTestsTakes}</span>
            </div>
        </div>
    )
}

export default UserInfo


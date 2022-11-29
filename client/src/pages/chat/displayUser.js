import React from 'react'
import './DisplayUser.css'
import {Link} from 'react-router-dom'

const DisplayUser = ({user, children}) => {
    console.log(user)

  return (
      <div className="display_user d-flex p-2 align-items-center justify-content-between">
        <Link to={`/profile/${user._id}`} style={{ textDecoration: 'none' }} className="d-flex align-items-center">
          <img src={user.avatar} alt="Loading..." className="small-avatar" />
          <h6 className="text-dark ml-2 mt-2">{user.email}</h6>
        </Link>

        {children}
      </div>
  )
}

export default DisplayUser
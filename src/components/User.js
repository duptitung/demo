import React from 'react'

const User = ({ user, getUserDetails }) => {
  // console.log(user)

  return (
    <div className='cursor-pointer' onClick={() => getUserDetails(user.login)}>
      <div className='w-28 h-28 mb-2'>
        <img
          className='h-full w-full object-cover'
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
        />
      </div>
      <h3 className='text-center font-semibold text-gray-700'>{`${user.login}`}</h3>
      <span className='text-xs text-gray-500 text-center block'>
        {user.name ? `(${user.name})` : null}
      </span>
    </div>
  )
}

export default User

import React from 'react'
import Friends from './Friends'
import GroupList from './GroupList'
import UserList from './UserList'
import FriendRequest from './FriendRequest'
import MyGroup from './MyGroup'
import BlokedUser from './BlokedUser'


const Home = () => {
  return (
    <div className='home_wrapper'>
      <GroupList/>
      <Friends/>
      <UserList/>
      <FriendRequest/>
      <MyGroup/>
      <BlokedUser/>
    </div>
  )
}

export default Home
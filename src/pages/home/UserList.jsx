import React, { useEffect, useState } from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import Skeleton from 'react-loading-skeleton'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { FaUserCheck } from "react-icons/fa6";


const UserList = () => {
    const [userList, setUserList] = useState()
    const [fRequest, setfRequest] = useState([])
    const [friendList, setFriendList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.loginData.value)

   //Read operation //

   useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key})
        }
    })
      setUserList(arr)
    });
  },[])

// Add friend request data //
  useEffect(()=>{
    const fRequestRef = ref(db, 'friend_request');
    onValue(fRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().senderid){
           arr.push(item.val().senderid + item.val().reciverid)
        }
    })
      setfRequest(arr)
    });
  },[])

  //  Friend list data //

  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().whoreciverid || data.uid == item.val().whosendid){
          arr.push(item.val().whosendid + item.val().whoreciverid)
        }
     })
     setFriendList(arr)
    });
  },[])

  // Remove friend request //

  let hanldeCancel = (cancelinfo) =>{
    if(cancelinfo.senderid == cancelinfo.reciverid){
      remove(ref(db, "friend_request")).then(()=>{  
        toast.error('Friend Request Remove !', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
      })
    }
  }

  //Write operation //

  let hanldeFRequest = (frequest) =>{
    console.log(frequest);
    set(push(ref(db, 'friend_request')), {
        senderid: data.uid,
        sendername: data.displayName,
        senderemail: data.email,
        senderphoto: data.photoURL,
        reciverid: frequest.id,
        recivername: frequest.username,
        reciveremail: frequest.email,
        reciverphoto: frequest.profile_photo
    }).then(()=>{
        toast.success('Friend Request Send...', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    })
  }


  return (
    <>
    <ToastContainer />
     <Groupcard cardtitle="User List">
        <div className='groupmain'> 
        {userList && userList.length > 0 
        ?
        userList.map((item,index)=>(
            <div key={index} className="groupitem">
            <div className="friendimg">
                <Image source={item.profile_photo} alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                    <h4>{item.username}</h4>
                    <p>Today, 8:56pm</p>
                </div>
                {fRequest.length > 0 && fRequest.includes(item.id + data.uid) || fRequest.includes(data.uid + item.id)
                ?
                <>
                  <button onClick={()=>hanldeCancel(item)} className='cancel'>Remove</button>
                </>
                :
                friendList.includes(item.id + data.uid) || friendList.includes(data.uid + item.id)
                ?
                <button  className='friend'><FaUserCheck /> Friends</button>
                :
                <button onClick={()=>hanldeFRequest(item)} className='addbtn'>Add friend</button>
                }
            </div>
         </div>
        ))
        :
          <Skeleton count={3}/>
        }
            
        </div>
    </Groupcard>
    </>
  )
}

export default UserList
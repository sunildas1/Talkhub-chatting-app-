import React, { useEffect, useState } from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const FriendRequest = () => {
    const [fRequest, setfRequest] = useState()
    const db = getDatabase();
    const data = useSelector((state) => state.loginData.value)

    // Read operation //
    useEffect(()=>{
        const fRequestRef = ref(db, 'friend_request');
        onValue(fRequestRef, (snapshot) => {
          let arr = []
          snapshot.forEach((item)=>{
            if(data.uid == item.val().reciverid){
               arr.push({...item.val(),id:item.key})
            }
        })
          setfRequest(arr)
        });
      },[])

    // Delete operation //

    let handleremove = (removeinfo) =>{
        remove(ref(db, "friend_request/" + removeinfo.id)).then(()=>{
            toast.info('Friend Request Deleted !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        })
    }

    // Write operation //

    let handleaccept = (acceptinfo) =>{
        set(push(ref(db, 'friends')),{
          whosendid: acceptinfo.senderid,
          whosendername: acceptinfo.sendername,
          whosenderemail: acceptinfo.senderemail,
          whosenderphoto: acceptinfo.senderphoto,
          whoreciverid: data.uid,
          whorecivername: data.displayName,
          whoreciveremail: data.email,
          whoreciverphoto: data.photoURL
      }).then(()=>{
        remove(ref(db, "friend_request/" + acceptinfo.id)).then(()=>{
          toast.success('Friend Request Accepted...', {
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
     })
    }

  return (
    <>
    <ToastContainer />
     <Groupcard cardtitle="Friends Request">
        <div className='groupmain'> 
        {fRequest && fRequest.length > 0
        ?
        fRequest.map((item,index)=>(
            <div key={index} className="groupitem">
                <div className="friendimg">
                    <Image source={item.senderphoto} alt=""/>
                </div>
                <div className='groupinfo'>
                    <div className='groupname'>
                    <h4>{item.sendername}</h4>
                    <p>Hi.....</p>
                    </div>
                    <div className='button_group'>
                        <button onClick={()=>handleaccept(item)} className='join_btn'>Confirm</button>
                        <button onClick={()=>handleremove(item)} className='remove'>Delete</button>
                    </div>
                </div>
            </div>
        ))
        :
          <p className='request'>No Request Found</p>
        }   
        </div>
    </Groupcard>
    </>
  )
}

export default FriendRequest
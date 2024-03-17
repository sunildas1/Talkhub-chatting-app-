import React, { useEffect, useState } from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { ToastContainer, toast, Bounce } from 'react-toastify';


const Friends = () => {
    const [friendList, setFriendList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.loginData.value)

    //Read operation //

    useEffect(()=>{
      const friendRef = ref(db, 'friends');
      onValue(friendRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(data.uid == item.val().whoreciverid || data.uid == item.val().whosendid){
            arr.push({...item.val(),id:item.key})
          }
       })
       setFriendList(arr)
      });
    },[])

    // Block operation //

    let handleBlock = (blockinfo) =>{
      data.uid == blockinfo.whosendid
      ?
      set(push(ref(db, "block")),{
        blockid: blockinfo.whoreciverid,
        blockname: blockinfo.whorecivername,
        blockemail: blockinfo.whoreciveremail,
        blockphoto: blockinfo.whoreciverphoto,
        whoblockid: data.uid,
        whoblockname: data.displayName,
        whoblockemail: data.email,
        whoblockphoto: data.photoURL,
      }).then(()=>{
         remove(ref(db, "friends/" + blockinfo.id)).then(()=>{  
          toast.error('Your friend is blocked !', {
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
      :
      set(push(ref(db, "block")),{
        blockid: data.uid,
        blockname: data.displayName,
        blockemail: data.email,
        blockphoto: data.photoURL,
        whoblockid: blockinfo.whoreciverid,
        whoblockname: blockinfo.whorecivername,
        whoblockemail: blockinfo.whoreciveremail,
        whoblockphoto: blockinfo.whoreciverphoto,
      }).then(()=>{
         remove(ref(db, "friends/" + blockinfo.id)).then(()=>{  
          toast.error('Your friend is blocked !', {
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
     <Groupcard cardtitle="Friends">
        <div className='groupmain'>
          {friendList && friendList.map((item,index)=>(
            <div key={index} className="groupitem">
              <div className="friendimg">
                <Image source={data.uid == item.whosendid ? item.whoreciverphoto : item.whosenderphoto} alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  {data.uid == item.whosendid
                  ?
                   <h4>{item.whorecivername}</h4>
                  :
                   <h4>{item.whosendername}</h4>
                  }
                  <p>Today, 8:56pm</p>
                </div>
                <button onClick={()=>handleBlock(item)} className='join_btn'>Block</button>
              </div>
           </div>
          ))}
        </div>
    </Groupcard>
    
    </>
  )
}

export default Friends
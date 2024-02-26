import React, { useEffect, useState } from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
// import { ToastContainer, toast, Bounce } from 'react-toastify';

const BlokedUser = () => {
    const [blockList, setBlockList] = useState([])
    const db = getDatabase();
    const data = useSelector((state) => state.loginData.value)

    //Read operation //

    useEffect(()=>{
      const blockRef = ref(db, 'block');
      onValue(blockRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(item.val().whoblockid == data.uid){
            arr.push({...item.val(),id:item.key})
          }
       })
       setBlockList(arr)
      });
    },[])


  return (
    <>
      {/* <ToastContainer /> */}
    <Groupcard cardtitle="Blocked Users">
        <div className='groupmain'>
            {blockList && blockList.map((item,index)=>(
                <div key={index} className="groupitem">
                <div className="friendimg">
                    <Image source={item.blockphoto} alt=""/>
                </div>
                <div className='groupinfo'>
                    <div className='groupname'>
                    <h4>{item.blockname}</h4>
                    <p>Today, 8:56pm</p>
                    </div>
                    <button className='join_btn'>Unblock</button>
                </div>
            </div>
            ))

            }
            
        </div>
     </Groupcard>
    </>
  )
}

export default BlokedUser
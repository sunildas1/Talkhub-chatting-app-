import React, { useEffect, useState } from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { ToastContainer, toast, Bounce } from 'react-toastify';

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

  let handleunblock = (unblockinfo) =>{
    console.log(unblockinfo);
      remove(ref(db, "block/" + unblockinfo.id)).then(()=>{  
        toast.success('Unblock your frined !', {
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
                    <button onClick={()=>handleunblock(item)} className='join_btn'>Unblock</button>
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
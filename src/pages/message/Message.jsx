import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import Image from '../../utilities/Image'
import "./message.css"
import { IoSend } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { BsMic } from "react-icons/bs";
import { TbPhoto } from "react-icons/tb";
import { GoPlusCircle } from "react-icons/go";
import { active_user } from '../../slices/activeUserSlice';
import EmojiPicker from 'emoji-picker-react';
import ScrollToBottom from 'react-scroll-to-bottom';


const Message = () => {

  const [friendList, setFriendList] = useState([])
  const [msgText, setMsgText] = useState("")
  const [allMessage, setAllMessage] = useState([])
  const [showemoji, setshowemoji] = useState(false)
  const db = getDatabase();
  const data = useSelector((state) => state.loginData.value)
  const activechat = useSelector((state) => state.activeuserdata.value)
  const dispatch = useDispatch()
  const emojiref = useRef()


  // Friend reade operation //

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

  let handleUser = (i) =>{
    dispatch(active_user(i))
  }

  // Message write operation // 

  let handleSubmit = (e) => {
    set(push(ref(db, 'message')),{
      senderid: data.uid,
      sendername: data.displayName,
      senderemail: data.email,
      senderphoto: data.photoURL,
      message : msgText,
      reciverid: data.uid == activechat.whoreciverid ? activechat.whosendid : activechat.whoreciverid,
      recivername: data.uid == activechat.whoreciverid ? activechat.whosendername : activechat.whorecivername,
      reciveremail: data.uid == activechat.whoreciverid ? activechat.whosenderemail : activechat.whoreciveremail,
      reciverphoto: data.uid == activechat.whoreciverid ? activechat.whosenderphoto : activechat.whoreciverphoto
    }).then(()=>{
      setMsgText("")
    })
  }

  // Message read operation // 

  useEffect(()=>{
    const messageRef = ref(db, 'message');
    onValue(messageRef, (snapshot) => {
      let arr = []
      let activeuserid = activechat.whosendid == data.uid ? activechat.whoreciverid : activechat.whosendid
      snapshot.forEach((item)=>{
        if((item.val().senderid == data.uid && item.val().reciverid == activeuserid) || (item.val().reciverid == data.uid && item.val().senderid == activeuserid)){
          arr.push({...item.val(),id:item.key})
        }
     })
     setAllMessage(arr)
    });
  },[activechat])


  let handleKey = (e)=>{
    if(e.key == "Enter"){
      set(push(ref(db, 'message')),{
        senderid: data.uid,
        sendername: data.displayName,
        senderemail: data.email,
        senderphoto: data.photoURL,
        message : msgText,
        reciverid: data.uid == activechat.whoreciverid ? activechat.whosendid : activechat.whoreciverid,
        recivername: data.uid == activechat.whoreciverid ? activechat.whosendername : activechat.whorecivername,
        reciveremail: data.uid == activechat.whoreciverid ? activechat.whosenderemail : activechat.whoreciveremail,
        reciverphoto: data.uid == activechat.whoreciverid ? activechat.whosenderphoto : activechat.whoreciverphoto
      }).then(()=>{
        setMsgText("")
      })
    }
  }

  let handleEmojiPick = (e)=>{
    setMsgText(msgText + e.emoji);
  }

  useEffect(()=>{
    document.body.addEventListener("click",(e)=>{
      console.log(e.target);
      if(emojiref.current.contains(e.target)){
        setshowemoji(true)
      }
      else{
        setshowemoji(false)
      }
    })
  },[])
  

  return (
    <div className='msg_wrapper'>
      <div className='msg_sidebar'>
        <h3 className='list_heading'>Messages</h3>
        <div className="msg_user_wrapper">
          {friendList && friendList.length > 0 ? 
            friendList.map((item,index)=>(
            <div onClick={()=>handleUser(item)} key={index} className="msg_item">
              <div className="msg_img">
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
                  <p>Active Now</p>
                </div>
                <p className='date'>Today, 8:56pm</p>
              </div>
           </div>
          ))
          :
          <div className='no_friend'>No Friend Available</div>
          }
          </div>
      </div>
      {activechat !== null
       ?
       <div className='msg_box'>
            <div className="msg_box_heading">
              <div className="msg_img_box">
               <Image source={data && data.photoURL} alt="Image Not Found"/>
              </div>
              <div>
                <h3>
                  {activechat &&
                    activechat.whosendid == data.uid
                    ?
                    activechat.whorecivername
                    :
                    activechat.whosendername
                  }
                </h3>
                <p>Active now</p>
              </div>
            </div>
            <ScrollToBottom className="scroll_box" >
              <div className="main_msg">
                {allMessage && allMessage.map((item,index)=>(
                  <div key={index} className={`${item.reciverid == data.uid ? "recive_msg" : "send_msg"}`}>
                    <p>{item.message}</p>
                    {/* <div className="msg_side_box">
                      <Image source={data && data.photoURL} alt="Image Not Found"/>
                    </div> */}
                  </div>
                ))
              }
              </div>
            </ScrollToBottom>
            <div className="msg_footer">
              <div className="all_emoji">
                <GoPlusCircle />
                <TbPhoto />
                <BsMic />
              </div>
              <div className="input_send">
                <input className='input_box' type="text" placeholder='Messagae...' value={msgText} onKeyDown={handleKey} onChange={(e)=>setMsgText(e.target.value)}/>
                {msgText.length > 0 &&
                  <IoSend type='submit' onClick={handleSubmit} />
                }
              </div>
                <div ref={emojiref}>
                  {showemoji &&
                    <div className="emoji_wrapper">
                      <EmojiPicker onEmojiClick={handleEmojiPick}/>
                  </div>
                  }
                  <div className="emoji">
                    <GrEmoji onClick={()=>setshowemoji(!showemoji)}/>
                  </div>
                </div>
            </div>
      </div>
      :
      <h1>No User Selete</h1>
      }
    </div>
  )
}

export default Message
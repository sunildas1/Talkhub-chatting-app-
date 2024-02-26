import React, { useEffect } from 'react'
import { VscHome } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import Image from '../../utilities/Image';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { login_user } from '../../slices/userSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoIosCamera } from "react-icons/io";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Sidebar = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const data = useSelector((state) => state.loginData.value)
  let dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = getAuth();


  
  let handlelogout = ()=>{
    signOut(auth).then(()=>{
      toast.info('You have been logged out!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(()=>{
        navigate("/")
        localStorage.removeItem("user")
        dispatch(login_user(null))
      },1000)
    })
  }

  return (
    <>
    <ToastContainer />
      <div className='sidebarbox'>
          <div>
            <div className="img_box">
                <Image source={data && data.photoURL} alt="Image Not Found"/>
                <div onClick={handleOpen} className="overlay">
                  <IoIosCamera />
                </div>
            </div>
            <h3 className='username'>{data && data.displayName}</h3>
          </div>
          <div>
            <ul className='navigation'>
                <li>
                    <NavLink to="/home">
                       <VscHome />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/message">
                       <AiFillMessage />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notification">
                       <IoMdNotificationsOutline />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/setting">
                       <IoSettingsOutline />
                    </NavLink>
                </li>
            </ul>
          </div>
          <div onClick={handlelogout} className='logout'>
              <TbLogout />
          </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <h2 className='upload'>Profile Photo Upload</h2>
            <div className="img_holder">
              <Image source={data && data.photoURL} alt="Image Not Found"/>
            </div>
            <div className='file'>
              <input type="file" />
            </div>
        </Box>
      </Modal>
    </>
  )
}

export default Sidebar
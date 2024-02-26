import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import CustomButtom from '../../components/CustomButtom';
import AuthNavigate from '../../components/AuthNavigate';
import './login.css'
import { FcGoogle } from "react-icons/fc";
import Loginimg from "../../assets/images/login.jpg"
import Image from '../../utilities/Image';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Modal from '@mui/material/Modal';
import { RiCloseLine } from "react-icons/ri";
import { useFormik } from 'formik';
import Loginvalidation from '../../validation/LoginValidation';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { login_user } from '../../slices/userSlice';
import { Bars } from 'react-loader-spinner'

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


const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  let [error, setError] = useState()
  let dispatch = useDispatch()
  const [loader, setLoader] = useState(false)

  let [passShow, setPassShow] = useState(true)
  let [toggle, setToggle] = useState(false)

  let handlePassShow = () => {
    if(passShow){
      setPassShow(false)
      setToggle(true)
    }
    else{
      setPassShow(true)
      setToggle(false)
    }
  }

  let handleSubmit = () =>{
    setError("Email already exiets")
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose = () =>{
    setOpen(false)
  }

  const initialValues = {
    email : "",
    password : ""
  }

  const formik = useFormik({
    initialValues:initialValues,
    validationSchema:Loginvalidation,
    onSubmit: values => {
      setLoader(true)
      signInWithEmailAndPassword(auth, values.email, values.password).then((userCredential)=>{
        console.log(userCredential);
        if(userCredential.user.emailVerified){
          localStorage.setItem("user",JSON.stringify(userCredential.user))
          dispatch(login_user(userCredential.user))
          toast.success('Logged in successfully.', {
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
            navigate("/home");
            setLoader(false)
          },1000)
        }else{
          signOut(auth).then(()=>{
            toast.error('Please verify your email address!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
            setLoader(false)
          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode == "auth/invalid-credential"){
          toast.error('Email or Password is incorrect !', {
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
        }else{   
          setError("")
        }
        setLoader(false)
      });
    },
  });
  
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition: Bounce
    />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <RiCloseLine onClick={handleModalClose} className='close'/>
        <form action="" method='post' onSubmit={formik.handleSubmit}>
          <div className="forgot_box">
            <h2>Forgot Password</h2>
            <Input type="email" name="email" labeltext="Enter your email address" variant="outlined" onChange={formik.handleChange} value={formik.values.email}/>
            {formik.touched.email && formik.errors.email ? (
              <div className='error'>{formik.errors.email}</div>
            ) : null}
            <CustomButtom type="submit" text="Send" variant="contained"/>
          </div>
        </form>
      </Box>
    </Modal>

    <Box sx={{ width: '100%' }}>
      <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid xs={6}>
          <div className='register'>
            <div className='input_login'>
              <Heading style="login_heading" text="Login to your account!"/>
              <div className='provider_login'>
                <FcGoogle className='google_icon' />
                <span>Login with Google</span>
              </div>
              <p className='emailpasserror'>{error}</p>
              <form action="" method='post' onSubmit={formik.handleSubmit}>
                <div className='form_main'>
                  <Input type="email" name="email" variant="standard" labeltext="Email Address" style="input_text" onChange={formik.handleChange}value={formik.values.email}/>
                  {formik.touched.email && formik.errors.email ? (
                    <div className='error-1'>{formik.errors.email}</div>
                  ) : null}
                  <Input type={passShow ? "password" : "text"} name="password" variant="standard" labeltext="Password" style="input_text" onChange={formik.handleChange} value={formik.values.password}/>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='error-4'>{formik.errors.password}</div>
                  ) : null}
                  <div className='hide_show_icon'>
                    {toggle
                    ?
                    <AiFillEye onClick={handlePassShow} className='eye'/> 
                    :
                    <AiFillEyeInvisible onClick={handlePassShow} className='eye'/> 
                    }
                  </div>
                  <CustomButtom type="submit" onClick={handleSubmit} variant="contained" text={loader ? <Bars
                    height="30"
                    width="30"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                  /> : "Login to Continue"} style="login_btn"/>
                </div>
              </form>
              <p  className='forgot'><span onClick={handleOpen}>Forgot Password</span></p>
              <AuthNavigate style="singup" link="/registration" linktext="Sing up" text="Don’t have an account ?"/>
            </div>
          </div>
        </Grid>
        <Grid xs={6}>
          <div className='register_img'>
             <Image source={Loginimg} alt="Image Not Found"/>
          </div>
        </Grid>
      </Grid>
    </Box>

    </>
  )
}

export default Login
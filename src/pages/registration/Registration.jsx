import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import './registration.css'
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import CustomButtom from '../../components/CustomButtom';
import AuthNavigate from '../../components/AuthNavigate';
import Registerimg from '../../assets/images/register.png'
import Image from '../../utilities/Image';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from 'formik';
import validation from '../../validation/FormValidation';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bars } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { Bounce, ToastContainer, toast } from 'react-toastify';


const Registration = () => {
  const auth = getAuth();
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate();
  const db = getDatabase();

  let [passShow, setPassShow] = useState(true)
  let [toggle, setToggle] = useState(false)
  let [error, setError] = useState()

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

  const initialValues = {
    email : "",
    fullname : "",
    password : "",
  }

    const formik = useFormik({

      initialValues:initialValues,
      validationSchema:validation,
      onSubmit: values => {
        setLoader(true)
        createUserWithEmailAndPassword(auth, values.email, values.password).then((userCredential)=>{
          sendEmailVerification(auth.currentUser).then(()=>{
            updateProfile(auth.currentUser, {
              displayName: values.fullname,
              photoURL: "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
            }).then(()=>{
              set(ref(db, 'users/' + userCredential.user.uid), {
                username: userCredential.user.displayName,
                email: userCredential.user.email,
                profile_photo : userCredential.user.photoURL
              }).then(()=>{
                navigate("/");
              })           
            })
          })
        }).catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorCode == "auth/email-already-in-use"){
            toast.error('Email already exiets!', {
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
          
        })
        formik.resetForm(values);
        setTimeout(()=>{
          toast.success('Account created successfully !', {
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
          setLoader(false)
        },1000)
      },
  });
 

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
    <Box sx={{ width: '100%' }}>
      <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
        <Grid xs={6}>
          <div className='register'>
            <div className='input_register'>
              <Heading style="auth_heading" text="Get started with easily register"/>
              <h4>Free register and you can enjoy it</h4>
               <form action="" method='post' onSubmit={formik.handleSubmit}> 
                <div className='form_main'>
                  <Input type="email" name="email" variant="outlined" labeltext="Email Address" style="input_text" onChange={formik.handleChange}value={formik.values.email}/>
                  <p className='emailerror'>{error}</p>
                  {formik.touched.email && formik.errors.email ? (
                    <div className='error-1'>{formik.errors.email}</div>
                  ) : null}
                  <Input type="text" name="fullname" variant="outlined" labeltext="Full name" style="input_text" onChange={formik.handleChange}value={formik.values.fullname}/>
                  {formik.touched.fullname && formik.errors.fullname ? (
                    <div className='error-2'>{formik.errors.fullname}</div>
                  ) : null}
                  <Input type={passShow ? "password" : "text"} name="password" variant="outlined" labeltext="Password" style="input_text" onChange={formik.handleChange} value={formik.values.password}/>
                  {formik.touched.password && formik.errors.password ? (
                    <div className='error-3'>{formik.errors.password}</div>
                  ) : null}
                  <div className='show_icon'>
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
                  /> : "Sign up"}  style="register_btn"/>
                </div>
               </form>
              <AuthNavigate style="singin" link="/" linktext="Sing in" text="Already  have an account ?"/>
            </div>
          </div>
        </Grid>
          <Grid xs={6}>
            <div className='register_img'>
              <Image source={Registerimg} alt="Image Not Found"/>
            </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Registration
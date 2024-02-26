import * as Yup from 'yup';

let emailformat =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let passwordformt = "(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"

export const validation = Yup.object({
    email : Yup.string()
            .matches(emailformat, "*Invalid email address*")
            .required("*Please enter your email*"),

    fullname : Yup.string()
              .max(15, '*Must be 15 characters or less*')
              .max(15, '*Must be 5 characters or above*')
              .required('*Please enter your fullname*'),

    password : Yup.string()
               .matches(passwordformt, "*Password must contain at least 8 characters, one uppercase, one number and one spacial case characters*")
               .required("*Please must required*"),
})

export default validation
import { TextField } from '@mui/material'
import React from 'react'

const Input = ({variant, labeltext, style, name, type, onChange, value, onClick}) => {
  return (
    <TextField name={name} type={type} className={style} label={labeltext} variant={variant} onChange={onChange} value={value} onClick={onClick}/>
  )
}

export default Input
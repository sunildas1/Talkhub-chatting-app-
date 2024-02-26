import { Button } from '@mui/material'
import React from 'react'

const CustomButtom = ({variant, text, style, type}) => {
  return (
    <Button type={type} className={style} variant={variant}>{text}</Button>
  )
}

export default CustomButtom
import { Box } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react'
import './layout.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const RootLayout = () => {
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
          <Grid xs={1.5}>
            <Sidebar/>
          </Grid>
          <Grid xs={10.5}>
              <Outlet/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default RootLayout
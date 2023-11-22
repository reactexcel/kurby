import React, { useEffect, useState } from 'react'
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import {
  amber, green, red, lightBlue
} from '@mui/material/colors'
import snackbarContext from '../context/snackbarContext';
import { useRecoilState } from 'recoil';


const stylesMap = {
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
  // info: {
  //   backgroundColor: lightBlue[600],
  // },
  // warning: {
  //   backgroundColor: amber[700],
  // },
}
export enum MessageType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error'
}

export default function MessageBar() {
  const [snackbar, setSnackbar] = useRecoilState(snackbarContext);

  const handleSnackbarClose = () => {
    setSnackbar((prev: any) => {
      return {
        ...prev,
        message: '',
        variant: 'error',
        open: false,
      }
    })
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      open={snackbar.open}
      ContentProps={{
        'aria-describedby': 'snackbar-message-id',
      }}
    >
      <SnackbarContent
        message={snackbar.message}
        style={snackbar.variant ? stylesMap[snackbar.variant] : {}}
      />
    </Snackbar>
  )
}

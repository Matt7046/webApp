import { Alert, AlertColor, Box, Grid, Snackbar } from '@mui/material';
import React from 'react';
import Drawer, { MenuLaterale } from '../../components/msdrawer/Drawer';

interface PageLayoutProps {
  children: React.ReactNode; // Contenuto specifico della maschera
  menuLaterale:MenuLaterale[][]; 
  open: boolean;
  message: TypeMessage;
  handleClose: () => void;
  padding: number; // Gestione padding dinamico
}
export interface TypeMessage
{
  message? : string[];
  typeMessage? : AlertColor;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  menuLaterale,
  open,
  message,
  handleClose,
  padding,
}) => {
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
        <Grid item>
          <Drawer sezioni={menuLaterale} nameMenu="Menu" anchor="left" />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={message.typeMessage} sx={{ width: '100%' }}>
          {message.message}
        </Alert>
      </Snackbar>
      <Box sx={{ paddingLeft: padding, paddingRight: 5 }}>{children}</Box>
    </>
  );
};

export default PageLayout;
import React, { useEffect, useState } from 'react';
import ActivityContent from './ActivityContent';
import activityStore from './store/ActivityStore';
import { fetchDataActivity } from './service/ActivityService';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import { sezioniMenu, sezioniMenuIniziale } from '../../App';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/msdrawer/Drawer';
import { aggiornaDOMComponente } from '../../components/msschedule/Schedule';
import { getMenuLaterale, ResponseI, UserI } from '../../general/Utils';
import PageLayout from '../page-layout/PageLayout';

export interface ActivityI {
  _id: string | undefined;
  nome: string;
  subTesto: string;
}

const Activity: React.FC<{ user: UserI }> = ({ user }) => {
  const [utente, setUtente] = useState<UserI>(user); // Stato iniziale vuoto
  const navigate = useNavigate(); // Ottieni la funzione di navigazione
  const menuLaterale = getMenuLaterale(navigate, user)
  const [response, setResponse] = useState<any>([]); // Stato iniziale vuoto
  const [visibilityButton, setVisibilityButton] = useState<boolean>(false); // Stato iniziale vuoto
  const [errors, setErrors] = React.useState<string[]>([]); // Lo stato è un array di stringhe
  const [open, setOpen] = useState(false); // Controlla la visibilità del messaggio


  // default class Activity extends React.Component {

  let hasFetchedData = false;
  const [isVertical, setIsVertical] = useState<boolean>(window.innerHeight > window.innerWidth);


  useEffect(() => {
    // Questo codice verrà eseguito dopo che il componente è stato montato
    componentDidMount();
    //window.addEventListener('resize', handleResize);

    const handleResize = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Pulisci il listener al dismount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Il secondo argomento vuoto ind ica che l'effetto dipenderà solo dal mount
  const paddingType = isVertical ? 5 : 8;

  const componentDidMount = () => {
    if (!hasFetchedData) {
      hasFetchedData = true;
      // Effettua la chiamata GET quando il componente è montato 
      // axios.
      //  .get('https://api.example.com/data') // URL dell'API]
      fetchDataActivity()
        .then((response) => {
          if (response) {
            setResponse(response.testo)
            caricamentoIniziale(response);
          }
        })
        .catch((error) => {
          console.error('Errore durante il recupero dei dati:', error);
        });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const caricamentoIniziale = (response: ResponseI): void => {
    return setAllTesto(response);
  }

  const setAllTesto = (response: ResponseI): void => {
    activityStore.setAllTesto(response);
    aggiornaDOMComponente(response.testo, () => setVisibilityButton(true));
  }

  return (
    <>
      <PageLayout
        menuLaterale={menuLaterale}
        open={open}
        errors={errors}
        handleClose={handleClose}
        padding={paddingType}
      >
        <ActivityContent
          responseSchedule={response}
          user={utente}
          setErrors={setErrors}
        />
      </PageLayout>
      <div>
        {/* Contenuto aggiuntivo, se necessario */}
      </div>
    </>
  );
}
export default Activity;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMenuLaterale, UserI } from '../../general/Utils';
import PageLayout from '../page-layout/PageLayout';
import OperativeContent from './OperativeContent';


const Operative: React.FC<{ user: UserI }> = ({ user }) => {

  const navigate = useNavigate(); // Ottieni la funzione di navigazione
  const menuLaterale = getMenuLaterale(navigate, user);
  const [open, setOpen] = useState(false); // Controlla la visibilità del messaggio
  const [isVertical, setIsVertical] = useState<boolean>(window.innerHeight > window.innerWidth);
  const padding = isVertical ? 5 : 8;
  const [errors, setErrors] = React.useState<string[]>([]); // Lo stato è un array di stringhe


  useEffect(() => {

    const handleResize = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Pulisci il listener al dismount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PageLayout
        menuLaterale={menuLaterale}
        open={open}
        errors={errors}
        handleClose={handleClose}
        padding={padding}
      >
        <OperativeContent
          user={user}
          setErrors={setErrors}
          setOpen = {setOpen}
        />
      </PageLayout>
      <div>
        {/* Contenuto aggiuntivo, se necessario */}
      </div>
    </>
  );
};

export default Operative;







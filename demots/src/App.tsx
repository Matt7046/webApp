import './App.css';
import { Route, Routes, NavigateFunction, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MenuLaterale } from './components/msdrawer/Drawer';
import Activity from './page/page-activity/Activity';
import About from './page/page-about/About';
import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Points from './page/page-points/Points';
import { savePointsById } from './page/page-points/service/PointsService';
import { Alert, CircularProgress, Snackbar } from '@mui/material';



// Componente principale, avvolto da GoogleOAuthProvider
const App = () => (


  <GoogleOAuthProvider clientId="549622774155-atv0j0qj40r1vpl1heibaughtf0t2lon.apps.googleusercontent.com">
    <GoogleAuthComponent />
  </GoogleOAuthProvider>



);

// Componente di autenticazione
const GoogleAuthComponent = () => {
  const navigate = useNavigate();  // Qui chiami useNavigate correttamente all'interno di un componente
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false); // Controlla la visibilità del messaggio
  const [errors, setErrors] = useState('Si è verificato un errore! Controlla i dettagli.')
  const [loading, setLoading] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [title, setTitle] = useState("");

  // Funzione di logout
  const logOut = () => {
    setUser(null); // Resetta il profilo utente
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Configura useGoogleLogin
  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      console.log('Login Success:', codeResponse);

      const accessToken = codeResponse?.access_token;
      // Puoi usare l'access token per fare richieste all'API di Google
      fetchUserData(accessToken);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  const handleLoginSuccessFake = (fakeResponse: any) => {
    const userData = {
      name: "Simulated User",
      email: "user@simulated.com",
      token: fakeResponse.credential,
    };
    setUser(userData);
    saveUserData(userData,setLoading);
    console.log("Login simulato effettuato:", fakeResponse);
    navigateRouting(navigate, `activity`, {})
  };

  const saveUserData = (userData: any, setLoading: any): void => {
    const utente = { email: userData.email, points: 100 }
    savePointsById(utente, () => showError(setOpen, setErrors), setLoading)
  }

  // Funzione per ottenere i dati utente
  const fetchUserData = async (accessToken: string) => {
    try {
      // Verifica che il token sia valido
      const tokenInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
      const tokenInfo = await tokenInfoResponse.json();
      if (tokenInfo.error) {
        console.error('Token invalido:', tokenInfo.error);
        return;
      }
      // Se il token è valido, recupera i dati dell'utente
      const userDataResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (userDataResponse.ok) {
        const userData = await userDataResponse.json();
        setUser(userData); // Salva i dati utente
        saveUserData(userData,setLoading);
        console.log('User Data:', userData); // Logga i dati utente per il debug
        navigateRouting(navigate, `activity`, {})
      } else {
        console.error('Failed to fetch user data:', userDataResponse.status);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }

  // Simulazione del login con Google
  const simulateLogin = () => {
    setSimulated(true);
    const fakeResponse = {
      credential: "fake-token-id",
      clientId: "549622774155-atv0j0qj40r1vpl1heibaughtf0t2lon.apps.googleusercontent.com",
      select_by: "google",
    };
    handleLoginSuccessFake(fakeResponse);
  };

  return (
    <><Snackbar
      open={open}
      autoHideDuration={6000} // Chiude automaticamente dopo 6 secondi
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Posizione del messaggio
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errors}
      </Alert>
    </Snackbar>     
      <GoogleOAuthProvider clientId="549622774155-atv0j0qj40r1vpl1heibaughtf0t2lon.apps.googleusercontent.com">
        <div>
          <h1>
            Login con Google ({user ? user.name : "Non autenticato"})
          </h1>
          {!user ? (
            <div>
              <div
                className="col-button-container"
                style={{
                  gridColumn: 'span 2',
                  display: 'flex',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '12px',
                  visibility: true ? 'visible' : 'hidden',
                }}
              >
                {/* Pulsante per simulare il login */}
                <button onClick={simulateLogin}>Simula Login con Google</button>

                {/* Pulsante di login reale */}
                <GoogleLogin
                  onSuccess={(response) => login()}
                  onError={logOut} />
              </div>
            </div>
          ) : (
            <div>
              <h1>{title}</h1>
              <Routes>
                <Route path="/activity" element={<Activity user={user} />} />
                <Route path="/about" element={<About user={user} />} />
                <Route path="/points" element={<Points user={user} />} />
              </Routes>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
      {loading && <CircularProgress />}
      </>
      
  );
};

export const navigateRouting = (navigate: NavigateFunction, path: string, params: any) => {
  navigate(`/${path}`, { state: params }); // Passa i parametri come stato
};

export const sezioniMenuIniziale: MenuLaterale[][] = [
  [
    { funzione: null, testo: 'Activity' },
    { funzione: null, testo: 'About' },
    { funzione: null, testo: 'Points' },
    { funzione: null, testo: 'Operative' },
  ],
  [
    { funzione: null, testo: 'Family' }
  ],
];

export const showError = (setOpen: any, setError: any, errore?: string) => {
  errore = errore ? errore : 'Il server non risponde';
  setOpen(true);
  setError(errore)
  console.error(errore);
}

export const sezioniMenu = (
  sezioni: MenuLaterale[][],
  navigate: NavigateFunction,
  path: string,
  params: any,
  indice: number
): MenuLaterale[][] => {

  // Calcola la posizione (riga e colonna) per assegnare la funzione
  const numeroRighe = sezioni.length;
  const lunghezzaRiga = sezioni[0].length;

  const riga = Math.floor(indice / lunghezzaRiga);
  const colonna = indice % lunghezzaRiga;

  // Verifica che riga e colonna siano validi e assegna la funzione dinamica
  if (riga < numeroRighe && colonna < sezioni[riga].length) {
    sezioni[riga][colonna].funzione = () => navigateRouting(navigate, path, params);
  }
  return sezioni;
};

export default App;

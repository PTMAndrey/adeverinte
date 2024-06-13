import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from './pages/Layout/Layout';
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Alert from "./components/Alert/Alert";
import useStateProvider from "./hooks/useStateProvider";
import Onboarding from "./pages/Onboarding/Onboarding";
import NotFound from './pages/NotFound/NotFound';
import useAuthProvider from './hooks/useAuthProvider';
import useWindowDimensions from "./hooks/useWindowDimensions"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarNavigation from './components/Sidebar/SidebarNavigation';
import Studenti from './pages/Studenti/Studenti';
import Adeverinte from './pages/Secretariat/Adeverinte/Adeverinte';
import Facultate from './pages/Facultate/Facultate';
import Secretariat from './pages/Secretariat/Secretare/Secretariat';


function App() {
  const { width } = useWindowDimensions();
  const { alert } = useStateProvider();
  const { user } = useAuthProvider();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <>
      <Backdrop
        sx={{ display: 'flex', flexDirection: 'column', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <h3>Pregătim informațiile pentru tine!</h3>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>;
  }

  return (
    <Router>
      <Routes>
        <Route
          element={
            <>
              <Layout>
                <SidebarNavigation />
                <ProtectedRoutes />
              </Layout>
            </>
          }
        >
          {/* protected routes */}
          <Route path="/" element={<Home />} />

          {user?.rol !== 'ADMIN' &&
            <Route path="/facultate">
              <Route path="info" element={<Facultate />} />
            </Route>
          }
          <Route path="/studenti">
            <Route path="lista" element={<Studenti />} />
            <Route path="adauga" element={<Studenti />} />
          </Route>

          {user?.rol === 'ADMIN' &&
            <Route path="/secretariat">
              <Route path="lista" element={<Secretariat />} />
              <Route path="adauga" element={<Secretariat />} />
            </Route>
          }
          {user?.rol === 'SECRETAR' &&
            <Route path="/adeverinte">
              <Route path="cereri" element={<Adeverinte />} />
              <Route path="acceptate" element={<Adeverinte />} />
              <Route path="respinse" element={<Adeverinte />} />
            </Route>
          }
        </Route>

        <Route
          element={
            <>
              <Outlet />
            </>
          }
        >
          {/* public routes */}
          <Route path="/login" element={<Onboarding />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {alert && <Alert message={alert.message} type={alert.type} />}
    </Router>
  );
}

export default App;

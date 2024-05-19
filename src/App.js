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
// import Sidebar from "./components/Sidebar/SidebarNavigation";
// import Profile from './pages/Profile/Profile';
// import TeamRoles from './pages/TeamRoles/TeamRoles';
// import Departments from './pages/Departments/Departments';
// import Projects from './pages/Projects/Projects';
// import Skills from './pages/Skills/Skills';
// import Teams from './pages/Teams/Teams';
// import Users from './pages/Users/Users';
// import Notifications from './pages/Notifications/Notifications';
// import Proposals from './pages/Proposals/Proposals';
// import Header from "./components/Header/Header";
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import useAuthProvider from './hooks/useAuthProvider';
import useWindowDimensions from "./hooks/useWindowDimensions"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarNavigation from './components/Sidebar/SidebarNavigation';
import Secretariat from './pages/Secretariat/Secretariat';
import Studenti from './pages/Studenti/Studenti';


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
          <Route path="/users" element={<User />} />
          <Route path="/secretariat" element={<Secretariat />} />
          <Route path="/studenti" element={<Studenti />} />
          
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

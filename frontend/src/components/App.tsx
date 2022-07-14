import './App.scss';
import { Routes, Route } from "react-router-dom";
import {NavBar} from "./NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {About} from './About'
import {
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
import {UserContext, UserContextProvider} from "../contexts/UserContext";
import LoginModal from "./Login";
import {useContext} from "react";
import CreateUser from "./CreateUser";
import {TruckContextProvider} from "../contexts/TruckContext";
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import {TruckList} from "./TruckList";
import {ReservationList} from "./ReservationList";

const queryClient = new QueryClient()


function Layout() {
  const {showLogin, showCreateUser} = useContext(UserContext);
  return (
    <Box sx={{padding: '5px', marginBottom: "60px"}} className="clearfix">
        <NavBar/>
        <Routes>
          <Route path="/" element={<TruckList />} />
          <Route path="reservations" element={<ReservationList />} />
          <Route path="about" element={<About />} />
        </Routes>
        {
          showLogin && <LoginModal/>
        }
        {
          showCreateUser && <CreateUser/>
        }
    </Box>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <UserContextProvider>
        <TruckContextProvider>
          <Layout/>
        </TruckContextProvider>
    </UserContextProvider>
      </LocalizationProvider>
  </QueryClientProvider>
)
}


export default App;

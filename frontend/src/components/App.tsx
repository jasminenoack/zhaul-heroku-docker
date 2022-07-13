import './App.scss';
import { Routes, Route } from "react-router-dom";
import {NavBar} from "./NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {About} from './About'
import {Home} from "./Home";
import {
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
import {UserContext, UserContextProvider} from "../contexts/UserContext";
import LoginModal from "./Login";
import {useContext} from "react";
import CreateUser from "./CreateUser";

const queryClient = new QueryClient()


function Layout() {
  const {showLogin, showCreateUser} = useContext(UserContext);
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
        {
          showLogin && <LoginModal/>
        }
        {
          showCreateUser && <CreateUser/>
        }
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Layout/>
    </UserContextProvider>
  </QueryClientProvider>
)
}


export default App;

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
import {UserContextProvider} from "../contexts/UserContext";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
    </UserContextProvider>
  </QueryClientProvider>
)
}


export default App;

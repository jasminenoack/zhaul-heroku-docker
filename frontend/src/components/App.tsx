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

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </QueryClientProvider>
  )
}


export default App;

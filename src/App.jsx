import {useState, useEffect} from "react"
import authService from "./services/auth.service";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Dashboard from "./pages/Dashboard/Dashboard";
import TripsTable from "./components/TripsTable/TripsTable";
import NewTrip from "./components/NewTrip/NewTrip";
import Customers from "./pages/Customers/Customers";
import TripDetails from "./pages/TripDetails/TripDetails";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// const user = {
//   email:"mail@gmail.com",
//   isLoggedIn: false,
// }


function App() {
  const [user, setUser]=useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("authToken")
    authService.verify(token)
    .then((response)=> {setUser(response.data)} )
    .catch((error)=>console.log(error))

  },[])
  const Main = ()=>{
    return (
    
    <Dashboard>
      <Routes>
        <Route path="/" element={<TripsTable/>}/>
        <Route path="new-trip" element ={<NewTrip/>}/>
        <Route path="customers" element ={<Customers/>}/>
        <Route path=":id" element={<TripDetails/>}/>
      </Routes>
     
    </Dashboard>
    )
  }
  return ( 
    <div className="App">
    {/* {user ? 
    
    (<Dashboard>
      <Routes>
        <Route path="/" element={<TripsTable/>}/>
        <Route path="new-trip" element ={<NewTrip/>}/>
        <Route path="customers" element ={<Customers/>}/>
        <Route path=":id" element={<TripDetails/>}/>
      </Routes>
     
    </Dashboard>): */}

    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="dashboard/*" element={<Main />} />
      </Routes>
    {/* } */}
      
    </div>
  );
}

export default App;

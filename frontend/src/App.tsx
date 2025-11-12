
import './App.css'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Home } from './pages/onboarding/Home';
import { SignUpUser } from './pages/auth/signUpUser'; 
import { Dash } from './pages/dashboard/user';
import { Notify } from './pages/notifications';
import {SignIn}  from './pages/auth/signIn';
import AdminSignIn from './pages/auth/adminSignIn';
import { AdminDash } from './pages/dashboard/admin';

function App() {

  return (
   <BrowserRouter>
         {/* <Head/> */}
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign_up/user" element={<SignUpUser />} />
           <Route path ="/admin/sign_in" element={<AdminSignIn/>}/>
           <Route path="/sign_in" element={<SignIn />} />
           <Route path="/user/dashboard" element={<Dash />} />
            <Route path="/admin/dashboard" element={<AdminDash />} />
          <Route path="/notifications" element={<Notify />} />

         </Routes>
       </BrowserRouter>
  )
}

export default App

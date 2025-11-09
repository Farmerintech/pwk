
import './App.css'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Home } from './pages/onboarding/Home';
import { SignUpUser } from './pages/auth/signUpUser'; 
import { Dash } from './pages/dashboard/user';
import { Notify } from './pages/notifications';
import {SignIn}  from './pages/auth/signIn';
import {UserProvider}  from './contexts/UserContext';

function App() {

  return (
    <UserProvider>
   <BrowserRouter>
         {/* <Head/> */}
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/sign_up/user" element={<SignUpUser />} />
           <Route path="/sign_in" element={<SignIn />} />
           <Route path="/user/dashboard" element={<Dash />} />
          <Route path="/notifications" element={<Notify />} />

         </Routes>
       </BrowserRouter>
       </UserProvider>
  )
}

export default App

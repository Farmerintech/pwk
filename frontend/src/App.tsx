
import './App.css'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import { Home } from './pages/onboarding/Home';
import { SignUpUser } from './pages/auth/signUpUser'; 
import { Dash } from './pages/dashboard/user';
import { SignUpThirdParty } from './pages/auth/SignUpThirdParty';
import { ThirdPartyDash } from './pages/dashboard/thirdParty';
import { Notify } from './pages/notifications';
import { ZPay } from './pages/Zpay';
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
            <Route path="/sign_up/third_party" element={<SignUpThirdParty />} />
           <Route path="/user/dashboard" element={<Dash />} />
          <Route path="/third_party/dashboard" element={<ThirdPartyDash />} />
          <Route path="/notifications" element={<Notify />} />
                    <Route path="/zpay" element={<ZPay />} />

         </Routes>
       </BrowserRouter>
       </UserProvider>
  )
}

export default App
// STARFIELD GENERATOR

function createStarfield() {
  const container = document.getElementById("starfield");
  if (!container) return;

  const count = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--star-count")
  ) || 120;

  const rand = (min:number, max:number) => Math.random() * (max - min) + min;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star";

    star.style.setProperty("--size", `${rand(1, 2.3)}px`);
    star.style.setProperty("--x", `${rand(0, 100)}%`);
    star.style.setProperty("--y", `${rand(0, 100)}%`);
    star.style.setProperty("--dx", `${rand(-1, 1)}`);
    star.style.setProperty("--dy", `${rand(-1, 1)}`);
    star.style.setProperty("--dur", `${rand(20, 60)}s`);
    star.style.setProperty("--tw", `${rand(1, 4)}s`);
    star.style.setProperty("--delay", `${rand(0, 10)}`);
    star.style.setProperty("--twDelay", `${rand(0, 3)}`);

    container.appendChild(star);
  }
}

createStarfield();

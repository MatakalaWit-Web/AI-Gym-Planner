import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Profile from "./pages/profile.tsx"
import Auth from "./pages/auth.tsx"
import Onboarding from "./pages/onboarding.tsx"
import Account from "./pages/account.tsx"
import Navbar from "./componets/layout/navbar.tsx"
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from "./lib/auth.ts"


const App = () => {
  return (
    <div>
      <NeonAuthUIProvider authClient={authClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/auth/:pathname" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/account/:pathname" element={<Account />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      </NeonAuthUIProvider>
    </div>
  )
}

export default App

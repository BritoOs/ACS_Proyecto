import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Dashboard from './pages/Dashboard';
import Preferences from './pages/Preferences';
import Auth from './login/Auth'
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

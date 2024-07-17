import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthUsers from './components/AuthUsers';
import Home from './components/Home';
import RegisUser from './components/RegisUser';
import ViewWeather from './components/ViewWeather';

function App() {
  return (
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/authuser' Component={AuthUsers}/>
      <Route path='/regisuser' Component={RegisUser}/>
      <Route path='/weatherdetails' Component={ViewWeather}/>
    </Routes>
  );
}

export default App;

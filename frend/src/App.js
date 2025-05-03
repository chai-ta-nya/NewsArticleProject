import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';

import Nav from './components/Nav';
import Home from './components/Home';
import Reg from './components/Reg';
import Login from './components/Login';
import Admin from './components/Admin';
import Logout from './components/Logout';
import Add from './components/Add';
import All from './components/All';
import Bs from './components/Bs';
import Sports from './components/Sports';
import Edc from './components/Edc';
import Entertainment from './components/Entertainment';
import Tech from './components/Tech';
import Pdm from './components/Pdm';
import Ct from './components/Ct';

const App = () => {
  const [state, setState] = useState({ "_id": "", "name": "", "token": "", "role": "" });
  useEffect(() => {
    const x = Cookies.get("con");
    if (x !== undefined) {
      setState(JSON.parse(x));
    }
  }, []);
  const updstate = useCallback((obj) => {
    setState(prev => ({ ...prev, ...obj }));
  }, []);

  const obj = { state, updstate };

  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/all' element={<All />} />
            <Route path='/business' element={<Bs />} />
            <Route path='/sports' element={<Sports />} />
            <Route path='/education' element={<Edc />} />
            <Route path='/entertainment' element={<Entertainment />} />
            <Route path='/tech' element={<Tech />} />
            <Route path='/pdm' element={<Pdm />} />
          </Route>
          <Route path='/reg' element={<Reg />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/addpost' element={<Add />} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  );
};

export default App;

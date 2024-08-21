import React, {useState, useEffect} from "react";
import './App.css';

import {MemoryRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Index from "./pages/index"
import {GlobalDispatchContext, GlobalStateContext} from './context/GlobalContextProvider'


export default function App() {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  return (
      <Routes>
      <Route path="/" element={< Index />}/>
      </Routes>
  );
}

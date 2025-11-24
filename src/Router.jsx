import React from "react";

import { Home } from './Pages/Home';
import { Landing } from './Pages/Landing';
import { About } from './Pages/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function Router(){
    return (
        <Router>
            <Routes>
                <Route path='/'>
                  <Route index element={<Home/>} />
                  <Route path='/landing' element={<Landing/>} />
                  <Route path='/about' element={<About/>} />
                </Route>
            </Routes>
        </Router>
    );
}